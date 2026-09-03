"""Deterministic controls for the G6 Command Center pilot.

No network calls, no external actions, no autonomous execution.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Mapping

BLOCKED_ENTITIES = ("bossa", "kai kòrsou", "kai korsou", "sea horizon")
BLOCKED_DATA_CLASSES = ("confidential client data", "credentials", "secrets")
PROHIBITED_ACTIONS = (
    "external_send", "publish", "deploy", "production_write",
    "client_delivery", "autonomous_execution",
)
PERMITTED_SOURCES = {
    "GPT Innovation Command Center",
    "Software 3.0 Transformation OS",
    "GPT Innovation by Attaf",
    "GPT Innovation — Owner Business Plan 2026",
    "GPT Innovation — Company Operations Hub",
    "sahidattaf/gpt-innovation-os",
    "relevant chat history",
}

@dataclass(frozen=True)
class PolicyResult:
    result: str
    rule_id: str
    rationale: str


def _contains(haystack: str, needles: Iterable[str]) -> str | None:
    normalized = haystack.casefold()
    for needle in needles:
        if needle.casefold() in normalized:
            return needle
    return None


def scope_check(scope: str, excluded_scope: str = "", requested_action: str | None = None) -> PolicyResult:
    combined = f"{scope}\n{excluded_scope}"
    hit = _contains(scope, BLOCKED_ENTITIES + BLOCKED_DATA_CLASSES)
    if hit:
        return PolicyResult("BLOCK", "SCOPE_BLOCKED", f"Blocked entity/data class detected: {hit}")
    if requested_action and requested_action in PROHIBITED_ACTIONS:
        return PolicyResult("BLOCK", "ACTION_PROHIBITED", f"Pilot prohibits action: {requested_action}")
    return PolicyResult("ALLOW", "SCOPE_ALLOWED", "No blocked scope or action detected")


def source_check(source: str) -> PolicyResult:
    if _contains(source, BLOCKED_ENTITIES + BLOCKED_DATA_CLASSES):
        return PolicyResult("DENY", "SOURCE_BLOCKED", "Blocked source/data class")
    if source in PERMITTED_SOURCES:
        return PolicyResult("ALLOW", "SOURCE_ALLOWED", "Source is explicitly permitted")
    return PolicyResult("OWNER_REVIEW", "SOURCE_UNKNOWN", "Unknown sources require owner approval")


def approval_check(record: Mapping[str, object], command_id: str, packet_version: str) -> PolicyResult:
    required = ("command_id", "packet_version", "decision", "approver", "timestamp", "method", "evidence_reference")
    missing = [key for key in required if not record.get(key)]
    if missing:
        return PolicyResult("DENY", "APPROVAL_INCOMPLETE", f"Missing approval fields: {', '.join(missing)}")
    if record["command_id"] != command_id or record["packet_version"] != packet_version:
        return PolicyResult("DENY", "APPROVAL_VERSION_MISMATCH", "Approval does not bind to this command/version")
    if record["decision"] != "APPROVED":
        return PolicyResult("DENY", "APPROVAL_NOT_APPROVED", "Owner decision is not APPROVED")
    if record["method"] not in {"SIGNED_PDF", "NOTION", "CHAT"}:
        return PolicyResult("DENY", "APPROVAL_METHOD_INVALID", "Unrecognized approval method")
    return PolicyResult("ALLOW", "APPROVAL_VALID", "Approval is explicit and version-bound")


def evidence_completeness(material_claims: int, classified_claims: int) -> float:
    if material_claims < 0 or classified_claims < 0 or classified_claims > material_claims:
        raise ValueError("Invalid claim counts")
    if material_claims == 0:
        return 100.0
    return round(classified_claims / material_claims * 100.0, 2)


def next_state(current: str, event: str) -> str:
    transitions = {
        ("RECEIVED", "scope_allow"): "SOURCE_CHECK",
        ("RECEIVED", "scope_block"): "BLOCKED_SCOPE",
        ("SOURCE_CHECK", "sources_allow"): "CONTEXT_READY",
        ("SOURCE_CHECK", "source_unknown"): "NEEDS_SOURCE_APPROVAL",
        ("CONTEXT_READY", "analyze"): "ANALYSIS",
        ("ANALYSIS", "validate"): "VALIDATION",
        ("VALIDATION", "pass"): "READY_FOR_APPROVAL",
        ("VALIDATION", "fail"): "NEEDS_REVISION",
        ("READY_FOR_APPROVAL", "approve"): "APPROVED",
        ("READY_FOR_APPROVAL", "revise"): "NEEDS_REVISION",
        ("READY_FOR_APPROVAL", "reject"): "REJECTED",
    }
    try:
        return transitions[(current, event)]
    except KeyError as exc:
        raise ValueError(f"Disallowed transition: {current} + {event}") from exc
