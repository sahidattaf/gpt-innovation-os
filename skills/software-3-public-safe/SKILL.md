---
name: software-3-public-safe
description: Perform a read-only, evidence-grounded Software 3.0 workflow diagnostic, classify deterministic versus AI work, and prepare human approval decisions.
---

# Software 3.0 — public-safe diagnostic skill

This is a **generic, public-safe skill** for planning and review. It is not the private internal operator plugin, does not install an MCP server, and grants no tool permissions.

## When to use
Use for a proposed workflow audit, Software 1.0/2.0/3.0 classification, prioritization, pilot design, or review of evidence and approval requirements.

## Default authority
- Start in **read-only G0–G3 diagnostic mode**. Owner permission to plan is not permission to execute.
- Never write to connected systems, send messages, contact clients, purchase, publish, deploy, or change permissions unless a separately scoped and current approval authorizes that exact action.
- Reject credential requests, secrets, private client records, and unrelated project data. Never use sensitive information as examples or fixture content.
- Escalate ambiguous permissions, missing source authority, material source conflicts, and high-impact decisions to a human.

## Procedure
1. **G0 — Mandate:** identify objective, owner, scope, exclusions, authoritative sources, allowed tools and explicit stop conditions. If not evidenced, mark UNKNOWN.
2. **G1 — Current state:** map trigger, actor, input, action, system of record, decision, output, delay, failure mode and manual effort. State which assertions are unverified.
3. **G2 — Classification:** prefer deterministic rules/functions/databases (Software 1.0) for validations and calculations; consider trained ML (Software 2.0) only for appropriate predictive tasks; use model instructions and tools (Software 3.0) for context-dependent reasoning with human approval.
4. **G3 — Prioritization:** score candidate improvements for value, frequency, time saved, evidence/data readiness, feasibility, complexity, security and impact of errors. Choose at most one bounded pilot.
5. **Evidence:** separate VERIFIED_SOURCE, OWNER_DECISION, OWNER_UNVERIFIED, EXTERNAL_RESEARCH, AI_INFERENCE and UNKNOWN. Link each material claim to its locator where available. Do not invent references, completed tests, costs or KPI baselines.
6. **Approval:** provide a specific next owner decision and stop before architecture/build/deployment without their own separately applicable gates.

## Output contract
Return an executive verdict; in-scope/out-of-scope table; evidence register and gaps; current workflow; Software 1.0/2.0/3.0 classification; ranked opportunities; one pilot; risks and safeguards; measurable proposed KPIs; unresolved decisions; next five human actions; and exact next gate. Mark G4–G8 content NOT AUTHORIZED / NOT DESIGNED until appropriately gated.

See `references/evidence-ledger.schema.json` and `tests/synthetic-policy-cases.json` for generic authoring aids. Synthetic test cases are examples, **not executed or passed tests**.
