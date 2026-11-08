import importlib.util
import pathlib
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("audit_runtime", ROOT / "src" / "audit_runtime.py")
audit_runtime = importlib.util.module_from_spec(spec)
assert spec.loader is not None
# Register before exec: @dataclass (Python 3.13) looks the module up in sys.modules.
sys.modules["audit_runtime"] = audit_runtime
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

    # --- G7 / KD-4: redaction layer -------------------------------------------------
    FAKE_TOKEN = "sk-FAKE-0000000000000000"  # obviously fake, test-only

    def _event(self, **overrides):
        base = dict(
            event_id="EVT-S1", command_id="GIC-20260903-001", timestamp="2026-11-08T00:00:00Z",
            actor="SYSTEM", event_type="SOURCE_CHECK", object_type="source", object_id="src-1", result="DENY",
        )
        base.update(overrides)
        return AuditEvent(**base)

    def test_pattern_secret_is_redacted_before_write(self):
        ledger = AuditLedger()
        ledger.append_event(self._event(object_id=f"API token {self.FAKE_TOKEN}"))
        self.assertNotIn(self.FAKE_TOKEN, str(ledger.snapshot()))
        self.assertIn("[REDACTED]", ledger.events()[0].object_id)

    def test_labelled_secret_field_is_fully_redacted(self):
        ledger = AuditLedger()
        ledger.append_event(self._event(status_after="plain-looking-value-xyz", secret_fields=("status_after",)))
        self.assertEqual(ledger.events()[0].status_after, "[REDACTED]")
        self.assertNotIn("plain-looking-value-xyz", str(ledger.snapshot()))

    def test_unlabelled_none_stays_none_and_clean_event_unchanged(self):
        ledger = AuditLedger()
        event = self._event()
        ledger.append_event(event)
        self.assertEqual(ledger.events()[0], event)
        self.assertIsNone(ledger.events()[0].status_before)

    def test_unknown_secret_field_label_fails_closed(self):
        with self.assertRaises(ValueError):
            AuditLedger().append_event(self._event(secret_fields=("no_such_field",)))

    def test_ai_run_secret_is_redacted(self):
        ledger = AuditLedger()
        ledger.append_ai_run(AIRun(
            run_id="RUN-S1", command_id="GIC-20260903-001", stage=f"token={self.FAKE_TOKEN}",
            model="synthetic-eval", status="BLOCKED",
        ))
        self.assertNotIn(self.FAKE_TOKEN, str(ledger.snapshot()))


if __name__ == "__main__":
    unittest.main()
