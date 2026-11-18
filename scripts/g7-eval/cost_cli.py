"""CLI wrapper so the Node harness records model calls through the SAME recorder as production code.

stdin  : {"run_id_prefix": "G7", "runs": [{"command_id", "stage", "model", "status", "input_tokens",
          "output_tokens", "duration_ms"}, ...]}
stdout : {"ai_runs": [...stored AIRun records...], "summary": {...summarize_runs...},
          "xcg_rate_configured": bool}

Every run is validated and redacted by AIRunRecorder / AuditLedger. XCG_PER_USD is read from the environment,
else from .env.local / .env at the repo root (only that key is read; the rate is never printed).
Exit 0 = recorded; exit 2 = invalid input (nothing is written to stdout as a result).
"""
import json
import sys
from dataclasses import asdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "command-center" / "src"))
from audit_runtime import AuditLedger  # noqa: E402
from cost_instrumentation import AIRunRecorder, resolve_xcg_per_usd, summarize_runs  # noqa: E402


def main() -> int:
    payload = json.loads(sys.stdin.read())
    prefix = payload.get("run_id_prefix", "RUN")
    counter = iter(range(1, 10**6))
    ledger = AuditLedger()
    rate = resolve_xcg_per_usd(env_files=[ROOT / ".env.local", ROOT / ".env"])
    recorder = AIRunRecorder(ledger, xcg_per_usd=rate, run_id_factory=lambda: f"{prefix}-{next(counter):03d}")
    for run in payload["runs"]:
        recorder.record(
            command_id=run["command_id"], stage=run["stage"], model=run["model"], status=run["status"],
            input_tokens=run.get("input_tokens"), output_tokens=run.get("output_tokens"),
            duration_ms=run.get("duration_ms"),
        )
    runs = ledger.ai_runs()
    json.dump({"ai_runs": [asdict(r) for r in runs], "summary": summarize_runs(runs), "xcg_rate_configured": rate is not None},
              sys.stdout, indent=2, ensure_ascii=False)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, KeyError, json.JSONDecodeError) as exc:
        print(f"cost_cli: invalid input: {exc}", file=sys.stderr)
        sys.exit(2)
