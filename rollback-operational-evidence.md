# Rollback Operational Evidence — G7 Step 7 (Live Cycle Test Plan)
**Project:** Software 3.0 Transformer (S3T) — S3T-001
**Gate:** G7 — Step 7, Rollback live cycle
**Drafted:** 2026-11-08
**Status:** **PLANNED — NOT YET EXECUTED.** This document defines the test and the exact procedure. It contains no results. Every result field in §8 is blank until the test is run.
**Authorization to execute:** `OWNER GATE S3-ROLLBACK-LIVE-TEST: PENDING` — the test must not start until the owner grants it and answers the decisions in §3.

## 1. Purpose

Prove that a command can be stopped after a failure, reverted to its last valid version, validated, and re-approved, without losing any history and without any approval being carried across versions. The cycle under test is:

**trigger a command → simulate a failure → stop the process → revert to the previous version → validate the rollback → re-approve**

"Live" here means: the real model (`claude-sonnet-4-6`), the real v1.1 prompt contracts, the real policy engine, secrets guard and audit ledger, and the owner personally making each approval. It does **not** mean production data or external effects: the command is synthetic and nothing is sent, published, deployed or written to a production system.

## 2. Governing documents

| Document | Used for |
|---|---|
| `command-center/docs/rollback-sop.md` (G6) | Triggers, 8-step procedure, safety invariant |
| `s3t-001/docs/rollback-sop.md` (G5-ratified, §4–§11) | Detailed steps 4.1–4.8, version numbering (§5), audit event shape (§8), cost tracking (§9), post-rollback review (§10), "NEVER" list (§11) |
| `command-center/specifications/G5-implementation-specification.md` §41–44, §62 | Validation suite VAL-01 → VAL-08, critical failures, failure states, fail-closed rule, rollback procedure |

**Inconsistency to resolve:** the s3t-001 rollback SOP §4.5 lists VAL-01 → VAL-07 with different meanings from the G5 spec §41 (VAL-01 → VAL-08; for example VAL-05 is "source traceability" in the spec but "conflicts visible" in the SOP). This test uses the **spec §41 numbering**.

Safety invariants carried into the test (SOP §11, spec §42): never delete version history; never hide rollback events; never fabricate a prior version; never attach an approval from one version to another; never disable audit logging during rollback; APPROVED stays terminal (no execution).

## 3. Decisions needed from the owner before execution

| # | Decision | Recommendation |
|---|---|---|
| D1 | **Execution mode.** Run now in *operator-driven mode*, where steps the code cannot do yet are performed by the operator and recorded (marked MANUAL, §5), or first build the missing rollback support (§5, G1–G5) and run fully automated. | Operator-driven now. The test is partly about finding exactly these gaps, and building first would test code written to pass this test. |
| D2 | **Notion.** Write drill records to Notion (Active Projects, Decision Log, Output Queue) or keep all records as files in the repo. | Files only. Notion status values for `FROZEN_ROLLBACK` / `SUPERSEDED` are unverified, and Notion writes need their own authorization. |
| D3 | **Owner availability.** The owner personally gives three explicit approvals in chat (A1, A2, A3) in one session. | Required; the approvals cannot be simulated. |
| D4 | **Results.** Commit the results folder (`command-center/evals/results/rollback-live/`) to `feat/g3-baseline` after the run. | Yes. |

## 4. Rules of engagement

- **Synthetic only.** One synthetic command and three synthetic evidence items. No client data, no blocked entities (BOSSA, Kai Kòrsou, Sea Horizon), no secrets.
- **No external effects.** No sending, publishing, deployment, production writes or client delivery. No Notion writes unless D2 is changed.
- **No changes during the test.** Prompts, policy and code are frozen for the duration. Improvements found are logged in §8 as opportunities (SOP §10) and not implemented until the test ends.
- **One pending packet at a time.** The engine does not enforce `require_unique_pending_packet` (open defect KD-5), so the operator guarantees it manually.
- **Fail-closed.** If authorization or state is unclear, stop and ask the owner.
- **Abort criteria:** real client data or a secret appears; a blocked entity appears; any external action is attempted; an audit event is lost or overwritten; the owner calls a stop. On abort, preserve everything and record the reason.

## 5. Readiness gaps found while writing this procedure

These were checked against the current code on 2026-11-08. They are expected to appear during the run. Steps that depend on them are marked **MANUAL**; the run is still valid, and each gap becomes a defect or an accepted limitation.

| ID | Gap | Evidence | Handling in this test |
|---|---|---|---|
| G1 | No `FROZEN_ROLLBACK` status. It is absent from the `contracts.schema.json` status enum, and `next_state("APPROVED", …)` raises for every event, so a freeze or restore cannot be expressed in the state machine. | `next_state("APPROVED","freeze")` and `next_state("FROZEN_ROLLBACK","restore")` both raise `Disallowed transition` | MANUAL: record the freeze as a status record plus a ledger event |
| G2 | **An invalidated approval is still accepted.** The `ApprovalRecord` schema has a `valid` flag, but `approval_check` ignores it: a record with `valid: false` returned `ALLOW` / `APPROVAL_VALID`. | Smoke check, 2026-11-08 | Expected to FAIL step R-08's code check; compensate by recording the invalidation and by relying on the version-binding check (v2 approval vs v1/v3 returns `DENY`) |
| G3 | No code marks a version `SUPERSEDED` / `INVALID` or restores a version. | No such function in `policy_engine.py` or `audit_runtime.py` | MANUAL: JSON version records under the results folder |
| G4 | The audit ledger is in memory only. | `AuditLedger` has no persistence | Dump `ledger.snapshot()` to a file after every phase; evidence is lost if not dumped |
| G5 | The validation suite VAL-01 → VAL-08 exists as specification only. Partial support: scope/source checks, `evidence_completeness`, `approval_check`, the state machine and the secrets guard. | `policy_engine.py` | MANUAL checklist (§7, R-02), using the available functions where they apply |
| G6 | Rollback events are free-text in the ledger: `event_type` is not validated, so a mistyped event name is accepted. | `AuditEvent.event_type: str` | Use the spec's event names exactly: `OWNER_APPROVAL`, `VALIDATION_RUN`, `VERSION_SUPERSEDED`, `ROLLBACK`, `ERROR` |

## 6. Scenario

**Command:** `GIC-<YYYYMMDD of the run>-901` (matches the schema pattern `^GIC-[0-9]{8}-[0-9]{3}$`; `-901` marks a drill).

**Synthetic command text**

```
OBJECTIVE: Recommend whether the pilot weekly status summary should include a KPI section
DELIVERABLE: One-page internal recommendation
IN SCOPE: GPT Innovation Command Center
OUT OF SCOPE: BOSSA, clients
PERMITTED SOURCES: GPT Innovation Command Center
PRIORITY: NORMAL
```

(A DELIVERABLE is included on purpose: without it the intake step correctly returns `NEEDS_CLARIFICATION`, as FIX-001 showed.)

**Synthetic evidence register** (source `GPT Innovation Command Center`, references `rollback-drill/E-1` → `E-3`)
- E-1: "The weekly status summary currently has no KPI section."
- E-2: "Owner priority for Q4 is operational visibility."
- E-3: "A KPI ledger (`kpi-ledger.md`) exists in the repository."

**Timeline**

| Phase | What happens | Packet / status after |
|---|---|---|
| A. Trigger | Command submitted; deterministic scope and source gates run; v1 generated | v1 `READY_FOR_APPROVAL` |
| B. Establish versions | Owner approves v1 (A1). Owner requests a material revision; v2 generated with a defect (below); owner approves v2 (A2) | v1 `APPROVED` (valid); v2 `APPROVED` (active) |
| C. Failure and stop | Post-approval audit detects the defect in v2; command is frozen | `FROZEN_ROLLBACK` |
| D. Revert | v2 marked `INVALID`; v1 identified as last valid and restored | v1 active (`APPROVED`) |
| E. Validate | Deterministic and manual validations re-run on the restored state | validation PASS |
| F. Correct and re-approve | Corrected packet v3 generated (v2's number is not reused); owner re-approves (A3) | v3 `APPROVED` |

**Simulated failure.** During generation of v2 the operator inserts one unsupported claim into the packet: *"Weekly KPI sections reduced owner review time by 40%"*, classified `VERIFIED_SOURCE` with no source reference. This is a simulated material hallucination (SOP trigger "material hallucination"; SOP scenario A). The injection is recorded in the drill log as SIMULATED. The owner is briefed on the drill in advance but is not shown the defect when approving v2, to mimic a defect that slipped through.

## 7. Step-by-step procedure

Run from the repo root on `feat/g3-baseline`. Save every output under `command-center/evals/results/rollback-live/` (referred to below as `RES/`). **MANUAL** marks a step affected by a §5 gap. Helper definitions for the snippets are in Appendix A.

### Phase A — Trigger

| Step | Action | Expected result | Evidence saved |
|---|---|---|---|
| R-00 | Record baseline: `git rev-parse HEAD`, clean `git status`, `python -m unittest discover -s command-center/evals -p "test_*.py"` (expect 26 / 26), `python scripts/g7-eval/det_fixtures.py` (expect exit 0). Note start time `t0`. | Clean tree; all tests and fixtures pass | `RES/00-baseline.txt` |
| R-01 | Create the Command ID and the command record. Run `scope_check("GPT Innovation Command Center", "BOSSA, clients")` and `source_check("GPT Innovation Command Center")`. Append ledger events `SCOPE_CHECK` and `SOURCE_PERMISSION_CHECK`. | Both `ALLOW`; command status `RECEIVED` → `SOURCE_CHECK` → `CONTEXT_READY` (`next_state`) | `RES/01-command.json`, ledger dump |

### Phase B — Establish versions

| Step | Action | Expected result | Evidence saved |
|---|---|---|---|
| R-02 | Generate **v1** with the v1.1 prompts: intake normalizer → evidence analyst (classify E-1 → E-3) → operator reasoning → approval packet (`Packet Version: v1`). Run the guard on every model input (`guard_model_input`). Compute `sha256(v1 packet text)` = `H1`. Run the validation checklist VAL-01 → VAL-08 (spec §41) and record each PASS/FAIL; compute `evidence_completeness(material, classified)` and require ≥ 95. **MANUAL (G5)** for the checklist. Append `AI_REASONING_RUN`, `VALIDATION_RUN` events. | Intake not `NEEDS_CLARIFICATION`; packet has all 10 sections, decision not pre-filled; checklist all PASS; completeness ≥ 95 | `RES/02-v1-packet.md`, `RES/02-v1-validation.json`, `H1` |
| R-03 | **Owner approval A1.** Owner types `Approved` in chat for `Command ID` + `v1`. Operator writes the approval record (Appendix A `approval("v1")`), runs `approval_check(record, CMD, "v1")` and `next_state("READY_FOR_APPROVAL","approve")`. Append `OWNER_APPROVAL`. | `ALLOW`; status `APPROVED`; no execution of anything | `RES/03-approval-v1.json`, ledger dump |
| R-04 | Owner requests a material revision ("also recommend a weekly cadence"). Generate **v2** (`Packet Version: v2`) through the same pipeline. Before saving, insert the simulated defect (§6) and record it as SIMULATED. Compute `H2 = sha256(v2 packet text)`. Check that the v1 approval cannot transfer: `approval_check(v1 record, CMD, "v2")`. | v2 `READY_FOR_APPROVAL`; v1 approval vs v2 → `DENY` / `APPROVAL_VERSION_MISMATCH` | `RES/04-v2-packet.md`, `RES/04-drill-log.md`, `H2` |
| R-05 | **Owner approval A2** for `v2` (owner is not told where the defect is). Record, `approval_check(…, "v2")`, `next_state`, ledger `OWNER_APPROVAL`. Active version is now v2; v1 stays `APPROVED` and valid in history. | `ALLOW`; v2 `APPROVED` | `RES/05-approval-v2.json` |

### Phase C — Failure and stop

| Step | Action | Expected result | Evidence saved |
|---|---|---|---|
| R-06 | **Detect.** Run the post-approval audit on v2: VAL-05 (every `VERIFIED_SOURCE` claim has a source reference) and the classification check. Note detection time `t_detect`. Append `ERROR` (result `FAIL`, policy_rule `VAL-05`). | VAL-05 FAIL on the 40% claim; trigger identified as "material hallucination" | `RES/06-detection.md` |
| R-07 | **Stop / freeze.** Record status `FROZEN_ROLLBACK`, `rollback_initiated_at = t_freeze`, reason and actor; append `ROLLBACK` (result `IN_PROGRESS`, status_before `APPROVED`, status_after `FROZEN_ROLLBACK`). Confirm the stop: from `t_freeze` no model call, packet generation or approval record is made for this command except the rollback steps below; confirm `next_state("APPROVED","execute")` still raises. **MANUAL (G1).** | Freeze recorded; no activity on the command other than rollback; execution transition refused | `RES/07-freeze.json`, ledger dump, list of model calls after `t_freeze` (expect none) |

### Phase D — Revert

| Step | Action | Expected result | Evidence saved |
|---|---|---|---|
| R-08 | **Mark v2 invalid, keep it.** Record v2 as `INVALID` (reason: failed VAL-05; step needing correction: evidence classification). Mark the v2 approval record `valid: false`. Append `VERSION_SUPERSEDED`. Verify v2's packet file still exists and `sha256 == H2`. Check how the engine treats the invalidated approval: `approval_check(v2 record with valid=false, CMD, "v2")`. **MANUAL (G3); the last check is expected to return `ALLOW` (gap G2).** | v2 retained and unchanged; invalidation recorded; engine result for the invalid approval recorded as found | `RES/08-v2-invalid.json` |
| R-09 | **Locate the last valid version.** Walk the ledger backwards; find the last version marked `APPROVED` and valid that is not under dispute. Verify the v1 approval record is intact and `sha256(v1 packet) == H1`. If none existed, stop and follow SOP §7 (return to the owner; do not fabricate one). | v1 identified; hash equals `H1` | `RES/09-last-valid.json` |
| R-10 | **Restore v1** as the active reference: `restored_from_version = v1`, `restored_at`; v1 keeps its number. Do not delete anything. | v1 active, status `APPROVED`; ledger shows all earlier events plus the new ones | `RES/10-restore.json` |

### Phase E — Validate the rollback

| Step | Action | Expected result | Evidence saved |
|---|---|---|---|
| R-11 | Re-run on the restored state: `scope_check`, `source_check`; `approval_check(v1 record, CMD, "v1")`; `approval_check(v2 record, CMD, "v1")`; VAL-01 → VAL-08 checklist on v1; `evidence_completeness` ≥ 95; `sha256(v1) == H1`; `contains_secret` over every drill artifact; ledger event count never decreased and no event changed; re-run the unit tests and `det_fixtures.py`. Append `VALIDATION_RUN`. | `ALLOW`; v1 vs v1 `ALLOW`; v2 approval vs v1 `DENY`; all checklist items PASS; no secrets; ledger append-only; 26 / 26 tests and all fixtures pass | `RES/11-validation.json` |
| R-12 | **Material-change assessment** (SOP 4.6). v1's content is unchanged since A1, so its approval stands (status `APPROVED`). Record the decision and the reasoning. Record that the owner's wanted v2 change is not part of v1 and needs a corrected packet. | Assessment recorded; v1 approval retained | `RES/12-material-change.md` |

### Phase F — Correct and re-approve

| Step | Action | Expected result | Evidence saved |
|---|---|---|---|
| R-13 | Generate the corrected packet **v3** (not v2: superseded numbers are never reused, SOP §5): the legitimate revision (weekly cadence) with the unsupported claim removed or classified `AI_INFERENCE`. Run the full pipeline and the VAL-01 → VAL-08 checklist. Check `approval_check(v2 record, CMD, "v3")`. | v3 `READY_FOR_APPROVAL`, decision not pre-filled, no unsourced `VERIFIED_SOURCE` claim; v2 approval vs v3 → `DENY` | `RES/13-v3-packet.md`, `RES/13-v3-validation.json` |
| R-14 | **Owner re-approval A3** for `v3` (explicit `Approved`, single pending packet). Record, `approval_check(…, "v3")`, `next_state("READY_FOR_APPROVAL","approve")`. Append `OWNER_APPROVAL` (post-rollback) and the closing `ROLLBACK` event (result `SUCCESS`, status_before `FROZEN_ROLLBACK`, status_after `APPROVED`, notes: restored to v1, corrected as v3, validation PASS). Record `rollback_completed_at`. | v3 `APPROVED`; STOP — nothing executed | `RES/14-approval-v3.json`, final ledger dump |
| R-15 | **Close out.** Post-rollback review (SOP §10): what went wrong, why it was not caught earlier, proposed improvements — log only. Record cost (SOP §9): tokens used and wall-clock from `t_freeze` to restore and to re-approval. Dump the final ledger, run the secret scan over `RES/`, record `git rev-parse HEAD`. Commit `RES/` if D4 is yes. | Review and cost recorded; no secrets | `RES/15-review.md`, `RES/15-cost.json` |

## 8. Pass criteria and results

The test is **PASS** only if every criterion below is met. It is **PASS (manual steps)** if all criteria are met but only because MANUAL steps filled gaps G1–G6, with the gaps listed as defects. Any unmet criterion is **FAIL**. Gaps in §5 do not by themselves fail the test; an unmet criterion does.

| ID | Criterion | Steps | Result |
|---|---|---|---|
| P1 | The restored v1 is byte-identical to the approved v1 (`sha256 == H1`) | R-09, R-11 | NOT RUN |
| P2 | v2 is preserved, marked `INVALID`, and unchanged (`sha256 == H2`); nothing was deleted | R-08 | NOT RUN |
| P3 | No approval transfers between versions: v1 approval vs v2, v2 approval vs v1 and vs v3 all return `DENY` | R-04, R-11, R-13 | NOT RUN |
| P4 | APPROVED stays terminal throughout: `APPROVED` + `execute` is refused and no external action occurs | R-03, R-07, R-14 | NOT RUN |
| P5 | After the freeze, no activity on the command other than rollback steps | R-07 | NOT RUN |
| P6 | Rollback events (`ERROR`, `VERSION_SUPERSEDED`, `ROLLBACK` in progress and success) are in the ledger with reason, actor and timestamps; the ledger is append-only | R-06 → R-14 | NOT RUN |
| P7 | Validations pass on the restored state: VAL-01 → VAL-08, deterministic checks, completeness ≥ 95 | R-11 | NOT RUN |
| P8 | Version numbering follows SOP §5: v1 restored keeps its number; the correction is v3; v2's number is not reused | R-10, R-13 | NOT RUN |
| P9 | A fresh owner approval is recorded for v3, bound to the exact Command ID and version | R-14 | NOT RUN |
| P10 | No secrets or blocked entities in any artifact; unit tests and fixtures still pass after the run | R-11, R-15 | NOT RUN |

**Metrics to record (not pass/fail):** wall-clock from `t_detect` to `t_freeze`, from `t_freeze` to restore, and to re-approval; tokens per phase; number of MANUAL steps.

**Findings log (fill in during the run):** gaps confirmed, new defects, improvement opportunities. Per SOP §10, none is implemented until the test ends.

| Item | Description | Confirmed? |
|---|---|---|
| G1–G6 | Readiness gaps in §5 | _ |
| New findings | _ | _ |

## 9. Authorization to execute

**OWNER GATE S3-ROLLBACK-LIVE-TEST: PENDING**

Granted by: _______________  Date: _______________  Decisions D1–D4 recorded: ☐

## Appendix A — Helper definitions for the snippets

Smoke-checked against the current code on 2026-11-08 (the definitions run and the calls return the results shown in §5). This was not an execution of the test; no model calls were made and nothing was recorded.

```python
import sys, hashlib, json
from datetime import datetime, timezone
sys.path.insert(0, "command-center/src")
import policy_engine as p, audit_runtime as a, secrets_guard as sg

CMD = "GIC-YYYYMMDD-901"              # set the real date
now = lambda: datetime.now(timezone.utc).isoformat()
sha = lambda text: hashlib.sha256(text.encode("utf-8")).hexdigest()
L = a.AuditLedger(); _n = [0]

def ev(event_type, object_id, result, actor="SYSTEM", **kw):   # use the spec's event names exactly (G6)
    _n[0] += 1
    L.append_event(a.AuditEvent(f"EVT-{_n[0]:03}", CMD, now(), actor, event_type, "packet", object_id, result, **kw))

def approval(version, decision="APPROVED", valid=True):
    return {"command_id": CMD, "packet_version": version, "decision": decision,
            "approver": "Coach Sahid Attaf", "timestamp": now(), "method": "CHAT",
            "evidence_reference": "chat:rollback-drill", "valid": valid}

# after each phase:  json.dump(L.snapshot(), open("RES/ledger-<phase>.json", "w"), indent=2)   # ledger is in memory (G4)
# checks:            p.approval_check(approval("v1"), CMD, "v1").result      -> ALLOW
#                    p.approval_check(approval("v2"), CMD, "v1").result      -> DENY
#                    p.next_state("APPROVED", "execute")                      -> raises ValueError
#                    p.evidence_completeness(material_claims, classified)     -> percent
#                    sg.contains_secret(text)                                  -> False expected
```
