import unittest

from command_center.src.policy_engine import approval_check, evidence_completeness, next_state, scope_check, source_check


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
