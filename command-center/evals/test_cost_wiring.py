"""Checks that the harnesses really go through the production cost recorder (G5 §38)."""
import importlib.util
import json
import pathlib
import shutil
import subprocess
import sys
import tempfile
import unittest
from decimal import Decimal

ROOT = pathlib.Path(__file__).resolve().parents[1]
REPO = ROOT.parent
CLI = REPO / "scripts" / "g7-eval" / "cost_cli.py"


def _load(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "src" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


_load("audit_runtime")
ci = _load("cost_instrumentation")

RUN = {"command_id": "FIX-001", "stage": "INTAKE_NORMALIZER", "model": "claude-sonnet-4-6", "status": "SUCCESS",
       "input_tokens": 1000, "output_tokens": 500, "duration_ms": 1200}


def run_cli(payload, env_extra=None):
    import os
    env = {k: v for k, v in os.environ.items() if k != "XCG_PER_USD"}
    env.update(env_extra or {})
    return subprocess.run([sys.executable, "-I", str(CLI)], input=json.dumps(payload), capture_output=True, text=True, env=env)


class ResolveRateTests(unittest.TestCase):
    def test_environment_wins_over_files(self):
        with tempfile.TemporaryDirectory() as d:
            f = pathlib.Path(d) / ".env"
            f.write_text("XCG_PER_USD=9\n", encoding="utf-8")
            self.assertEqual(ci.resolve_xcg_per_usd({"XCG_PER_USD": "1.5"}, [f]), Decimal("1.5"))

    def test_reads_only_the_rate_key_from_a_dotenv_file(self):
        with tempfile.TemporaryDirectory() as d:
            f = pathlib.Path(d) / ".env.local"
            f.write_text("# XCG_PER_USD=7\nANTHROPIC_API_KEY=sk-FAKE-0000000000000000\nXCG_PER_USD='1.82'\n", encoding="utf-8")
            self.assertEqual(ci.resolve_xcg_per_usd({}, [f]), Decimal("1.82"))

    def test_unset_blank_or_missing_file_is_none(self):
        with tempfile.TemporaryDirectory() as d:
            f = pathlib.Path(d) / ".env"
            f.write_text("XCG_PER_USD=\n", encoding="utf-8")
            self.assertIsNone(ci.resolve_xcg_per_usd({}, [f, pathlib.Path(d) / "absent"]))

    def test_invalid_or_non_positive_rate_raises(self):
        for bad in ("abc", "0", "-2", "nan", "inf"):
            with self.assertRaises(ValueError, msg=bad):
                ci.resolve_xcg_per_usd({"XCG_PER_USD": bad})


class CostCliTests(unittest.TestCase):
    def test_records_prices_and_summarizes(self):
        r = run_cli({"run_id_prefix": "T", "runs": [RUN, {**RUN, "stage": "PACKET", "status": "FAIL", "input_tokens": None, "output_tokens": None}]},
                    {"XCG_PER_USD": "2"})
        self.assertEqual(r.returncode, 0, r.stderr)
        out = json.loads(r.stdout)
        first, second = out["ai_runs"]
        self.assertEqual((first["run_id"], first["total_tokens"], first["estimated_cost_usd"], first["estimated_cost_xcg"]), ("T-001", 1500, 0.0105, 0.021))
        self.assertEqual((second["status"], second["estimated_cost_usd"]), ("FAIL", None))
        self.assertEqual((out["summary"]["ai_runs"], out["summary"]["failed_runs"], out["summary"]["unpriced_runs"]), (2, 1, 1))
        self.assertTrue(out["xcg_rate_configured"])

    def test_no_rate_means_no_xcg_and_the_rate_is_not_printed(self):
        import os
        if os.environ.get("XCG_PER_USD"):
            self.skipTest("rate set globally")
        r = run_cli({"runs": [RUN]})
        out = json.loads(r.stdout)
        if not out["xcg_rate_configured"]:  # repo .env.local may legitimately hold the owner's rate
            self.assertIsNone(out["ai_runs"][0]["estimated_cost_xcg"])
        self.assertNotIn("XCG_PER_USD", r.stdout)

    def test_invalid_status_is_rejected_with_exit_2_and_no_result(self):
        r = run_cli({"runs": [{**RUN, "status": "BLOCKED"}]})
        self.assertEqual(r.returncode, 2)
        self.assertEqual(r.stdout, "")

    def test_secret_in_stage_is_redacted(self):
        fake = "sk-FAKE-0000000000000000"
        r = run_cli({"runs": [{**RUN, "stage": f"token={fake}"}]})
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertNotIn(fake, r.stdout)

    @unittest.skipUnless(shutil.which("node"), "node not installed")
    def test_node_bridge_round_trip(self):
        script = ("import { createRunLog } from %r;"
                  "const l = createRunLog({ model: 'claude-sonnet-4-6', runIdPrefix: 'N' });"
                  "l.add({ commandId: 'FIX-001', stage: 'S', status: 'SUCCESS', usage: { input_tokens: 1000, output_tokens: 500 }, durationMs: 5 });"
                  "l.add({ commandId: 'FIX-001', stage: 'S', status: 'FAIL' });"
                  "console.log(JSON.stringify(l.flush().summary));") % (REPO / "scripts" / "g7-eval" / "cost.mjs").as_uri()
        r = subprocess.run(["node", "--input-type=module", "-e", script], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        summary = json.loads(r.stdout)
        self.assertEqual((summary["ai_runs"], summary["failed_runs"], summary["estimated_cost_usd"]), (2, 1, 0.0105))


class HarnessWiringTests(unittest.TestCase):
    """Static guards so the wiring cannot silently regress to unpriced, hand-built runs."""

    def read(self, *parts):
        return REPO.joinpath(*parts).read_text(encoding="utf-8")

    def test_drill_uses_the_recorder_and_builds_no_ai_runs_by_hand(self):
        src = self.read("command-center", "evals", "rollback-drill", "drill.py")
        self.assertIn("ci.AIRunRecorder", src)
        self.assertIn("recorder.record(", src)
        r02 = src[src.index("def r02("):src.index("def revalidate(")]
        self.assertNotIn("AIRun(", r02)  # (load_ledger legitimately rebuilds saved runs)

    def test_node_harnesses_log_every_call_and_flush_through_the_recorder(self):
        for rel in (("scripts", "g7-eval", "run_llm.mjs"), ("command-center", "evals", "rollback-drill", "pipeline.mjs")):
            src = self.read(*rel)
            self.assertIn("createRunLog", src, rel)
            self.assertIn("runLog.flush()", src, rel)
            self.assertIn('log("FAIL")', src, rel)
            self.assertIn('log("SUCCESS", j.usage)', src, rel)


if __name__ == "__main__":
    unittest.main()
