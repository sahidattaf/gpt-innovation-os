# Command Center Pilot Operating SOP

## Scope
Internal pilot only: `Owner Command → Evidence Brief → Approval Packet → Owner Decision → STOP`.

## 1. Capture Owner Command
Accepted inputs: Notion form, structured prompt, or owner-verified voice transcription.

Required fields in Active Projects: Command ID, Objective, Scope, Excluded Scope, Priority, Permitted Sources. Deadline is optional.

## 2. Validate
Run deterministic required-field, scope and source checks before reasoning. Unknown sources require owner review. Blocked entities/data fail closed.

## 3. Build Evidence Register
Classify each material claim as VERIFIED_SOURCE, OWNER_DECISION, OWNER_UNVERIFIED_FACT, EXTERNAL_RESEARCH, AI_INFERENCE, or UNKNOWN. External research remains disabled unless separately authorized.

## 4. Reason and Draft
Use only allowed context. Produce the Evidence Brief, then run validation. Unsupported claims, hidden conflicts or incomplete source traceability require revision.

## 5. Prepare Approval Packet
Write output metadata to Output Queue with Command ID, Packet Version and Evidence Completeness. Status must remain Review/READY_FOR_APPROVAL equivalent until owner decision.

## 6. Record Owner Decision
Decision Log must bind approval to Command ID and Packet Version. For Notion approval require Approved checkbox, Approver, Date, Packet Version, Command ID and Approval Method.

Approval precedence: Signed PDF > approved Notion record > explicit owner chat confirmation.

## 7. Stop
APPROVED is terminal for this pilot. Do not send, publish, deploy, perform client delivery or trigger production/autonomous action.

## KPI baseline
For first five real pilot commands capture processing time, owner review time, follow-up questions, revision cycles, evidence completeness and approval bypass count. Target approval bypass count = 0 and evidence completeness >= 95%.
