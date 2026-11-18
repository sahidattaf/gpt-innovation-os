# Command Center Pilot — Version History

Controlled versions of the specification, policy, schemas, prompts and code. Material change means a new version (G5 §61); history is never rewritten. For the narrative of changes see `../CHANGELOG.md`.

## 1. Specification

| Artifact | Version | Date | Note |
|---|---|---|---|
| `specifications/G5-implementation-specification.md` | `S3-G5-v1.0` | 2026-09-03 | Ratified by owner gate S3-G5. Unchanged since. |

## 2. Policy and schema

| Artifact | Version | Notes |
|---|---|---|
| `policies/control-policy.yaml` | `1.0` | The file's `version` field has stayed `1.0`. The G7 fixes changed the *engine* behaviour that the file documents (action allowlist, secret handling); see §4. |
| `schemas/contracts.schema.json` | `1.0` (`OwnerCommand.schema_version` is the constant `"1.0"`) | `OwnerCommand`, `EvidenceItem`, `ApprovalRecord`, `AuditEvent`, `AIRun`. `AIRun.status` is the enum `SUCCESS`/`FAIL`. |

G5 §60 proposed separate `scope-policy`, `source-policy`, `approval-policy` and per-object schema files. The build uses one policy file and one schema file. This is a deliberate simplification, not a missed deliverable.

## 3. Prompt contracts

| Prompt | Current | Previous | Change |
|---|---|---|---|
| Intake Normalizer | `intake-normalizer-v1.1` | v1.0 | G7 / KD-4: secret handling (defence in depth) |
| Evidence Analyst | `evidence-analyst-v1.1` | v1.0 | G7 / KD-4: secret handling (defence in depth) |
| Operator Reasoning | `operator-reasoning-v1` | — | Unchanged |
| Evidence Brief | `evidence-brief-v1` | — | Unchanged |
| Approval Packet | `approval-packet-v1.1` | v1.0 | G7 / KD-2, KD-6: options never labelled "Approved"; no unsourced numeric estimates |

Superseded v1.0 files for the three bumped prompts live in the earlier `s3t-001/prompts/` copy and in git history. The G6 build report is historical and still uses the v1 names.

The model for all G7 runs was `claude-sonnet-4-6` at temperature 0.

## 4. Code

| Module | Introduced | Material changes |
|---|---|---|
| `src/policy_engine.py` | G6 (2026-09-03) | G7 KD-3: fail-closed action allowlist (9 actions) with prohibited-pattern matching. G7 KD-7 / P-1: blocked-entity matching normalized for accents, case, spacing and punctuation. G7 Step 7: `approval_check` rejects an invalidated approval (`APPROVAL_INVALIDATED`). Wiring fixes (2026-11-18): content binding in `approval_check` (`packet_sha256`, `validated_sha256`) and `packet_sha256()`. Security fixes (2026-11-18): content binding mandatory (hashes required, `require_content_binding` removed), identity half split out as `approval_version_check`. |
| `src/audit_runtime.py` | G7 setup (2026-09-03) | G7 KD-4: every write passes a redaction layer; `secret_fields` labels; a mistyped label fails closed. |
| `src/secrets_guard.py` | G7 (2026-11-08) | New: pattern-based detection, `redact_text`, `redact_value`, `guard_model_input`. |
| `src/cost_instrumentation.py` | Gap closure (2026-11-18) | New: G5 §38 `ai_run` recorder, USD/XCG estimation, run summaries. |
| `src/pilot_metrics.py` | Gap closure (2026-11-18) | New: Deliverable, processing time, owner review time, rework, follow-up questions as a payload/page-body convention. Wiring fixes: `approval_bypasses` per command and in `baseline_summary`. |
| `src/approval_bypass.py` | Wiring fixes (2026-11-18) | New: G5 §34 approval-bypass counter. |
| `src/cost_instrumentation.py` (update) | Wiring fixes (2026-11-18) | Added `resolve_xcg_per_usd` (environment, then `.env.local` / `.env`). |

Evaluation harness: `../scripts/g7-eval/` (G7), `evals/rollback-drill/` (G7 Step 7). Wiring fixes (2026-11-18) added `scripts/g7-eval/cost.mjs` and `cost_cli.py`, and changed `run_llm.mjs`, `rollback-drill/pipeline.mjs` and `rollback-drill/drill.py` to record cost through the production recorder. Schema `contracts.schema.json` stays `1.0`; `ApprovalRecord` gained the optional `packet_sha256`, and `AuditEvent.actor` gained `OPERATOR`. Security fixes added `scripts/g7-eval/guard.mjs` (fail-closed secret guard shared by `run_llm.mjs` and `pipeline.mjs`).

## 5. Approval packet and evidence brief identifiers

G5 §61 naming, used by the prompts and the drill:

```
Approval Packet: <COMMAND_ID>-AP-v<N>      e.g. GIC-20260903-001-AP-v1
Evidence Brief:  <COMMAND_ID>-EB-v<N>      e.g. GIC-20260903-001-EB-v1
```

A material change is `v1 → v2` and needs fresh approval (`approval-sop.md` §5). A formatting-only fix that does not alter decision substance may use a minor version, but that rule has not been formalized (G5 §61 defers it), so treat every change as material until the owner decides.

## 6. Pilot releases

| Release | State |
|---|---|
| G6 controlled build | Built 2026-09-03 (PR #20); stopped before G7 |
| G7 certification | 12/12 fixtures; owner gate `S3-G7-CERTIFICATION` approved 2026-11-08 |
| G8 | Conditional release for the **internal pilot only**, decided 2026-11-08; eight hard blockers for any external, client or production use |
| Gap closure | 2026-11-18, owner Option A: documentation, cost instrumentation, in-code KPI fields, acceptance matrix. No new Notion properties. |

The G5 §64 step 9 label "Command Center Pilot v0.1" has not been applied as a tag or a version string anywhere in the repository.

## 7. Changing a controlled artifact

1. Bump the version (file name for prompts; field for policy and schema).
2. Keep the old file or point to the commit that holds it.
3. Add a line here and an entry in `../CHANGELOG.md`.
4. Re-run the fixtures and unit tests (`../../scripts/g7-eval/README.md`).
5. Material change to a packet-level artifact needs a fresh owner approval.
