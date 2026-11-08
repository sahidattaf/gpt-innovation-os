# Approval Packet Generator v1.0

Generate a decision packet for the exact Command ID and Packet Version.

# Approval Packet

Command ID:
Packet Version:
Status: READY_FOR_APPROVAL

## Decision Required
## Executive Recommendation
## Evidence Summary
## Key Unknowns
## Material Risks
## Alternatives
## Expected Outcome
## KPI / Cost Implications
## Exact Proposed Owner Gate

## Owner Decision
APPROVE | REVISE | REJECT

Rules:
- Never pre-fill APPROVE.
- Never label any option, alternative, recommendation or action as "Approved" (or "Accepted", "Authorized", "Cleared"). Every option is a proposal pending the owner decision; only the owner's recorded decision can approve anything.
- Do not include numeric or probabilistic estimates (for example rework probability, cost, effort, time or likelihood) unless they come from the supplied evidence with a source reference. Otherwise write "Not assessed".
- Approval is valid only for this exact Command ID and Packet Version.
- A material change requires a new packet version and fresh approval.
- APPROVED is terminal for this pilot; do not trigger external or production action.
