# Command Center Pilot — Architecture

Status: **Controlled internal pilot** (G6 build, G7 certified 2026-11-08, G8 conditional release for the internal pilot only).
Basis: G5 specification `S3-G5-v1.0` §2, §4–5, §43–44, §70; code under `command-center/src/`.

This document describes what is **built**. Where the G5 specification calls for something that is not built, it says so (§7).

## 1. Purpose and boundary

```
Owner Command → Evidence Brief → Approval Packet → Owner Decision → STOP
```

`APPROVED` is terminal. There is no action layer: nothing sends, publishes, deploys, delivers to a client, writes to production or proceeds autonomously. Approving a packet records a decision and nothing else.

Blocked entities and data: BOSSA, Kai Kòrsou, Sea Horizon, confidential client data, credentials and secrets.

## 2. Systems of record (G5 §2)

| Rank | System | Role in the pilot |
|---|---|---|
| 1 | GPT Innovation Command Center (Notion) | Owner Command record, scope/source controls, output metadata, decisions |
| 2 | Software 3.0 Transformation OS — Command Center (Notion) | Secondary reference |
| 3 | Relevant chat history | Tertiary; also an approval channel |

Existing Notion mappings (no database or page was created; the schema extension was applied under S3-G6A, see `g6-build-report.md`):

| Notion structure | Holds |
|---|---|
| Active Projects | Owner Command: Command ID, Objective, Scope, Excluded Scope, Permitted Sources |
| Output Queue | Evidence Brief / Approval Packet metadata: Command ID, Packet Version, Evidence Completeness |
| Decision Log | Version-bound approval: Command ID, Packet Version, Approved, Approver, Approval Method |

**No Notion client exists in this repository.** The Notion writes described in the SOPs are performed by the operator; the code only decides, validates and records.

Four logical fields have **no Notion property** and the owner has not approved adding any: Deliverable, Processing Time, Rework, Follow-up Questions. Until the owner decides, they are carried as a `pilot_metrics` JSON object and an optional page-body section (§5).

## 3. Components

| Component | File | Responsibility | Software generation |
|---|---|---|---|
| Control policy | `policies/control-policy.yaml` (v1.0) | Declarative statement of blocked entities, data classes, actions, sources, terminal state, fail-closed | 1.0 |
| Policy engine | `src/policy_engine.py` | `scope_check`, `source_check`, `action_check`, `secret_check`, `approval_check` (version- and content-bound; hashes mandatory), `approval_version_check`, `packet_sha256`, `evidence_completeness`, `next_state` | 1.0 |
| Secrets guard | `src/secrets_guard.py` | Pattern-based detection and redaction; `guard_model_input` stops a secret before any prompt is built | 1.0 |
| Audit ledger | `src/audit_runtime.py` | Append-only, in-memory `AuditEvent` and `AIRun` records; every write is redacted first | 1.0 |
| Cost instrumentation | `src/cost_instrumentation.py` | Builds `ai_run` records (G5 §38): tokens, duration, status, estimated USD/XCG; run summaries | 1.0 |
| Approval-bypass counter | `src/approval_bypass.py` | `count_approval_bypasses` (G5 §34): gated transitions without valid owner approval, from audit events and approval records | 1.0 |
| Pilot metrics | `src/pilot_metrics.py` | Deliverable, processing time, owner review time, rework, follow-up questions; payload and page-body conventions | 1.0 |
| Contracts | `schemas/contracts.schema.json` (v1.0) | `OwnerCommand`, `EvidenceItem`, `ApprovalRecord`, `AuditEvent`, `AIRun` | 1.0 |
| Prompt contracts | `prompts/*.md` | Intake normalizer, evidence analyst, operator reasoning, evidence brief, approval packet | 3.0 |
| Evaluation | `evals/`, `../scripts/g7-eval/` | Fixtures FIX-001–012, unit tests, rollback drill records | — |

G5 §70 allocation holds: IDs, validation, scope, permissions, the status machine, approval binding, KPI arithmetic and cost arithmetic are deterministic code. Intent normalization, evidence extraction, synthesis, recommendation and the draft packet are model work. The final decision is human. External action is disabled.

## 4. Control flow and status machine

Policies run **before** any model call. A blocked command never reaches the model.

```
RECEIVED ──scope_allow──► SOURCE_CHECK ──sources_allow──► CONTEXT_READY ──analyze──► ANALYSIS
   │                           │                                                         │
   └─scope_block─► BLOCKED_SCOPE   └─source_unknown─► NEEDS_SOURCE_APPROVAL         validate
                                                                                         ▼
                              READY_FOR_APPROVAL ◄──pass── VALIDATION ──fail──► NEEDS_REVISION
                               │      │      │
                          approve  revise  reject
                               ▼      ▼      ▼
                          APPROVED  NEEDS_REVISION  REJECTED
```

This is the complete transition table in `next_state`. Any other `(state, event)` pair raises `ValueError`. In particular `APPROVED + execute` is refused, which is how "STOP" is enforced.

Known limits of the machine (G8 backlog): no exit from `NEEDS_REVISION`, no `FROZEN_ROLLBACK`/`INVALID`/`SUPERSEDED` states, and `NEEDS_CLARIFICATION` and `ERROR` exist in the schema enum but have no transitions.

## 5. Cost and KPI instrumentation

**Cost (`cost_instrumentation.py`, G5 §38).** `AIRunRecorder.track(...)` wraps a model call, measures duration, takes token counts from the API `usage` object, estimates USD from a per-model rate card, and appends an `AIRun` to the ledger. An exception inside the call records a `FAIL` run and re-raises. Rules:

- Status is `SUCCESS` or `FAIL` only.
- Unknown is `None`, never `0`. `summarize_runs` reports `unpriced_runs` so a partial total is not presented as complete.
- XCG uses an injected rate (`xcg_per_usd` argument or the `XCG_PER_USD` environment variable). No exchange rate is stored in code or prompts (G5 §38). Without a rate, XCG cost is `None`.
- **Harness capture:** `scripts/g7-eval/run_llm.mjs` and `command-center/evals/rollback-drill/pipeline.mjs` log every call and record it through `scripts/g7-eval/cost_cli.py`, which uses the same recorder; `drill.py` records through it as well. The XCG rate comes from `XCG_PER_USD` (environment, then `.env.local` / `.env`).
- The bundled rate card (`REFERENCE_RATE_CARD_USD`) is a reference default for `claude-sonnet-4-6`. G5 Dependency E (the owner-confirmed cost source) is still open; supply your own `rate_card` once it is decided. Prompt-cache tokens are not priced separately, so estimates are approximate.

**Missing Notion fields (`pilot_metrics.py`, G5 §35–37, §59).** The module derives the values from audit events and returns one `pilot_metrics` object per command:

| Field | Definition |
|---|---|
| `deliverable` | The owner's text, or the literal `NOT_PROVIDED`. Never inferred. |
| `processing_time` | `READY_FOR_APPROVAL` timestamp − `RECEIVED` timestamp |
| `owner_review_time` | First owner decision − `READY_FOR_APPROVAL`, kept apart so human waiting time is not charged to the AI |
| `rework` | Entries into `NEEDS_REVISION`, split into `owner_requested` (from `READY_FOR_APPROVAL`) and `system_detected` |
| `follow_up_questions` | Owner clarification requests before the first `READY_FOR_APPROVAL`, counted by reason (`MISSING_FIELD`, `AMBIGUOUS_SCOPE`, `SOURCE_PERMISSION`, `CONFLICT`, `VOICE_UNCERTAINTY`, `OTHER`) |
| `ai_cost` | `summarize_runs` output for the command |

Two carriers, both optional, neither needs a new Notion property:

1. **JSON payload:** `attach_to_payload(payload, metrics)` adds the `pilot_metrics` key.
2. **Page body:** `upsert_page_body_section(body, metrics)` writes or replaces one block delimited by `<!-- command-center:pilot_metrics:start v1 -->` … `<!-- command-center:pilot_metrics:end -->`. Content outside the markers is untouched, and `parse_page_body_section` reads it back.

Everything passes through the secrets redaction layer before it is returned or rendered.

## 6. Trust and failure model

- **Fail closed (G5 §44).** If authorization cannot be established, the result is `DENY`/`BLOCK`. Unknown sources are `OWNER_REVIEW`; unknown actions are `ACTION_NOT_PERMITTED`; an unlabelled-secret typo raises rather than leaks.
- **Harness secret guard fails closed.** `scripts/g7-eval/guard.mjs` returns "clean" only on an explicit exit 0 from `guard_cli.py`; a launch failure, crash or unexpected exit code blocks the model call.
- **Secrets never enter model context or the ledger.** `guard_model_input` raises before a prompt is built; `AuditLedger` redacts every string field and fully redacts fields named in `secret_fields`. Detection is pattern-based (KD-4 limits, accepted by the owner).
- **Approval is non-transitive.** `approval_check` binds an approval to the exact Command ID and Packet Version. See `approval-sop.md`.
- **Append-only history.** The ledger has no update or delete method. Rollback never deletes history (`rollback-sop.md`).

## 7. What is not built

| Gap | Reference |
|---|---|
| Audit ledger is in memory only; it does not survive the process | G8 blocker G4 |
| No monitoring or alerting for the running pilot | G8 blocker |
| No rollback states/transitions or version supersede/restore code (done by hand in the drill) | G8 blockers G1, G3, G7 |
| VAL-01–VAL-08 are not implemented as tested code | G8 blocker G5 |
| No chat-approval phrase classifier; "one pending packet" not enforced in code | KD-5 (G8 blocker) |
| Content binding is mandatory in `approval_check` and passed by the drill and fixtures, but no live approval workflow supplies the hashes and the engine does not run VAL checks | G8 blocker G8 (engine enforces; workflow open) |
| Harness costs are captured but no live run has been made since wiring | `acceptance-matrix.md` §3 |
| Approval-packet template hardcodes `Status: READY_FOR_APPROVAL` | KD-1 (accepted) |
| Schema `priority` enum is `P0/P1/P2`; G5 §12 specifies `LOW/NORMAL/HIGH/URGENT` | Rollback review item 7 |

External, client or production use needs a separate explicit owner gate and the G8 hard blockers resolved.
