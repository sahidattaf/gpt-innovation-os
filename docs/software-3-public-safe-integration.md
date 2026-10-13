# Software 3.0 — public-safe repository integration

**Classification:** public documentation and generic authoring skill only  
**Delivery scope:** feature-branch review artifact  
**No deployment or activation is implied.**

## What is included
- `skills/software-3-public-safe/SKILL.md`: read-only, evidence-first G0–G3 diagnostic.
- `skills/software-3-public-safe/references/evidence-ledger.schema.json`: generic evidence contract.
- `skills/software-3-public-safe/tests/synthetic-policy-cases.json`: proposed synthetic policy scenarios (not executed).
- This integration note and `docs/software-3-public-safe-review.md`.

## Separation of concerns
The repository already contains a governed Software 3.0 area at `s3t-001/`. This contribution does not change or supersede its policies, prompts, schemas or SOPs.

A separately maintained **private** internal operator plugin exists outside this repository. Its internal prompt text, owner-gate history, proprietary operating instructions, fixture registers, telemetry, internal data and credentials are **not** distributed in this public contribution. Do not use these public files to reconstruct or claim release of that private plugin.

## Intended usage
Use the generic skill for a public-data or synthetic, read-only diagnostic. For business-specific work, the owner must select the appropriate authoritative source and separately authorize any action beyond the approved review boundary.

## Non-goals
No MCP endpoint, installed application, account connection, database mutation, repository automation, agent execution, client operation, external messaging, deployment or production readiness claim is delivered by this change.

## Change management
Review and run security checks on this branch before any merge or broader publication. Keep this addition independent from existing application packages; do not modify the existing root build or CI configuration as part of this documentation-only integration.
