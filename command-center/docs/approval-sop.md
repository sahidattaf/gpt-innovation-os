# Command Center Pilot — Approval SOP

How approvals are recognized, recorded and refused. Basis: G5 `S3-G5-v1.0` §9, §29–32, §43; `src/policy_engine.py` (`approval_check`, `next_state`).

An approval records an owner decision on **one packet**. It is never permission to execute anything downstream: `APPROVED` is terminal and `APPROVED + execute` is refused by the state machine.

## 1. Who can approve

Only the owner (Coach Sahid Attaf). The AI operator never approves, never fills in a decision box and never marks an option "Approved". Packets are issued with the decision unchecked.

## 2. Approval channels and precedence

| Rank | Channel | `method` value | What counts |
|---|---|---|---|
| 1 | Signed PDF | `SIGNED_PDF` | The signed document |
| 2 | Approved Notion record | `NOTION` | Decision Log entry with **all** of: Approved checkbox = true, Approver, Date, Packet Version, Command ID, Approval Method |
| 3 | Explicit owner chat confirmation | `CHAT` | An explicit phrase (§4) given in reply to a specific packet |

If channels disagree about the same Command ID and Packet Version, the higher-ranked record governs and the discrepancy is logged. Where the signed PDF is stored is G5 Dependency D (open): put the PDF's reference in `evidence_reference` for now.

## 3. Validity rules (G5 §30)

An approval is valid only if **all** hold:

1. The approver is the owner.
2. `command_id` matches the packet's Command ID.
3. `packet_version` matches the packet's version exactly.
4. The decision is explicit (`APPROVED`; the other decisions are `REVISE` and `REJECTED`).
5. A timestamp exists.
6. `method` is `SIGNED_PDF`, `NOTION` or `CHAT`, and `evidence_reference` points to where the approval can be seen.

`approval_check(record, command_id, packet_version)` evaluates, in this order, and stops at the first failure:

| Order | Condition | Result |
|---|---|---|
| 1 | Any of `command_id`, `packet_version`, `decision`, `approver`, `timestamp`, `method`, `evidence_reference` missing or empty | `DENY` / `APPROVAL_INCOMPLETE` |
| 2 | Record has a `valid` flag that is not exactly `True` | `DENY` / `APPROVAL_INVALIDATED` |
| 3 | Command ID or packet version differs from the packet in hand | `DENY` / `APPROVAL_VERSION_MISMATCH` |
| 4 | `decision` is not `APPROVED` | `DENY` / `APPROVAL_NOT_APPROVED` |
| 5 | `method` not in `SIGNED_PDF`, `NOTION`, `CHAT` | `DENY` / `APPROVAL_METHOD_INVALID` |
| 6 | All pass (identity half, `approval_version_check`) | continue to content binding |

**Content binding (mandatory).** There is no version-only path: a call without both hashes is denied. Pass `packet_sha256` (hash of the packet text in hand, from `packet_sha256(text)`) and `validated_sha256` (hash recorded when validation passed on that text). The record then needs its own `packet_sha256`, and all three must be identical. Any missing or malformed hash is a denial. Denials after step 5 above:

| Condition | Result |
|---|---|
| Either caller hash missing or not 64 hex characters | `DENY` / `APPROVAL_CONTENT_UNVERIFIABLE` |
| Record has no valid `packet_sha256` | `DENY` / `APPROVAL_CONTENT_UNBOUND` |
| Packet in hand differs from the validated text | `DENY` / `PACKET_CHANGED_AFTER_VALIDATION` |
| Record hash differs from the packet in hand | `DENY` / `APPROVAL_CONTENT_MISMATCH` |
| All equal | `ALLOW` / `APPROVAL_VALID_CONTENT_BOUND` |

Line endings (CRLF/LF) are normalized before hashing; any other difference changes the hash. `approval_version_check` (steps 1 to 5) exists for auditing historical records; it never authorizes anything. `ApprovalRecord.packet_sha256` is optional in the schema, so old records still validate, but the engine denies them (`APPROVAL_CONTENT_UNBOUND`).

Any uncertainty is a denial (fail closed, G5 §44). The check does not verify who the approver is: confirming the approver is the owner is an operator duty.

## 4. Chat approval (G5 §31)

Accepted explicit phrases: **`Approved`**, **`Proceed`**, **`Proceed to G6`**, **`Approved for G6`**.

- The scope of the approval is derived from the actual message and the packet it answers. "Approved" after a gate approves that exact gate. It does not mean "deploy everything".
- Anything else is **not** an approval. "Looks good", "OK", "Sounds right", a thumbs-up or silence leave the command at `READY_FOR_APPROVAL`. Record nothing as `APPROVED`; ask for an explicit decision (FIX-009).
- The engine does not classify chat text. The operator applies this list by hand and records the result as an approval record (KD-5, open).

## 5. Non-transitive approval (G5 §32)

An approval of `GIC-001 / packet-v1` does **not** approve `GIC-001 / packet-v2`, and does not approve `GIC-002`. When a packet changes materially:

1. Issue it as a new Packet Version (`v1 → v2`).
2. Mark the old approval non-transferable. It keeps its history and is not deleted.
3. Obtain a fresh approval bound to the new version (FIX-008, rollback drill criterion P3).

## 6. Recording an approval

1. Confirm the packet being approved is the one that was validated, and that it is the only pending packet for the Command ID.
2. Write the Decision Log entry with Command ID, Packet Version, Approved, Approver, Date and Approval Method. Put the pointer in `evidence_reference`.
3. Run `approval_check` against the exact Command ID and Packet Version.
4. Append an `OWNER_APPROVAL` audit event (or `OWNER_REVISION` / `OWNER_REJECTION`) with `status_before = READY_FOR_APPROVAL`. Revision and rejection decisions are recorded the same way; `REVISE` returns the command to `NEEDS_REVISION`, `REJECT` ends it at `REJECTED`.
5. Apply `next_state(READY_FOR_APPROVAL, approve)`. Stop. Do not trigger any downstream step.

The `OWNER_*` events feed the pilot metrics: owner review time is the gap between `READY_FOR_APPROVAL` and the first of them.

## 7. Manual duties during the pilot (not enforced by code)

| Duty | Why it is manual |
|---|---|
| Only one pending packet per Command ID | `require_unique_pending_packet` is in the policy but not enforced in code (KD-5) |
| The packet shown to the owner is byte-for-byte the packet that passed validation. **Pass both hashes to `approval_check`** | Enforced by the engine and passed by `drill.py` and the fixtures, but no live approval workflow supplies the hashes yet (G8 blocker stays open). The rollback drill approved a packet that differed from the validated one and nothing detected it |
| Re-run the validation checks on the exact approved text before recording | No validation at approval time (G8 blocker) |
| Verify the approver is the owner | `approval_check` does not authenticate |

These are accepted for the internal pilot only. They are hard blockers for any external, client or production use (`G8-release-authorization.md`).

## 8. Revoking an approval

Set `valid` to `False` on the approval record and log a `ROLLBACK` / `VERSION_SUPERSEDED` event as described in `rollback-sop.md`. An invalidated approval is denied (`APPROVAL_INVALIDATED`) for every version. Never delete the record.
