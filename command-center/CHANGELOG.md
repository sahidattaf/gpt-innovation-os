# Changelog — GPT Innovation Operator Command Center (pilot)

Material implementation changes, newest first. Format follows Keep a Changelog. Versions of individual artifacts are in `docs/version-history.md`.

Entries before 2026-11-18 were reconstructed from git history and the G6/G7/G8 reports; commit hashes are given where known.

## [Unreleased] — 2026-11-18 — Security fixes

### Changed
- **Secret guard fails closed in the Node harnesses.** New `scripts/g7-eval/guard.mjs` (`secretFree`) is used by `run_llm.mjs` and `rollback-drill/pipeline.mjs`. Only an explicit exit 0 from `guard_cli.py` is "clean". A launch error, null status, crash or any other exit code blocks the model call; exit 3 (secret found) blocks at once. Previously any status other than 3 passed, so a Python that failed to launch let every input through.
- **Actor schema.** `AuditEvent.actor` enum is now `OWNER`, `AI_OPERATOR`, `SYSTEM`, `OPERATOR`; existing records are unaffected.
- **Content binding is mandatory.** `approval_check` always requires `packet_sha256` and `validated_sha256` and a hash in the record; the opt-in `require_content_binding` argument is removed. The identity checks are now `approval_version_check` (used by `approval_bypass.py` to audit older records, never an authorizer). `drill.py` records the packet hash in each approval and checks through `approval_gate`; `det_fixtures.py` passes hashes and FIX-008 asserts four new denials. `det-results.json` regenerated.
- Tests: `test_fail_closed_and_schema.py` (16 new), policy and binding tests updated. 110 before, 126 after.

### Known limits
- No live approval workflow supplies the hashes yet, so the G8 blocker "approval not bound to packet content" stays open.
- The historical drill evidence (`state.json`, ledgers, `R0x-approval-*.json`) was not regenerated: its approval records carry no hash and would now be denied if re-checked. Replaying the drill's injected-defect step would also now be denied at approval time, which is the intended behaviour.
- No live model call was made; pricing is untested against real usage.

## 2026-11-18 — Wiring and caveat fixes

### Added
- **Cost instrumentation wired into the harnesses.** `scripts/g7-eval/cost.mjs` and `cost_cli.py` let the Node runners record each model call (success and failure) through the production `AIRunRecorder`. `run_llm.mjs` and `rollback-drill/pipeline.mjs` now write `ai_runs` and `cost_summary` (USD, and XCG when `XCG_PER_USD` is set) next to their existing output; a run that dies part-way reports its partial cost on stderr. `drill.py` (`r02`) records through the recorder instead of building unpriced `AIRun`s by hand.
- `resolve_xcg_per_usd` in `cost_instrumentation.py`: environment first, then `.env.local` / `.env`; reads only that key; an invalid value raises.
- **Approval bound to packet content.** `policy_engine.packet_sha256()` and `approval_check(..., packet_sha256=, validated_sha256=, require_content_binding=)`. New rules: `APPROVAL_CONTENT_UNVERIFIABLE`, `APPROVAL_CONTENT_UNBOUND`, `PACKET_CHANGED_AFTER_VALIDATION`, `APPROVAL_CONTENT_MISMATCH`, `APPROVAL_VALID_CONTENT_BOUND`. `ApprovalRecord` gains optional `packet_sha256`.
- **Approval-bypass counter** (G5 §34): `src/approval_bypass.py` (`count_approval_bypasses`). `pilot_metrics` adds `approval_bypasses` per command and `approval_bypass_count` in `baseline_summary`.
- Tests: `test_approval_content_binding.py` (12), `test_approval_bypass.py` (22), `test_cost_wiring.py` (11).

### Changed
- `docs/acceptance-matrix.md`, `docs/architecture.md`, `docs/approval-sop.md`, `docs/version-history.md` updated for the above.

### Known limits
- Content binding is **opt-in**: `approval_check` without hashes is still version-only, and `drill.py` / `det_fixtures.py` call it that way. The engine does not run the VAL checks; it only proves the approved bytes are the validated bytes.
- No live model run was made for this change, so committed result files and drill ledgers still hold unpriced runs until the harnesses are re-run.
- The bypass counter audits the events and approvals it is given; nothing feeds it automatically.
- Test count: 65 before, 110 after.

## 2026-11-18 — Gap closure (owner Option A)

The existing G6/G7 build is the certified baseline. This change closes documentation and instrumentation gaps only. It does not alter any policy, schema, prompt or existing module, and it does not touch Notion.

### Added
- `src/cost_instrumentation.py`: `ai_run` cost instrumentation per G5 §38. `AIRunRecorder` (`record`, `track`), `estimate_cost_usd`, `usd_to_xcg`, `summarize_runs`. XCG uses an injected rate only (`xcg_per_usd` or `XCG_PER_USD`); unknown values are `None`, never `0`; status is `SUCCESS`/`FAIL`.
- `src/pilot_metrics.py`: Deliverable, Processing Time, Owner Review Time, Rework and Follow-up Questions as a `pilot_metrics` JSON object and an optional Notion page-body section (G5 §35–37). No Notion property is added; the owner has not approved any.
- `evals/test_cost_instrumentation.py` (18 tests), `evals/test_pilot_metrics.py` (16 tests).
- `docs/architecture.md`, `docs/approval-sop.md`, `docs/version-history.md`, `docs/acceptance-matrix.md`, this `CHANGELOG.md` (G5 §63).
- `XCG_PER_USD` placeholder in `.env.example`.

### Changed
- `README.md`: documentation index and instrumentation notes.

### Known limits
- `REFERENCE_RATE_CARD_USD` is a reference default. G5 Dependency E (the owner-confirmed model-cost source) is still open.
- The recorder is not yet called from `scripts/g7-eval/` or `evals/rollback-drill/`, which still read token usage directly. Costs in existing drill records remain unpriced.
- `AuditLedger.append_ai_run` still accepts any status string; only `AIRunRecorder` enforces `SUCCESS`/`FAIL`.
- Test count: 31 before this change, 65 after (`py -3 -m unittest discover -s evals -p "test_*.py"` from `command-center/`).

## 2026-11-08 — G7 evaluation, security fixes, rollback drill, G8

- `bb6b664` G7 evaluation certified, 12/12 fixtures passed (#37). Owner gate `S3-G7-CERTIFICATION` approved.
- `ec548fb` Security fixes and the evaluation harness (`scripts/g7-eval/`): KD-3 fail-closed action allowlist; KD-4 `secrets_guard.py` and the ledger redaction layer; prompts bumped to `intake-normalizer-v1.1`, `evidence-analyst-v1.1`, `approval-packet-v1.1`.
- `40a9616` G7 run; FIX-001 expectation amended to `NEEDS_CLARIFICATION` (owner Option A).
- `6787e4c` Fixed P-1 / KD-7: blocked-entity matching bypass (for example `KaiKorsou`, `Kai-Korsou`, `SeaHorizon`).
- `360f097` `approval_check` rejects invalidated approvals (`APPROVAL_INVALIDATED`).
- `c3af13f` Live rollback cycle: 10/10 criteria on a synthetic command, with manual steps (`evals/rollback-drill/`).
- `674fbd5` Recorded G7 owner certification.
- G8: conditional release for the internal pilot only, with eight hard blockers for external, client or production use (`G8-release-authorization.md`).

Open by owner decision: KD-1 (packet template hardcodes `READY_FOR_APPROVAL`), KD-5 (no chat-approval classifier; "one pending packet" not enforced).

## 2026-09-03 — G6 controlled build, G7 instrumentation groundwork

- Specification `S3-G5-v1.0` added (`5db0520`).
- Deterministic policy engine (`0272a16`), synthetic fixtures (`883c0d1`), policy tests (`6a67501`, `3054ec3`).
- Prompt contracts: reasoning operator (`f07146d`), evidence brief (`5b85e2b`), approval packet (`1f933c4`), plus intake normalizer and evidence analyst.
- Operating SOP (`f4d2fa1`), rollback SOP (`1bb1ca0`), G6 build report (`c02f67f`).
- Notion schema extension applied under S3-G6A: fields added to Active Projects, Decision Log and Output Queue. No database or page created, deleted or renamed.
- In-memory audit ledger and AI-run contract (`79d6a7e`, `868a7f4`, `c3e87f9`).

Stopped before G7 as specified.
