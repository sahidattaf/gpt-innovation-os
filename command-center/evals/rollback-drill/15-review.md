# R-15 Post-rollback review (SOP §10)

Command `GIC-20261108-901`, rollback drill, 2026-11-08. Improvements below are **logged, not implemented** (SOP §10.4).

## What went wrong
A packet (v2) containing an unsupported claim labelled `VERIFIED_SOURCE`, with no source reference, was presented to the owner and approved. The defect was a **simulated** material hallucination, inserted by the operator after the clean v2 packet had passed validation.

## Why it was not caught earlier
- **The approval is not bound to the packet's content.** Validation recorded the hash of the clean v2 (`0d05a555…`). The owner approved a packet with a different hash (`749a5321…`). The approval record holds only `command_id` and `packet_version`; it has no content hash, and `approval_check` has no hash parameter. Nothing compared what was validated with what was approved, so a change made after validation and without a version bump went unnoticed. In this drill the change was deliberate; in production the same hole would let an accidental or malicious edit ride through an approval.
- **No validation at approval time.** The checks ran once, on the clean text. They were not re-run on the exact bytes shown to the owner.
- The post-approval audit (VAL-05) did catch it as soon as it was run.

## Should validation have caught it?
Yes, at approval time. VAL-05 detects this defect; it was simply not run again after the packet changed. Re-running it on the approved bytes, or refusing approval when the packet hash differs from the validated hash, would have blocked the approval.

## What the drill showed about the rollback machinery
- **Worked:** detection by a check rather than by operator knowledge; freeze; v2 kept intact but invalid; last valid version found by walking the ledger backwards; v1 restored with the same number and byte-identical content; no model calls or approvals in the freeze window; `approval_check` rejecting an invalidated approval (after the pre-drill fix); no approval transferring between versions; re-approval bound to the exact version; append-only ledger on every save.
- **Manual (gaps confirmed live):** no `FROZEN_ROLLBACK` state (G1); no code to supersede or restore a version (G3); validation suite exists only as ad-hoc code (G5); no way out of `NEEDS_REVISION` (G7).
- **Fragile:** the validation checker needed five corrections during the run (F-3). Its results are only as trustworthy as that code.

## Proposed improvements (not implemented)
1. **Bind approvals to content.** Add `packet_sha256` to the approval record and schema, and make `approval_check` compare it with the hash of the packet being approved.
2. **Re-validate at approval time** on the exact bytes shown to the owner; refuse to record an approval otherwise.
3. **Add rollback states and transitions** to the schema and `next_state`: `FROZEN_ROLLBACK`, `INVALID`/`SUPERSEDED`, `RESTORED`, and an exit from `NEEDS_REVISION`. Make a freeze actually block packet generation and approvals for the command.
4. **Implement VAL-01 → VAL-08 as tested code**, using the entity-name and secret-scan design that VAL-02 ended with, and resolve the VAL numbering mismatch between the G5 spec and the s3t-001 rollback SOP.
5. **Persist the audit ledger** and give `AuditEvent` a proper `reason` field and a validated `event_type` set (the reason currently lives in `policy_rule`).
6. **Enforce one pending packet per command** in code (KD-5), and add a chat-approval classifier.
7. **Fix schema and prompt vocabulary:** the schema's `priority` enum (`P0/P1/P2`) versus `NORMAL`; the intake status `READY` versus the schema's status enum; stop the intake prompt reporting system facts the model cannot know.

## Cost (SOP §9; recorded, not charged to the command)
- Detection, freeze, invalidation, location and restore: deterministic, **0 tokens**.
- Detect → freeze: 10.2 s. Freeze → restore: 9.3 s.
- Regeneration (v3): 5,815 tokens in, 3,946 out, 88.8 s of model time.
- Freeze → re-approval and closure: 490 s, which includes v3 generation, three validation attempts and the owner's response time.
- Whole drill model use: v1 + v2 + v3 = 17,412 tokens in, 12,299 out.
- MANUAL: three steps marked in the plan (R-02 checklist, R-07 freeze, R-08 invalidate) plus the restore record and three manual `NEEDS_REVISION → READY_FOR_APPROVAL` status changes.
