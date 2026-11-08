# G8 — Release Authorization
**Project:** Software 3.0 Transformer (S3T) — S3T-001
**Gate:** G8 (Release decision)
**Status:** **APPROVED (CONDITIONAL) — INTERNAL PILOT ONLY**, decided by the owner on 2026-11-08. This is not approval for external, client or production use.
**Drafted:** 2026-11-08 · **Decided:** 2026-11-08 (Coach Sahid Attaf)
**Branch:** `feat/g3-baseline` (evidence is not yet merged to `main`)

## Decision

On 2026-11-08 the owner, Coach Sahid Attaf, chose **Option B — authorize with conditions** (stated as "Option 2"). This release is **APPROVED (CONDITIONAL) for the Internal Pilot only**: the G6 controlled internal pilot as defined in §1, run under the existing SOPs.

### HARD BLOCKERS for any external, client or production use

The owner has designated the following as **HARD BLOCKERS** for any external, client or production use. They must be resolved in the next cycle. Until they are, nothing beyond the internal pilot is authorized, and a separate explicit gate is still needed for any external or client use.

| Blocker | Item | What the evidence shows |
|---|---|---|
| Monitoring | No monitoring of the pilot in operation | Nothing in the repository monitors the pilot; no alerting or review cadence (§3) |
| **G4** | Audit ledger is in memory only | The audit trail does not survive the process (§4) |
| **G1** | No `FROZEN_ROLLBACK` state; a freeze cannot be expressed or enforced | Rollback freeze was a manual record in the drill |
| **G3** | No code to mark a version `INVALID`/`SUPERSEDED` or restore one | Invalidation and restore were manual records in the drill |
| **G5** | Validation suite VAL-01 to VAL-08 not implemented as tested code | The drill's checker needed five corrections; spec and SOP number the checks differently |
| **G7** | No transition out of `NEEDS_REVISION` | Confirmed three times in the drill; status changed by hand |

**What resolving each would look like (proposed by the operator, to be confirmed in next-cycle planning):** monitoring: a written monitoring and review plan plus a working mechanism, with evidence it runs; G4: a persisted audit ledger with a test that it survives a restart; G1, G3, G7: rollback states and transitions in the schema and state machine, a freeze that blocks activity on the command, version supersede and restore, and an exit from `NEEDS_REVISION`, then a repeat of the live rollback drill with no manual steps; G5: VAL-01 to VAL-08 as tested code with the numbering reconciled.

**Not yet set:** owners and target dates for these items were not stated in the decision and are not assumed here. They are to be assigned in next-cycle planning.

### Conditions that apply to the internal pilot
- The pilot stays inside the boundary in §1: `Owner Command → Evidence Brief → Approval Packet → Owner Decision → STOP`, with `APPROVED` terminal and no external sending, publishing, deployment, client delivery, production or autonomous action.
- Rollback during the pilot is the manual procedure documented and drilled in `rollback-operational-evidence.md`.
- The remaining backlog in §4 (KD-1, KD-5, G8 and the additional items) stays open and accepted for the pilot. The owner did not designate these as hard blockers.

## 1. Decision that was requested

Whether to release the **G6 controlled internal pilot** of the GPT Innovation Operator Command Center: `Owner Command → Evidence Brief → Approval Packet → Owner Decision → STOP`.

**What this decision does not cover.** Under the S3T gate model, documentation does not authorize runtime action, and external or client use needs a separate explicit gate. A G8 release of the pilot therefore does **not** authorize external sending, publishing, deployment, client delivery, production or autonomous action, or any use beyond the internal pilot. `APPROVED` stays terminal for the pilot.

**Gate model (S3T G0–G8):** G8 requires *owner approval, an operating plan and monitoring*; the stop condition is *release approval absent*. See §3 for how the evidence stands against these.

## 2. Completed evidence

| Area | Result | Where | Owner gate |
|---|---|---|---|
| **G3 Baseline** | Opportunities scored and ranked; pilot selected (Fixture-Based Evaluation Harness); pre-implementation KPI baselines captured (estimates). Status: READY FOR G4, G7 complete and passed | `G3-opportunity-baseline.md` | `S3-G3-PILOT: APPROVED`, `S3-G3-KPI-BASELINE: APPROVED` |
| **G7 Evaluation** | **12 / 12 PASS** (initial run 10 PASS, 1 PARTIAL, 1 FAIL; the two security findings were fixed and everything re-run). 31 unit tests pass. Hallucination incidents: 0 in the model-driven fixtures | `G7-full-verification-report.md` | `S3-G7-CERTIFICATION: APPROVED` (2026-11-08) |
| **Security Evidence** | Four required tests documented. **P-1 (KD-7) fixed**: blocked-entity names such as `Kai Kórsou`, `KaiKorsou`, `Kai-Korsou` and `SeaHorizon` were bypassing the scope check; matching is now normalized, with unit tests. **Approval check fixed**: `approval_check` now rejects approvals marked invalid (`APPROVAL_INVALIDATED`), documented in the rollback evidence (gap G2) rather than in this file | `security-permission-evidence.md`; approval-check fix in `rollback-operational-evidence.md` | `S3-SECURITY-EVIDENCE: APPROVED` |
| **Rollback Evidence** | **Live cycle PASS (manual steps):** 10 / 10 criteria met on a synthetic command. Defect detected by a check, command frozen, bad version kept but invalidated, last valid version restored byte-identical, corrected version re-approved, no approval carried across versions, ledger append-only. Gaps G1, G3, G5, G7 were filled by manual steps | `rollback-operational-evidence.md`; records in `command-center/evals/rollback-drill/` | `S3-ROLLBACK-LIVE-TEST: APPROVED` |
| KPI ledger | 12 fixtures recorded; processing times are placeholders | `kpi-ledger.md` | none |

Key commits on `feat/g3-baseline`: `40a9616` (G7 run), `ec548fb` (G7 security fixes and harness), `674fbd5` (G7 certification), `f0164d2` (Step 6 evidence), `6787e4c` (P-1 fix), `360f097` (`approval_check` fix), `c3af13f` and `4377a91` (rollback drill and formal gate). The evaluation harness is in `scripts/g7-eval/`.

Earlier gates G4 to G6 are recorded in the source pack (G5 ratified as `S3-G5-v1.0`; G6 controlled build, PR #20). They were not re-verified for this document.

## 3. G8 required evidence — current standing

| Required by the gate model | Standing | Notes |
|---|---|---|
| **Owner approval** | **Granted — conditional, internal pilot only** | Decided 2026-11-08; see the Decision section and the gate line at the bottom. |
| **Operating plan** | **Partial** | A pilot operating SOP and rollback SOPs exist (`command-center/docs/operating-sop.md`, `command-center/docs/rollback-sop.md`, `s3t-001/docs/`). There is no release-specific plan covering who runs the pilot, how often, with what support, or an exit/stop criterion. |
| **Monitoring** | **Not evidenced — designated a hard blocker for external, client or production use** | Nothing in the repository monitors the pilot in operation. The audit ledger records events and AI-run cost and latency in memory only (G4 below); there is no alerting or review cadence. The KPI ledger is an evaluation baseline, not monitoring. |

The S3T KPI dictionary also sets "Rollback readiness: tested rollback controls / required controls = 100% before G8". The drill tested the rollback procedure end to end, but several controls were performed manually (G1, G3, G7), so "100%" depends on whether manual operation counts as a tested control. That is an owner call.

## 4. Known Gaps / Post-Release Backlog

Owner-requested list. All were found and recorded during G7 to Step 7. None is fixed unless stated.

| ID | Gap | Status |
|---|---|---|
| **KD-1** | `approval-packet` hardcodes `Status: READY_FOR_APPROVAL`, so a packet for a command still at `NEEDS_CLARIFICATION` carries a contradictory label | Open; accepted by the owner at G7 |
| **KD-5** | No chat-approval phrase classifier, and "unique pending packet" is not enforced in code | Open; accepted by the owner at G7. In the drill the operator enforced both by hand |
| **G1** | No `FROZEN_ROLLBACK` state in the schema or state machine; `APPROVED` has no outgoing transitions, so a freeze or restore cannot be expressed or enforced. A frozen command is not actually blocked from further activity | Open; confirmed live in the drill (manual step) |
| **G3** | No code to mark a version `INVALID`/`SUPERSEDED` or to restore a prior version | Open; confirmed in the drill (manual step) |
| **G5** | The validation suite VAL-01 to VAL-08 exists only as specification plus ad-hoc code. The drill's checker needed five corrections mid-run, and the G5 spec and the s3t-001 rollback SOP number the checks differently | Open |
| **G7** | No state transition leads out of `NEEDS_REVISION` (a dead end in `next_state`) | Open; confirmed live three times in the drill |
| **G8** | **Content-hash binding:** approvals are not bound to the packet content that was validated. The drill's owner approved a packet that differed from the one validated, and nothing detected it; the approval record has no content hash and nothing re-validates at approval time | Open; new, found by the drill. Proposed fix: add `packet_sha256` to the approval record and `approval_check`, and re-validate at approval time |

**Additional open items, added by the operator (not in the requested list).** Included so the release decision is made on the complete picture.

| ID | Item | Why it matters for release |
|---|---|---|
| G4 | The audit ledger is in memory only; nothing persists it | The audit trail does not survive the process, and rollback and approval history depend on it |
| G6 | `AuditEvent.event_type` is not validated, and there is no dedicated `reason` field (the reason is stored in `policy_rule`) | Audit events can be mistyped; reasons are hard to query |
| KD-4 limits | Secret detection is pattern-based (accepted by the owner): free-text secrets are caught only if the field is labelled; only the policy engine, ledger and prompt-input guard are covered | Notion, the Output Queue and other storage paths were not tested |
| P-1 limits | The blocked-name normalization misses misspellings and look-alike characters from other scripts, and over-blocks benign text containing a blocked name | Not yet reviewed by the owner |
| F-1 / F-2 | Schema and prompt vocabularies disagree: `priority` is `P0/P1/P2` in the schema but `NORMAL` in the fixtures and prompts; the intake prompt returns status `READY`, which is not in the schema's status list; the model reports system facts it cannot know | Records may not validate against the schema in a real integration |
| F-7 | Owner approvals in the drill were recorded by the operator from chat; the Notion Decision Log and signed-record paths were not exercised | The version-bound approval path through Notion is untested |
| KPI | Pre-pilot baselines are estimates and processing times are placeholders; the "first five real commands" KPI measurement has not been done | There is no real baseline to judge the pilot against |
| Merge | The evidence and code live on `feat/g3-baseline`, not on `main`. The G6 files copied onto this branch will probably conflict with `s3-g6-command-center-pilot` | The release needs a merge plan and a decision about the branch |

## 5. Options that were put to the owner

| Option | What it means |
|---|---|
| **A. Authorize the controlled internal pilot as it stands** | Accept the backlog above, including the missing monitoring and the in-memory ledger. The operating plan and monitoring items in §3 stay open |
| **B. Authorize with conditions** | Release, but require named items first (for example a persisted audit ledger and a monitoring and review plan), with owners and dates recorded in the gate |
| **C. Withhold** | Stay at G7 until an operating plan and monitoring are in place, then re-present |

**Owner's choice: Option B**, with monitoring, G4, G1, G3, G5 and G7 designated hard blockers for any external, client or production use (see the Decision section).

OWNER GATE S3-G8-RELEASE: APPROVED (CONDITIONAL - INTERNAL PILOT ONLY)
