# Changelog — GPT Innovation Operator Command Center (pilot)

Material implementation changes, newest first. Format follows Keep a Changelog. Versions of individual artifacts are in `docs/version-history.md`.

Entries before 2026-11-18 were reconstructed from git history and the G6/G7/G8 reports; commit hashes are given where known.

## [Unreleased] — 2026-11-18 — Gap closure (owner Option A)

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
