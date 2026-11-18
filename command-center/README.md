# GPT Innovation Operator Command Center — G6 Pilot

Status: **Controlled Internal Build**

Pilot flow: `Owner Command → Evidence Brief → Approval Packet → Owner Decision → STOP`

## Hard boundaries

- No autonomous downstream execution.
- No external sending, publishing, deployment, production action, or client delivery.
- Blocked domains/data: BOSSA, Kai Kòrsou, Sea Horizon, confidential client data, credentials, secrets.
- Human approval is required and is bound to an exact Command ID and Packet Version.
- Unknown sources default to `OWNER_REVIEW`, never `ALLOW`.

## Existing Notion mappings

- Active Projects: Owner Command record and scope/source controls.
- Output Queue: Evidence Brief / Approval Packet output metadata.
- Decision Log: version-bound owner approval record.

## Pilot KPIs

Measure the first five commands for time per request, rework rate, follow-up questions, approval bypass count, and evidence completeness.

## G6 stop boundary

An `APPROVED` decision is terminal for this pilot. It records owner approval but does not trigger any external or production action.

## Documentation

| File | Purpose |
|---|---|
| `docs/architecture.md` | Components, status machine, trust model, what is not built |
| `docs/operating-sop.md` | Owner Command → Approval Packet workflow |
| `docs/approval-sop.md` | How Signed PDF / Notion / chat approvals are recognized and recorded |
| `docs/rollback-sop.md` | Recovery procedure |
| `docs/version-history.md` | Controlled spec, policy, schema, prompt and code versions |
| `docs/acceptance-matrix.md` | G5 requirements mapped to G6/G7 results |
| `docs/g6-build-report.md` | Historical G6 build report |
| `CHANGELOG.md` | Material implementation changes |

## Cost and KPI instrumentation

- `src/cost_instrumentation.py` records each model call as a G5 §38 `ai_run` (tokens, duration, status, estimated USD/XCG). XCG needs an exchange rate supplied by the caller or `XCG_PER_USD`; none is hard-coded.
- `src/pilot_metrics.py` carries Deliverable, Processing Time, Rework and Follow-up Questions as a `pilot_metrics` JSON object or a Notion page-body section. No Notion property has been added; that needs the owner's explicit approval.

Run the tests from this directory: `py -3 -m unittest discover -s evals -p "test_*.py"`.
