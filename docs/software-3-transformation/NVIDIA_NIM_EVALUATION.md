# NVIDIA NIM Evaluation Plan — S3T-001

## Decision

NVIDIA NIM is an optional non-production evaluation provider. Claude remains the default. This document does not authorize an API key, paid usage, local container deployment, production traffic, or confidential data.

## Compatibility target

Use an OpenAI-compatible chat-completions adapter only after a provider-abstraction gate. The adapter must accept the canonical S3T prompt and return the same normalized response contract as the default provider.

## Required controls

- Environment variable placeholders only; no real keys in Git.
- Public or synthetic evaluation data only.
- Allowlisted model identifier recorded with test results.
- Provider, model, latency, token usage, and evaluation outcome logged.
- No tools or external actions during model comparison.
- Timeouts, retry limits, and explicit failure output.
- Human review of every comparison.
- Stop if terms, rate limits, model availability, or data handling are unclear.

## Comparison

Evaluate instruction adherence, grounding, evidence classification, gate compliance, structured-output completeness, multilingual behavior, latency, and estimated cost. Provider output quality must be measured; it must not be inferred from model reputation.

## Gate

OWNER GATE S3T-NIM-1 must explicitly authorize key setup and a bounded public/synthetic evaluation before any live call.
