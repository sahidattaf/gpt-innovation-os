"""Deterministic controls for the G6 Command Center pilot.

No network calls, no external actions, no autonomous execution.
"""
from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Mapping

_SRC_DIR = str(Path(__file__).resolve().parent)
if _SRC_DIR not in sys.path:  # allow loading this file by path (e.g. importlib in tests)
    sys.path.insert(0, _SRC_DIR)

from secrets_guard import SecretInModelInputError, contains_secret, guard_model_input  # noqa: E402,F401

BLOCKED_ENTITIES = ("bossa", "kai kòrsou", "kai korsou", "sea horizon")
BLOCKED_DATA_CLASSES = ("confidential client data", "credentials", "secrets")
PROHIBITED_ACTIONS = (
    "external_send", "publish", "deploy", "production_write",
    "client_delivery", "autonomous_execution",
)
# Fail-closed action control (G7 fix, KD-3): only these internal actions may be requested.
# Anything else is blocked, whether or not it matches a known-dangerous pattern.
PERMITTED_ACTIONS = frozenset({
    "analyze", "classify", "draft", "recommend", "summarize",
    "validate", "generate_packet", "record_approval", "read_context",
})
# Substring patterns (on the normalized action name) that identify outbound / production
# behaviour. They only select the rule id: unmatched, unlisted actions are blocked anyway.
PROHIBITED_ACTION_PATTERNS = (
    "send", "mail", "smtp", "sms", "dispatch", "transmit", "forward", "broadcast",
    "publish", "upload", "deploy", "deliver", "webhook", "external", "execute",
    "autonomous", "production",
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


def _normalize_action(action: str) -> str:
    split_camel = re.sub(r"(?<=[a-z0-9])(?=[A-Z])", "_", action.strip())
    return re.sub(r"[^a-z0-9]+", "_", split_camel.casefold()).strip("_")


def action_check(requested_action: str) -> PolicyResult:
    """Fail-closed: block prohibited actions, their variants, and anything not explicitly permitted."""
    normalized = _normalize_action(requested_action)
    if normalized in PROHIBITED_ACTIONS or any(token in normalized for token in PROHIBITED_ACTION_PATTERNS):
        return PolicyResult("BLOCK", "ACTION_PROHIBITED", f"Pilot prohibits action: {requested_action}")
    if normalized not in PERMITTED_ACTIONS:
        return PolicyResult("BLOCK", "ACTION_NOT_PERMITTED", f"Action is not on the pilot allowlist (fail-closed): {requested_action}")
    return PolicyResult("ALLOW", "ACTION_ALLOWED", "Action is on the pilot allowlist")


def secret_check(text: str) -> PolicyResult:
    """Detect credential/secret material. Never echoes the secret."""
    if contains_secret(text):
        return PolicyResult(
            "DENY", "SECRET_DETECTED",
            "Secret/credential material detected. Security handling required: do not forward to "
            "model context or audit log; redact and notify the owner.",
        )
    return PolicyResult("ALLOW", "NO_SECRET_DETECTED", "No secret material detected")


def scope_check(scope: str, excluded_scope: str = "", requested_action: str | None = None) -> PolicyResult:
    if contains_secret(scope) or contains_secret(excluded_scope):
        return PolicyResult("BLOCK", "SECRET_DETECTED", secret_check(scope + " " + excluded_scope).rationale)
    hit = _contains(scope, BLOCKED_ENTITIES + BLOCKED_DATA_CLASSES)
    if hit:
        return PolicyResult("BLOCK", "SCOPE_BLOCKED", f"Blocked entity/data class detected: {hit}")
    if requested_action is not None:
        action = action_check(requested_action)
        if action.result != "ALLOW":
            return action
    return PolicyResult("ALLOW", "SCOPE_ALLOWED", "No blocked scope or action detected")


def source_check(source: str) -> PolicyResult:
    if contains_secret(source):
        return PolicyResult("DENY", "SECRET_DETECTED", secret_check(source).rationale)
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
