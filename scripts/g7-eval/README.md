# G7 evaluation harness

Reproduces the G7 fixture evaluation (FIX-001 → FIX-012) reported in `G7-full-verification-report.md`.

## Run

From the repo root (needs Python 3.10+ and Node 20+; no npm install required):

```bash
# 1. Unit tests for the policy engine, secrets guard and audit ledger (no network)
python -m unittest discover -s command-center/evals -p "test_*.py" -v

# 2. Deterministic fixtures: 001 (policy part), 002, 003, 004, 008, 009, 010, 011, 012 (no network)
python scripts/g7-eval/det_fixtures.py

# 3. LLM fixtures: 001, 005, 006, 007, 008 + FIX-012 guard/backstop probes (calls the Anthropic API)
#    Needs ANTHROPIC_API_KEY (and optionally CLAUDE_MODEL) in .env.local
node scripts/g7-eval/run_llm.mjs

# 4. Machine-checkable assertions over the LLM outputs
node scripts/g7-eval/check_results.mjs
```

Results are written to `command-center/evals/results/` (`det-results.json`, `llm-results.json`).

## Files

| File | Purpose |
|---|---|
| `det_fixtures.py` | Calls the real `policy_engine`, `secrets_guard` and `audit_runtime`; records pass/fail per assertion. Exit 1 on any failure. |
| `run_llm.mjs` | Sends fixtures through the v1.1 prompt contracts. Every model call passes the secrets guard first, except the explicit FIX-012 bypass probe. |
| `guard_cli.py` | Lets the Node runner use the same `secrets_guard` as production code. |
| `check_results.mjs` | Packet structure, version binding, no pre-filled decision, no "Approved" option labels, no unsourced estimates, FIX-005/007/012 checks. |

## Notes

- Inputs are synthetic. The only "secret" is the obviously fake `sk-FAKE-0000000000000000`.
- LLM outputs vary between runs even at temperature 0. The mechanical checks cover structure; hallucination and conflict-handling verdicts are judged by a human reading the outputs (see the report's rubric).
- The API key is read from `.env.local` and is never written to the results files.
