# G8 — Release Authorization (DRAFT)
**Project:** Software 3.0 Transformer (S3T) — S3T-001
**Gate:** G8 (Release decision)
**Status:** DRAFT — prepared for the owner's decision; nothing here is authorized yet
**Drafted:** 2026-11-08
**Branch:** `feat/g3-baseline` (evidence is not yet merged to `main`)

## 1. Decision requested

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
| **Owner approval** | **Pending** | This document's gate line is `PENDING`. No version-bound G8 owner gate exists yet. |
| **Operating plan** | **Partial** | A pilot operating SOP and rollback SOPs exist (`command-center/docs/operating-sop.md`, `command-center/docs/rollback-sop.md`, `s3t-001/docs/`). There is no release-specific plan covering who runs the pilot, how often, with what support, or an exit/stop criterion. |
| **Monitoring** | **Not evidenced** | Nothing in the repository monitors the pilot in operation. The audit ledger records events and AI-run cost and latency in memory only (G4 below); there is no alerting or review cadence. The KPI ledger is an evaluation baseline, not monitoring. |

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

## 5. Options for the owner

| Option | What it means |
|---|---|
| **A. Authorize the controlled internal pilot as it stands** | Accept the backlog above, including the missing monitoring and the in-memory ledger. The operating plan and monitoring items in §3 stay open |
| **B. Authorize with conditions** | Release, but require named items first (for example a persisted audit ledger and a monitoring and review plan), with owners and dates recorded in the gate |
| **C. Withhold** | Stay at G7 until an operating plan and monitoring are in place, then re-present |

The evidence supports the controlled internal pilot. It does not yet cover monitoring or a persistent audit log, two things the gate model and the rollback design both lean on. The operator suggests the owner decide those two before authorizing; the choice is the owner's.

OWNER GATE S3-G8-RELEASE: PENDING
