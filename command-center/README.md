# GPT Innovation Operator Command Center — G6 Pilot

Status: **Controlled Internal Build**

Pilot flow: `Owner Command → Evidence Brief → Approval Packet → Owner Decision → STOP`

## Hard boundaries

- No autonomous downstream execution.
- No external sending, publishing, deployment, production action, or client delivery.
- Blocked domains/data: BOSSA, Kai Kòrsou, Sea Horizon, confidential client data, credentials, secrets.
- Human approval is required and is bound to an exact Command ID and Packet Version.
- Unknown sources default to `OWNER_REVIEW`, never `ALLOW`.

## Existing Notion mappings

- Active Projects: Owner Command record and scope/source controls.
- Output Queue: Evidence Brief / Approval Packet output metadata.
- Decision Log: version-bound owner approval record.

## Pilot KPIs

Measure the first five commands for time per request, rework rate, follow-up questions, approval bypass count, and evidence completeness.

## G6 stop boundary

An `APPROVED` decision is terminal for this pilot. It records owner approval but does not trigger any external or production action.
