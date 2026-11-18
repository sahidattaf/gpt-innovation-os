"""Pilot KPI fields held as an in-code JSON convention (G5 §35-37, §59, §67).

Notion has no property for Deliverable, Processing Time, Rework or Follow-up Questions, and the owner
has NOT approved adding any. Until then these four fields travel as a ``pilot_metrics`` object inside
the command's JSON payload and, when a human-readable copy is wanted, as one delimited section in the
Notion page *body*. This module only builds and parses those values: it never calls Notion, never
adds a property, and never performs an external action.

Rules:
- Deliverable is never invented. A missing deliverable is the literal ``NOT_PROVIDED``.
- Processing time (READY_FOR_APPROVAL - RECEIVED) and owner review time (OWNER decision -
  READY_FOR_APPROVAL) are kept apart so human waiting time is not charged to the AI (§35).
- A value that cannot be derived is ``None``, never ``0``.
- Everything is passed through the secrets redaction layer before it is returned or rendered.
"""
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Mapping, Sequence

_SRC_DIR = str(Path(__file__).resolve().parent)
if _SRC_DIR not in sys.path:  # allow loading this file by path (e.g. importlib in tests)
    sys.path.insert(0, _SRC_DIR)

from audit_runtime import AuditEvent  # noqa: E402
from secrets_guard import redact_value  # noqa: E402

SCHEMA_VERSION = "1.0"
PAYLOAD_KEY = "pilot_metrics"
DELIVERABLE_NOT_PROVIDED = "NOT_PROVIDED"
FOLLOW_UP_REASONS = ("MISSING_FIELD", "AMBIGUOUS_SCOPE", "SOURCE_PERMISSION", "CONFLICT", "VOICE_UNCERTAINTY", "OTHER")
OWNER_DECISION_EVENTS = ("OWNER_APPROVAL", "OWNER_REVISION", "OWNER_REJECTION")

SECTION_START = f"<!-- command-center:{PAYLOAD_KEY}:start v1 -->"
SECTION_END = f"<!-- command-center:{PAYLOAD_KEY}:end -->"
_SECTION_RE = re.compile(re.escape(SECTION_START) + r".*?" + re.escape(SECTION_END), re.DOTALL)
_JSON_FENCE_RE = re.compile(r"```json\s*\n(.*?)\n```", re.DOTALL)


@dataclass(frozen=True)
class FollowUpQuestion:
    """One owner clarification request (G5 §37)."""

    reason: str
    asked_at: str

    def __post_init__(self) -> None:
        if self.reason not in FOLLOW_UP_REASONS:
            raise ValueError(f"follow-up reason must be one of {FOLLOW_UP_REASONS}, got {self.reason!r}")
        _parse_time(self.asked_at)


def _parse_time(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def _seconds_between(start: str | None, end: str | None) -> float | None:
    if start is None or end is None:
        return None
    seconds = (_parse_time(end) - _parse_time(start)).total_seconds()
    if seconds < 0:
        raise ValueError(f"end {end!r} is before start {start!r}")
    return round(seconds, 3)


def _first(events: Sequence[AuditEvent], predicate) -> AuditEvent | None:
    return next((e for e in sorted(events, key=lambda e: _parse_time(e.timestamp)) if predicate(e)), None)


def normalize_deliverable(deliverable: str | None) -> str:
    """The owner's deliverable, or ``NOT_PROVIDED``. Never inferred from other fields."""
    text = (deliverable or "").strip()
    return text if text else DELIVERABLE_NOT_PROVIDED


def processing_time(events: Sequence[AuditEvent]) -> dict[str, Any]:
    """READY_FOR_APPROVAL timestamp minus RECEIVED timestamp (G5 §35)."""
    received = _first(events, lambda e: e.event_type == "COMMAND_RECEIVED" or e.status_after == "RECEIVED")
    ready = _first(events, lambda e: e.status_after == "READY_FOR_APPROVAL")
    received_at = received.timestamp if received else None
    ready_at = ready.timestamp if ready else None
    return {"seconds": _seconds_between(received_at, ready_at), "received_at": received_at, "ready_for_approval_at": ready_at}


def owner_review_time(events: Sequence[AuditEvent]) -> dict[str, Any]:
    """First owner decision after READY_FOR_APPROVAL, minus READY_FOR_APPROVAL (G5 §35)."""
    ready = _first(events, lambda e: e.status_after == "READY_FOR_APPROVAL")
    ready_at = ready.timestamp if ready else None
    decision = None
    if ready_at:
        decision = _first(events, lambda e: e.event_type in OWNER_DECISION_EVENTS and _parse_time(e.timestamp) >= _parse_time(ready_at))
    decided_at = decision.timestamp if decision else None
    return {"seconds": _seconds_between(ready_at, decided_at), "ready_for_approval_at": ready_at, "owner_decision_at": decided_at}


def rework(events: Sequence[AuditEvent]) -> dict[str, Any]:
    """Revision tracking (G5 §36). Counts *entries into* NEEDS_REVISION, split by cause.

    ``owner_requested`` = NEEDS_REVISION entered from READY_FOR_APPROVAL (after owner review).
    ``system_detected``  = NEEDS_REVISION entered from anywhere else (for example a failed validation).
    ``submitted_for_owner_review`` = the command reached READY_FOR_APPROVAL at least once.
    """
    entries = [e for e in events if e.status_after == "NEEDS_REVISION"]
    owner = sum(1 for e in entries if e.status_before == "READY_FOR_APPROVAL")
    submitted = any(e.status_after == "READY_FOR_APPROVAL" for e in events)
    return {
        "submitted_for_owner_review": submitted,
        "owner_requested": owner,
        "system_detected": len(entries) - owner,
        "reworked_after_first_owner_review": owner > 0,
    }


def follow_up_questions(questions: Sequence[FollowUpQuestion], events: Sequence[AuditEvent]) -> dict[str, Any]:
    """Owner clarification requests before the first READY_FOR_APPROVAL (G5 §37), by reason."""
    ready = _first(events, lambda e: e.status_after == "READY_FOR_APPROVAL")
    cutoff = _parse_time(ready.timestamp) if ready else None
    counted = [q for q in questions if cutoff is None or _parse_time(q.asked_at) < cutoff]
    return {
        "count": len(counted),
        "by_reason": {reason: sum(1 for q in counted if q.reason == reason) for reason in FOLLOW_UP_REASONS},
    }


def build_command_metrics(
    command_id: str,
    *,
    deliverable: str | None,
    events: Sequence[AuditEvent],
    follow_ups: Sequence[FollowUpQuestion] = (),
    ai_cost: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """The ``pilot_metrics`` object for one command. ``ai_cost`` is ``summarize_runs(...)`` output."""
    own = [e for e in events if e.command_id == command_id]
    metrics = {
        "schema_version": SCHEMA_VERSION,
        "command_id": command_id,
        "deliverable": normalize_deliverable(deliverable),
        "processing_time": processing_time(own),
        "owner_review_time": owner_review_time(own),
        "rework": rework(own),
        "follow_up_questions": follow_up_questions(follow_ups, own),
        "ai_cost": dict(ai_cost) if ai_cost is not None else None,
    }
    return redact_value(metrics)


def attach_to_payload(payload: Mapping[str, Any], metrics: Mapping[str, Any]) -> dict[str, Any]:
    """Return a copy of a command's JSON payload with ``pilot_metrics`` set. No Notion property is implied."""
    merged = dict(payload)
    merged[PAYLOAD_KEY] = dict(metrics)
    return merged


def render_page_body_section(metrics: Mapping[str, Any]) -> str:
    """Human-readable, machine-parseable Notion page-body section (no new Notion property needed)."""
    safe = redact_value(dict(metrics))
    processing = safe["processing_time"]["seconds"]
    review = safe["owner_review_time"]["seconds"]
    fmt = lambda s: "not yet measurable" if s is None else f"{s} s"  # noqa: E731
    lines = [
        SECTION_START,
        "## Pilot Metrics",
        "",
        f"- Deliverable: {safe['deliverable']}",
        f"- Processing time: {fmt(processing)}",
        f"- Owner review time: {fmt(review)}",
        f"- Rework (owner-requested / system-detected): {safe['rework']['owner_requested']} / {safe['rework']['system_detected']}",
        f"- Follow-up questions: {safe['follow_up_questions']['count']}",
        "",
        "```json",
        json.dumps(safe, indent=2, sort_keys=True),
        "```",
        SECTION_END,
    ]
    return "\n".join(lines)


def parse_page_body_section(body: str) -> dict[str, Any] | None:
    """Read the metrics back out of a page body; ``None`` if there is no section. Bad JSON raises."""
    match = _SECTION_RE.search(body)
    if not match:
        return None
    fence = _JSON_FENCE_RE.search(match.group(0))
    if not fence:
        raise ValueError("pilot-metrics section has no JSON block")
    parsed = json.loads(fence.group(1))
    if not isinstance(parsed, dict) or parsed.get("schema_version") != SCHEMA_VERSION:
        raise ValueError("pilot-metrics section has an unsupported schema_version")
    return parsed


def upsert_page_body_section(body: str, metrics: Mapping[str, Any]) -> str:
    """Replace the section in place, or append it. Everything outside the markers is left untouched."""
    section = render_page_body_section(metrics)
    if _SECTION_RE.search(body):
        return _SECTION_RE.sub(lambda _m: section, body, count=1)
    return (body.rstrip("\n") + "\n\n" if body.strip() else "") + section + "\n"


def rework_rate_percent(all_metrics: Sequence[Mapping[str, Any]]) -> float | None:
    """Commands that re-entered NEEDS_REVISION after owner review / commands submitted for review x 100 (§36)."""
    submitted = [m for m in all_metrics if m["rework"]["submitted_for_owner_review"]]
    if not submitted:
        return None
    reworked = sum(1 for m in submitted if m["rework"]["reworked_after_first_owner_review"])
    return round(reworked / len(submitted) * 100.0, 2)


def baseline_summary(all_metrics: Sequence[Mapping[str, Any]]) -> dict[str, Any]:
    """Plain descriptive baseline over the pilot commands (G5 §67). No ROI or trend claim is made."""

    def values(section: str) -> list[float]:
        return [m[section]["seconds"] for m in all_metrics if m[section]["seconds"] is not None]

    def mean(items: list[float]) -> float | None:
        return round(sum(items) / len(items), 3) if items else None

    proc, review = values("processing_time"), values("owner_review_time")
    return {
        "commands": len(all_metrics),
        "processing_seconds_mean": mean(proc),
        "processing_seconds_measured": len(proc),
        "owner_review_seconds_mean": mean(review),
        "owner_review_seconds_measured": len(review),
        "follow_up_questions_total": sum(m["follow_up_questions"]["count"] for m in all_metrics),
        "rework_rate_percent": rework_rate_percent(all_metrics),
        "ai_runs_total": sum((m["ai_cost"] or {}).get("ai_runs", 0) for m in all_metrics),
        "note": "Descriptive baseline only; five observations do not support an ROI claim (G5 §67).",
    }
