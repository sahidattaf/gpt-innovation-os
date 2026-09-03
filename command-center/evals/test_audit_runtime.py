import importlib.util
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("audit_runtime", ROOT / "src" / "audit_runtime.py")
audit_runtime = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(audit_runtime)

AuditEvent = audit_runtime.AuditEvent
AIRun = audit_runtime.AIRun
AuditLedger = audit_runtime.AuditLedger


class AuditRuntimeTests(unittest.TestCase):
    def test_append_only_event_recording(self):
        ledger = AuditLedger()
        event = AuditEvent(
            event_id="EVT-001",
            command_id="GIC-20260903-001",
            timestamp="2026-09-03T18:00:00Z",
            actor="SYSTEM",
            event_type="SCOPE_CHECK",
            object_type="command",
            object_id="GIC-20260903-001",
            result="ALLOW",
            status_before="RECEIVED",
            status_after="SOURCE_CHECK",
            policy_rule="SCOPE_ALLOWED",
        )
        ledger.append_event(event)
        self.assertEqual(len(ledger.events()), 1)
        self.assertEqual(ledger.events()[0], event)

    def test_ai_run_cost_latency_capture(self):
        ledger = AuditLedger()
        run = AIRun(
            run_id="RUN-001",
            command_id="GIC-20260903-001",
            stage="ANALYSIS",
            model="synthetic-eval",
            status="SUCCESS",
            input_tokens=100,
            output_tokens=50,
            total_tokens=150,
            estimated_cost_usd=0.01,
            estimated_cost_xcg=0.018,
            duration_ms=120,
        )
        ledger.append_ai_run(run)
        stored = ledger.ai_runs()[0]
        self.assertEqual(stored.total_tokens, 150)
        self.assertEqual(stored.duration_ms, 120)

    def test_negative_metrics_rejected(self):
        ledger = AuditLedger()
        with self.assertRaises(ValueError):
            ledger.append_ai_run(AIRun(
                run_id="RUN-002",
                command_id="GIC-20260903-001",
                stage="ANALYSIS",
                model="synthetic-eval",
                status="FAIL",
                duration_ms=-1,
            ))


if __name__ == "__main__":
    unittest.main()
