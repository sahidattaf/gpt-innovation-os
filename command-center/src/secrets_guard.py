"""Secret detection and redaction for the Command Center pilot.

Pure functions: no network calls, no I/O, no external actions. Nothing here ever
echoes a detected secret back (messages describe *that* a secret was found, not what it was).

Limitation: detection is pattern-based. Free-text such as "the password is hunter2" is not
caught unless the value is labelled by the caller (see ``redact_value(..., secret=True)`` and
``AuditEvent.secret_fields``). Fail-closed callers should label known-sensitive fields.
"""
from __future__ import annotations

import re
from typing import Any

REDACTED = "[REDACTED]"

SECRET_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"sk-[A-Za-z0-9_\-]{8,}"),                                   # Anthropic / OpenAI style keys
    re.compile(r"\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{16,}\b"),            # GitHub tokens
    re.compile(r"\bgithub_pat_[A-Za-z0-9_]{20,}\b"),                        # GitHub fine-grained PAT
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),                                    # AWS access key id
    re.compile(r"\bxox[abprs]-[A-Za-z0-9\-]{10,}\b"),                       # Slack tokens
    re.compile(r"\b(?:secret|ntn)_[A-Za-z0-9]{20,}\b"),                     # Notion integration tokens
    re.compile(r"\beyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\b"),  # JWT
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),                      # PEM private key header
    re.compile(r"\bbearer\s+[A-Za-z0-9._~+/=\-]{16,}", re.IGNORECASE),      # Authorization: Bearer ...
    re.compile(
        r"\b(?:api[_ \-]?key|api[_ \-]?token|access[_ \-]?token|auth[_ \-]?token|client[_ \-]?secret"
        r"|secret|token|password|passwd|pwd)\b\s*[:=]\s*\S+",
        re.IGNORECASE,
    ),                                                                      # label: value / label=value
)


class SecretInModelInputError(ValueError):
    """Raised when text that contains secret material is about to enter model context."""


def contains_secret(text: str) -> bool:
    return any(pattern.search(text) for pattern in SECRET_PATTERNS)


def redact_text(text: str) -> str:
    """Replace every detected secret in ``text`` with ``[REDACTED]``."""
    for pattern in SECRET_PATTERNS:
        text = pattern.sub(REDACTED, text)
    return text


def redact_value(value: Any, *, secret: bool = False) -> Any:
    """Redact a value. ``secret=True`` (an explicit label) redacts it entirely.

    Strings are pattern-scrubbed, lists/tuples/dicts are handled recursively, other types pass through.
    """
    if value is None:
        return None
    if secret:
        return REDACTED
    if isinstance(value, str):
        return redact_text(value)
    if isinstance(value, (list, tuple)):
        return type(value)(redact_value(item) for item in value)
    if isinstance(value, dict):
        return {key: redact_value(item) for key, item in value.items()}
    return value


def guard_model_input(text: str) -> str:
    """Return ``text`` unchanged if clean; raise if it contains a secret (fail closed).

    Call this on every string before it is placed into a model prompt.
    """
    if contains_secret(text):
        raise SecretInModelInputError(
            "Secret material detected; security handling required. Input must not enter model context."
        )
    return text
