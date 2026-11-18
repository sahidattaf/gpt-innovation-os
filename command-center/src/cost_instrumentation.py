"""Run-level cost instrumentation (G5 §38, ``ai_run``).

Turns a model call into an ``AIRun`` ledger record: tokens, duration, status, and an *estimated*
USD / XCG cost. Pure Python, no network calls, no external actions. Every record goes through
``AuditLedger.append_ai_run`` and therefore through the redaction layer.

Design rules taken from G5:
- §38: XCG is the primary reporting currency, USD the reference. "Do not hard-code exchange rates":
  the XCG-per-USD rate is always injected by the caller (or read from the environment) and is never
  stored in this file or in a prompt. With no rate supplied, ``estimated_cost_xcg`` is ``None``.
- §38: unknown values are ``None``, never ``0``. A run with no usage or no known price has a ``None``
  cost, and summaries count such runs as *unpriced* instead of treating them as free.
- §44: fail closed. An invalid status, negative metric or ledger failure raises; nothing is swallowed.
- §69 Dependency E (model-cost source) is still an owner decision. ``REFERENCE_RATE_CARD_USD`` is a
  reference default only; pass your own ``rate_card`` once the cost source is confirmed.
"""
from __future__ import annotations

import os
import sys
import time
import uuid
from contextlib import contextmanager
from dataclasses import dataclass
from decimal import ROUND_HALF_UP, Decimal
from pathlib import Path
from typing import Any, Callable, Iterable, Iterator, Mapping

_SRC_DIR = str(Path(__file__).resolve().parent)
if _SRC_DIR not in sys.path:  # allow loading this file by path (e.g. importlib in tests)
    sys.path.insert(0, _SRC_DIR)

from audit_runtime import AIRun, AuditLedger  # noqa: E402

VALID_RUN_STATUSES = ("SUCCESS", "FAIL")
XCG_PER_USD_ENV = "XCG_PER_USD"
_MICRO = Decimal("0.000001")
_MILLION = Decimal(1_000_000)


@dataclass(frozen=True)
class ModelRate:
    """USD price per one million tokens."""

    input_usd_per_mtok: Decimal
    output_usd_per_mtok: Decimal

    def __post_init__(self) -> None:
        if self.input_usd_per_mtok < 0 or self.output_usd_per_mtok < 0:
            raise ValueError("model rates cannot be negative")


# Reference default only (G5 Dependency E is not yet owner-confirmed). Prices are USD per million
# tokens for the pilot's default model. Prompt-cache read/write tokens are NOT priced separately, so
# runs that use prompt caching are over- or under-estimated; treat figures as estimates.
REFERENCE_RATE_CARD_USD: Mapping[str, ModelRate] = {
    "claude-sonnet-4-6": ModelRate(Decimal("3"), Decimal("15")),
}


def _to_decimal(value: float | int | str | Decimal) -> Decimal:
    return value if isinstance(value, Decimal) else Decimal(str(value))


def _money(value: Decimal) -> float:
    return float(value.quantize(_MICRO, rounding=ROUND_HALF_UP))


def estimate_cost_usd(
    model: str,
    input_tokens: int | None,
    output_tokens: int | None,
    rate_card: Mapping[str, ModelRate] | None = None,
) -> float | None:
    """Estimated USD cost, or ``None`` if usage is unknown or the model has no rate."""
    if input_tokens is None or output_tokens is None:
        return None
    if input_tokens < 0 or output_tokens < 0:
        raise ValueError("token counts cannot be negative")
    rate = (REFERENCE_RATE_CARD_USD if rate_card is None else rate_card).get(model)
    if rate is None:
        return None
    usd = (Decimal(input_tokens) * rate.input_usd_per_mtok + Decimal(output_tokens) * rate.output_usd_per_mtok) / _MILLION
    return _money(usd)


def usd_to_xcg(usd: float | None, xcg_per_usd: float | int | str | Decimal | None) -> float | None:
    """Convert with an injected rate. ``None`` in, or no rate, gives ``None`` (never a guessed rate)."""
    if usd is None or xcg_per_usd is None:
        return None
    rate = _to_decimal(xcg_per_usd)
    if rate <= 0:
        raise ValueError("xcg_per_usd must be positive")
    return _money(_to_decimal(usd) * rate)


def xcg_per_usd_from_env(environ: Mapping[str, str] | None = None) -> Decimal | None:
    """Read the XCG-per-USD rate from ``XCG_PER_USD``; ``None`` if unset or blank."""
    raw = (os.environ if environ is None else environ).get(XCG_PER_USD_ENV, "").strip()
    return Decimal(raw) if raw else None


def usage_tokens(usage: Mapping[str, Any] | None) -> tuple[int | None, int | None]:
    """Extract ``(input_tokens, output_tokens)`` from an Anthropic-style ``usage`` object."""
    if not usage:
        return None, None
    input_tokens, output_tokens = usage.get("input_tokens"), usage.get("output_tokens")
    for value in (input_tokens, output_tokens):
        if value is not None and (isinstance(value, bool) or not isinstance(value, int)):
            raise ValueError("usage token counts must be integers")
    return input_tokens, output_tokens


class RunHandle:
    """Mutable holder yielded by ``AIRunRecorder.track`` so the body can report usage."""

    def __init__(self) -> None:
        self.input_tokens: int | None = None
        self.output_tokens: int | None = None

    def set_usage(self, input_tokens: int | None, output_tokens: int | None) -> None:
        self.input_tokens, self.output_tokens = input_tokens, output_tokens

    def set_usage_from(self, usage: Mapping[str, Any] | None) -> None:
        self.set_usage(*usage_tokens(usage))


class AIRunRecorder:
    """Builds ``AIRun`` records (G5 §38) and appends them to an ``AuditLedger``."""

    def __init__(
        self,
        ledger: AuditLedger,
        *,
        rate_card: Mapping[str, ModelRate] | None = None,
        xcg_per_usd: float | int | str | Decimal | None = None,
        run_id_factory: Callable[[], str] | None = None,
        clock: Callable[[], float] = time.perf_counter,
    ) -> None:
        self._ledger = ledger
        self._rate_card = rate_card
        self._xcg_per_usd = xcg_per_usd
        self._run_id_factory = run_id_factory or (lambda: f"RUN-{uuid.uuid4().hex[:12]}")
        self._clock = clock

    def record(
        self,
        *,
        command_id: str,
        stage: str,
        model: str,
        status: str,
        input_tokens: int | None = None,
        output_tokens: int | None = None,
        duration_ms: int | None = None,
    ) -> AIRun:
        if status not in VALID_RUN_STATUSES:
            raise ValueError(f"status must be one of {VALID_RUN_STATUSES}, got {status!r}")
        usd = estimate_cost_usd(model, input_tokens, output_tokens, self._rate_card)
        total = None if input_tokens is None or output_tokens is None else input_tokens + output_tokens
        run = AIRun(
            run_id=self._run_id_factory(),
            command_id=command_id,
            stage=stage,
            model=model,
            status=status,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            total_tokens=total,
            estimated_cost_usd=usd,
            estimated_cost_xcg=usd_to_xcg(usd, self._xcg_per_usd),
            duration_ms=duration_ms,
        )
        self._ledger.append_ai_run(run)  # validates, redacts, appends; raises on failure (fail closed)
        return self._ledger.ai_runs()[-1]

    @contextmanager
    def track(self, *, command_id: str, stage: str, model: str) -> Iterator[RunHandle]:
        """Time a model call and record it. An exception in the body records a FAIL run, then re-raises."""
        handle = RunHandle()
        started = self._clock()
        try:
            yield handle
        except BaseException:
            self.record(
                command_id=command_id, stage=stage, model=model, status="FAIL",
                input_tokens=handle.input_tokens, output_tokens=handle.output_tokens,
                duration_ms=self._elapsed_ms(started),
            )
            raise
        self.record(
            command_id=command_id, stage=stage, model=model, status="SUCCESS",
            input_tokens=handle.input_tokens, output_tokens=handle.output_tokens,
            duration_ms=self._elapsed_ms(started),
        )

    def _elapsed_ms(self, started: float) -> int:
        return max(0, round((self._clock() - started) * 1000))


def summarize_runs(runs: Iterable[AIRun], command_id: str | None = None) -> dict[str, Any]:
    """Aggregate runs for the G5 §67 baseline (AI runs, tokens, estimated XCG / USD cost).

    Costs are summed over priced runs only; ``unpriced_runs`` says how many runs had no cost, so a
    partial total is never presented as complete. A total is ``None`` when no run had that value.
    """
    selected = [r for r in runs if command_id is None or r.command_id == command_id]

    def total(attr: str) -> int | float | None:
        values = [getattr(r, attr) for r in selected if getattr(r, attr) is not None]
        if not values:
            return None
        return round(sum(values), 6) if isinstance(values[0], float) else sum(values)

    return {
        "ai_runs": len(selected),
        "failed_runs": sum(1 for r in selected if r.status == "FAIL"),
        "input_tokens": total("input_tokens"),
        "output_tokens": total("output_tokens"),
        "total_tokens": total("total_tokens"),
        "estimated_cost_usd": total("estimated_cost_usd"),
        "estimated_cost_xcg": total("estimated_cost_xcg"),
        "duration_ms": total("duration_ms"),
        "unpriced_runs": sum(1 for r in selected if r.estimated_cost_usd is None),
    }
