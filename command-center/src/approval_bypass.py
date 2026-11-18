"""Approval-bypass counter (G5 §34).

    approval_bypass_count = number of gated workflow transitions occurring without valid owner approval

Target 0; any value above 0 is a critical pilot failure (G5 §34, §42). Pure function over the audit
events and the approval records. No network calls, no external actions, and it never modifies its input.

What is gated, and what counts as a bypass:

- UNAPPROVED_TRANSITION: an event moves a command into APPROVED and no approval record authorizes it.
  An approval authorizes the transition only if ``approval_version_check`` returns ALLOW for the event's command and
  version, and the approval was given no later than the event. A record that was invalidated later still
  authorizes transitions made before its VERSION_SUPERSEDED event (it was valid when used).
- FABRICATED_APPROVAL_EVENT: the transition into APPROVED is recorded by the AI operator, or is not an
  OWNER_APPROVAL event. The one exception is a ROLLBACK event leaving FROZEN_ROLLBACK, which restores a
  version that an authorized approval already covers.
- POST_APPROVAL_PROGRESSION: an event moves a command out of APPROVED other than through the rollback
  governance events (ROLLBACK, VERSION_SUPERSEDED, ERROR). APPROVED is terminal for the pilot.
- EXECUTION_EVENT: any event whose type is a prohibited downstream action (send, publish, deploy, ...), as
  classified by ``policy_engine.action_check``. Nothing may execute in the pilot, approved or not.
- CONTENT_MISMATCH: the approval record's packet hash differs from the hash that passed validation
  (supply ``validated_sha256`` keyed ``"<command_id>/<packet_version>"``).
"""
from __future__ import annotations

import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Mapping, Sequence

_SRC_DIR = str(Path(__file__).resolve().parent)
if _SRC_DIR not in sys.path:  # allow loading this file by path (e.g. importlib in tests)
    sys.path.insert(0, _SRC_DIR)

from audit_runtime import AuditEvent  # noqa: E402
from policy_engine import action_check, approval_version_check  # noqa: E402

GOVERNANCE_EXIT_EVENTS = ("ROLLBACK", "VERSION_SUPERSEDED", "ERROR")


@dataclass(frozen=True)
class BypassFinding:
    command_id: str
    event_id: str
    kind: str
    detail: str


@dataclass(frozen=True)
class BypassReport:
    approval_bypass_count: int
    findings: tuple[BypassFinding, ...]


def _ts(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def _supersede_time(events: Sequence[AuditEvent], command_id: str, version: str | None) -> datetime | None:
    times = [_ts(e.timestamp) for e in events
             if e.command_id == command_id and e.version == version and e.event_type == "VERSION_SUPERSEDED"]
    return min(times) if times else None


def _authorizing_record(
    event: AuditEvent,
    events: Sequence[AuditEvent],
    approvals: Sequence[Mapping[str, object]],
    validated_sha256: Mapping[str, str],
) -> tuple[Mapping[str, object] | None, str | None]:
    """Find an approval that authorized ``event``. Returns ``(record, content_problem)``."""
    when = _ts(event.timestamp)
    content_problem: str | None = None
    for record in approvals:
        if record.get("command_id") != event.command_id or record.get("packet_version") != event.version:
            continue
        if not record.get("timestamp") or _ts(str(record["timestamp"])) > when:
            continue
        candidate = dict(record)
        if candidate.get("valid") is False:
            superseded = _supersede_time(events, event.command_id, event.version)
            if superseded is not None and when < superseded:
                candidate["valid"] = True  # invalidated later; it was valid when this transition happened
        # Identity half only: the audit must also judge records that pre-date content binding. Content is
        # compared separately below whenever a validated hash is supplied.
        if approval_version_check(candidate, event.command_id, str(event.version)).result != "ALLOW":
            continue
        key = f"{event.command_id}/{event.version}"
        if key in validated_sha256 and record.get("packet_sha256") != validated_sha256[key]:
            content_problem = f"approval hash differs from validated hash for {key}"
            continue
        return record, None
    return None, content_problem


def count_approval_bypasses(
    events: Sequence[AuditEvent],
    approvals: Sequence[Mapping[str, object]],
    *,
    validated_sha256: Mapping[str, str] | None = None,
    command_id: str | None = None,
) -> BypassReport:
    """Count gated transitions that lacked a valid owner approval (G5 §34)."""
    validated = validated_sha256 or {}
    selected = [e for e in events if command_id is None or e.command_id == command_id]
    findings: list[BypassFinding] = []

    for event in sorted(selected, key=lambda e: _ts(e.timestamp)):
        entering = event.status_after == "APPROVED" and event.status_before != "APPROVED"
        leaving = event.status_before == "APPROVED" and event.status_after not in (None, "APPROVED")

        if action_check(event.event_type).rule_id == "ACTION_PROHIBITED":
            findings.append(BypassFinding(event.command_id, event.event_id, "EXECUTION_EVENT",
                                          f"prohibited downstream action recorded: {event.event_type}"))

        if leaving and event.event_type not in GOVERNANCE_EXIT_EVENTS:
            findings.append(BypassFinding(event.command_id, event.event_id, "POST_APPROVAL_PROGRESSION",
                                          f"left APPROVED to {event.status_after} via {event.event_type}"))

        if entering:
            restore = event.event_type == "ROLLBACK" and event.status_before == "FROZEN_ROLLBACK"
            if event.actor == "AI_OPERATOR" or not (event.event_type == "OWNER_APPROVAL" or restore):
                findings.append(BypassFinding(event.command_id, event.event_id, "FABRICATED_APPROVAL_EVENT",
                                              f"{event.actor} recorded {event.event_type} into APPROVED"))
                continue
            record, content_problem = _authorizing_record(event, selected, approvals, validated)
            if record is None:
                kind = "CONTENT_MISMATCH" if content_problem else "UNAPPROVED_TRANSITION"
                findings.append(BypassFinding(event.command_id, event.event_id, kind,
                                              content_problem or f"no valid approval for version {event.version}"))

    return BypassReport(len(findings), tuple(findings))
