import sys
import unittest
from pathlib import Path

SRC = Path(__file__).resolve().parents[1] / "src"
sys.path.insert(0, str(SRC))

from policy_engine import approval_check, evidence_completeness, next_state, scope_check, source_check


class PolicyEngineTests(unittest.TestCase):
    def test_clean_scope(self):
        self.assertEqual(scope_check("GPT Innovation Command Center").result, "ALLOW")

    def test_bossa_blocked(self):
        self.assertEqual(scope_check("GPT Innovation and BOSSA").result, "BLOCK")

    def test_sea_horizon_denied(self):
        self.assertEqual(source_check("Sea Horizon").result, "DENY")

    def test_unknown_source_owner_review(self):
        self.assertEqual(source_check("Random External CRM").result, "OWNER_REVIEW")

    def test_external_send_blocked(self):
        self.assertEqual(scope_check("GPT Innovation", requested_action="external_send").result, "BLOCK")

    # --- G7 / KD-3: fail-closed action control --------------------------------------
    def test_external_send_variants_blocked(self):
        for action in ("send_email", "smtp_dispatch", "SendEmail", "email-send", "sendMail",
                       "external_send", "publish_post", "webhook_post", "Deploy To Prod"):
            with self.subTest(action=action):
                result = scope_check("GPT Innovation", requested_action=action)
                self.assertEqual(result.result, "BLOCK")
                self.assertEqual(result.rule_id, "ACTION_PROHIBITED")

    def test_unknown_action_blocked_fail_closed(self):
        result = scope_check("GPT Innovation", requested_action="frobnicate_widgets")
        self.assertEqual(result.result, "BLOCK")
        self.assertEqual(result.rule_id, "ACTION_NOT_PERMITTED")

    def test_permitted_actions_and_no_action_allowed(self):
        for action in ("analyze", "draft", "generate_packet", "record_approval"):
            with self.subTest(action=action):
                self.assertEqual(scope_check("GPT Innovation", requested_action=action).result, "ALLOW")
        self.assertEqual(scope_check("GPT Innovation").result, "ALLOW")

    # --- G7 / KD-4: secret handling --------------------------------------------------
    FAKE_TOKEN = "sk-FAKE-0000000000000000"  # obviously fake, test-only

    def test_secret_in_scope_or_source_is_blocked_without_echo(self):
        scope = scope_check(f"Use API token {self.FAKE_TOKEN}")
        source = source_check(f"API token {self.FAKE_TOKEN}")
        self.assertEqual((scope.result, scope.rule_id), ("BLOCK", "SECRET_DETECTED"))
        self.assertEqual((source.result, source.rule_id), ("DENY", "SECRET_DETECTED"))
        self.assertNotIn(self.FAKE_TOKEN, scope.rationale + source.rationale)
        self.assertIn("Security handling required", source.rationale)

    def test_secret_never_enters_model_context(self):
        from secrets_guard import SecretInModelInputError, guard_model_input
        self.assertEqual(guard_model_input("Create internal operating recommendation"), "Create internal operating recommendation")
        for text in (f"key {self.FAKE_TOKEN}", "password: hunter2", "Authorization: Bearer abcdefghijklmnopqrstuvwx"):
            with self.subTest(text=text), self.assertRaises(SecretInModelInputError):
                guard_model_input(text)

    def test_version_mismatch_denied(self):
        record = {
            "command_id": "GIC-20260903-001",
            "packet_version": "v1",
            "decision": "APPROVED",
            "approver": "Coach Sahid Attaf",
            "timestamp": "2026-09-03T14:00:00-04:00",
            "method": "CHAT",
            "evidence_reference": "chat:approval",
        }
        self.assertEqual(approval_check(record, "GIC-20260903-001", "v2").result, "DENY")

    def test_version_bound_approval(self):
        record = {
            "command_id": "GIC-20260903-001",
            "packet_version": "v1",
            "decision": "APPROVED",
            "approver": "Coach Sahid Attaf",
            "timestamp": "2026-09-03T14:00:00-04:00",
            "method": "NOTION",
            "evidence_reference": "notion:decision-log",
        }
        self.assertEqual(approval_check(record, "GIC-20260903-001", "v1").result, "ALLOW")

    def test_evidence_completeness(self):
        self.assertEqual(evidence_completeness(20, 19), 95.0)

    def test_approved_is_terminal_in_defined_transitions(self):
        self.assertEqual(next_state("READY_FOR_APPROVAL", "approve"), "APPROVED")
        with self.assertRaises(ValueError):
            next_state("APPROVED", "execute")


if __name__ == "__main__":
    unittest.main()
