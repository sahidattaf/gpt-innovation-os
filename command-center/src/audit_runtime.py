"""In-memory audit and AI-run instrumentation for G7 verification.

Internal pilot only. No network calls or external actions.
"""
from __future__ import annotations

import sys
from dataclasses import asdict, dataclass, fields, replace
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

_SRC_DIR = str(Path(__file__).resolve().parent)
if _SRC_DIR not in sys.path:  # allow loading this file by path (e.g. importlib in tests)
    sys.path.insert(0, _SRC_DIR)

from secrets_guard import redact_value  # noqa: E402


@dataclass(frozen=True)
class AuditEvent:
    event_id: str
    command_id: str
    timestamp: str
    actor: str
    event_type: str
    object_type: str
    object_id: str
    result: str
    version: str | None = None
    status_before: str | None = None
    status_after: str | None = None
    policy_rule: str | None = None
    # Names of fields on this event that hold secret material. They are always written as [REDACTED].
    secret_fields: tuple[str, ...] = ()


@dataclass(frozen=True)
class AIRun:
    run_id: str
    command_id: str
    stage: str
    model: str
    status: str
    input_tokens: int | None = None
    output_tokens: int | None = None
    total_tokens: int | None = None
    estimated_cost_usd: float | None = None
    estimated_cost_xcg: float | None = None
    duration_ms: int | None = None
    # Names of fields on this run that hold secret material. They are always written as [REDACTED].
    secret_fields: tuple[str, ...] = ()


def _sanitize(record: Any) -> Any:
    """Redaction layer: runs before anything is written to the ledger (G7 fix, KD-4).

    - Fields named in ``record.secret_fields`` are replaced with ``[REDACTED]``.
    - Every other string field is pattern-scrubbed for secret material.
    """
    labelled = set(record.secret_fields)
    unknown = labelled - {f.name for f in fields(record)}
    if unknown:  # fail closed on a typo'd label rather than silently leaking the field
        raise ValueError(f"secret_fields names unknown field(s): {sorted(unknown)}")
    changes = {
        f.name: redact_value(getattr(record, f.name), secret=f.name in labelled)
        for f in fields(record)
        if f.name != "secret_fields" and isinstance(getattr(record, f.name), (str, type(None)))
    }
    return replace(record, **changes)


class AuditLedger:
    """Append-only in-memory ledger for pilot verification. All writes pass through redaction."""

    def __init__(self) -> None:
        self._events: list[AuditEvent] = []
        self._runs: list[AIRun] = []

    @staticmethod
    def now() -> str:
        return datetime.now(timezone.utc).isoformat()

    def append_event(self, event: AuditEvent) -> None:
        self._events.append(_sanitize(event))

    def append_ai_run(self, run: AIRun) -> None:
        if run.duration_ms is not None and run.duration_ms < 0:
            raise ValueError("duration_ms cannot be negative")
        for value in (run.input_tokens, run.output_tokens, run.total_tokens):
            if value is not None and value < 0:
                raise ValueError("token counts cannot be negative")
        for value in (run.estimated_cost_usd, run.estimated_cost_xcg):
            if value is not None and value < 0:
                raise ValueError("cost cannot be negative")
        self._runs.append(_sanitize(run))

    def events(self) -> tuple[AuditEvent, ...]:
        return tuple(self._events)

    def ai_runs(self) -> tuple[AIRun, ...]:
        return tuple(self._runs)

    def snapshot(self) -> dict[str, list[dict[str, Any]]]:
        return {
            "events": [asdict(event) for event in self._events],
            "ai_runs": [asdict(run) for run in self._runs],
        }
