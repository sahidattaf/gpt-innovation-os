import importlib.util
import pathlib
import sys
import unittest
from decimal import Decimal

ROOT = pathlib.Path(__file__).resolve().parents[1]


def _load(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "src" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    sys.modules[name] = module  # @dataclass (Python 3.13) looks the module up in sys.modules
    spec.loader.exec_module(module)
    return module


audit_runtime = _load("audit_runtime")
ci = _load("cost_instrumentation")
AuditLedger = audit_runtime.AuditLedger

CMD = "GIC-20260903-001"
FAKE_TOKEN = "sk-FAKE-0000000000000000"  # obviously fake, test-only
RATES = {"test-model": ci.ModelRate(Decimal("3"), Decimal("15"))}


def _recorder(ledger=None, **kw):
    ledger = ledger if ledger is not None else AuditLedger()
    ids = iter(f"RUN-{i:03d}" for i in range(1, 100))
    kw.setdefault("rate_card", RATES)
    return ledger, ci.AIRunRecorder(ledger, run_id_factory=lambda: next(ids), **kw)


class CostMathTests(unittest.TestCase):
    def test_usd_estimate_uses_per_million_rates(self):
        # 1,000 in * $3/M + 500 out * $15/M = 0.003 + 0.0075
        self.assertEqual(ci.estimate_cost_usd("test-model", 1000, 500, RATES), 0.0105)

    def test_unknown_model_or_usage_is_none_not_zero(self):
        self.assertIsNone(ci.estimate_cost_usd("nope", 10, 10, RATES))
        self.assertIsNone(ci.estimate_cost_usd("test-model", None, 10, RATES))
        self.assertIsNone(ci.estimate_cost_usd("test-model", 10, None, RATES))

    def test_negative_tokens_rejected(self):
        with self.assertRaises(ValueError):
            ci.estimate_cost_usd("test-model", -1, 0, RATES)

    def test_reference_rate_card_covers_default_model(self):
        self.assertIsNotNone(ci.estimate_cost_usd("claude-sonnet-4-6", 1_000_000, 0))

    def test_xcg_requires_injected_rate(self):
        self.assertIsNone(ci.usd_to_xcg(1.0, None))
        self.assertIsNone(ci.usd_to_xcg(None, 2))
        self.assertEqual(ci.usd_to_xcg(0.5, "1.80"), 0.9)
        with self.assertRaises(ValueError):
            ci.usd_to_xcg(1.0, 0)

    def test_no_exchange_rate_hard_coded_in_source(self):
        text = (ROOT / "src" / "cost_instrumentation.py").read_text(encoding="utf-8")
        self.assertNotIn("1.79", text)
        self.assertNotIn("1.80", text)
        self.assertEqual(ci.estimate_cost_usd("test-model", 0, 0, RATES), 0.0)

    def test_env_rate(self):
        self.assertIsNone(ci.xcg_per_usd_from_env({}))
        self.assertIsNone(ci.xcg_per_usd_from_env({"XCG_PER_USD": " "}))
        self.assertEqual(ci.xcg_per_usd_from_env({"XCG_PER_USD": "1.5"}), Decimal("1.5"))

    def test_usage_tokens(self):
        self.assertEqual(ci.usage_tokens({"input_tokens": 5, "output_tokens": 7}), (5, 7))
        self.assertEqual(ci.usage_tokens(None), (None, None))
        with self.assertRaises(ValueError):
            ci.usage_tokens({"input_tokens": "5", "output_tokens": 7})


class RecorderTests(unittest.TestCase):
    def test_record_populates_all_g5_38_fields(self):
        ledger, rec = _recorder(xcg_per_usd="2")
        run = rec.record(command_id=CMD, stage="ANALYSIS", model="test-model", status="SUCCESS",
                         input_tokens=1000, output_tokens=500, duration_ms=250)
        self.assertEqual((run.run_id, run.total_tokens, run.duration_ms), ("RUN-001", 1500, 250))
        self.assertEqual((run.estimated_cost_usd, run.estimated_cost_xcg), (0.0105, 0.021))
        self.assertEqual(len(ledger.ai_runs()), 1)

    def test_invalid_status_rejected_and_nothing_written(self):
        ledger, rec = _recorder()
        with self.assertRaises(ValueError):
            rec.record(command_id=CMD, stage="S", model="test-model", status="BLOCKED")
        self.assertEqual(ledger.ai_runs(), ())

    def test_no_usage_means_null_cost_not_zero(self):
        _, rec = _recorder(xcg_per_usd="2")
        run = rec.record(command_id=CMD, stage="S", model="test-model", status="FAIL")
        self.assertIsNone(run.estimated_cost_usd)
        self.assertIsNone(run.estimated_cost_xcg)
        self.assertIsNone(run.total_tokens)

    def test_track_success_records_usage_and_duration(self):
        ticks = iter([10.0, 10.25])
        ledger, rec = _recorder(clock=lambda: next(ticks))
        with rec.track(command_id=CMD, stage="ANALYSIS", model="test-model") as run:
            run.set_usage_from({"input_tokens": 100, "output_tokens": 50})
        stored = ledger.ai_runs()[0]
        self.assertEqual((stored.status, stored.duration_ms, stored.total_tokens), ("SUCCESS", 250, 150))

    def test_track_failure_records_fail_and_reraises(self):
        ledger, rec = _recorder()
        with self.assertRaises(RuntimeError):
            with rec.track(command_id=CMD, stage="ANALYSIS", model="test-model"):
                raise RuntimeError("model unavailable")
        self.assertEqual([r.status for r in ledger.ai_runs()], ["FAIL"])

    def test_track_failure_keeps_partial_usage(self):
        ledger, rec = _recorder()
        with self.assertRaises(RuntimeError):
            with rec.track(command_id=CMD, stage="S", model="test-model") as run:
                run.set_usage(10, 0)
                raise RuntimeError("cut off")
        self.assertEqual(ledger.ai_runs()[0].input_tokens, 10)

    def test_secret_in_stage_is_redacted_by_ledger(self):
        ledger, rec = _recorder()
        rec.record(command_id=CMD, stage=f"token={FAKE_TOKEN}", model="test-model", status="SUCCESS")
        self.assertNotIn(FAKE_TOKEN, str(ledger.snapshot()))

    def test_ledger_failure_propagates_fail_closed(self):
        class Broken(AuditLedger):
            def append_ai_run(self, run):
                raise OSError("audit store down")

        _, rec = _recorder(Broken())
        with self.assertRaises(OSError):
            rec.record(command_id=CMD, stage="S", model="test-model", status="SUCCESS")


class SummaryTests(unittest.TestCase):
    def test_summary_totals_and_unpriced_runs(self):
        ledger, rec = _recorder(xcg_per_usd="2")
        rec.record(command_id=CMD, stage="A", model="test-model", status="SUCCESS", input_tokens=1000, output_tokens=500, duration_ms=100)
        rec.record(command_id=CMD, stage="B", model="test-model", status="FAIL", duration_ms=40)
        rec.record(command_id="GIC-20260903-002", stage="A", model="test-model", status="SUCCESS", input_tokens=1, output_tokens=1)
        s = ci.summarize_runs(ledger.ai_runs(), CMD)
        self.assertEqual((s["ai_runs"], s["failed_runs"], s["unpriced_runs"]), (2, 1, 1))
        self.assertEqual((s["total_tokens"], s["duration_ms"]), (1500, 140))
        self.assertEqual((s["estimated_cost_usd"], s["estimated_cost_xcg"]), (0.0105, 0.021))

    def test_empty_summary_has_null_totals(self):
        s = ci.summarize_runs([], CMD)
        self.assertEqual(s["ai_runs"], 0)
        self.assertIsNone(s["estimated_cost_usd"])


if __name__ == "__main__":
    unittest.main()
