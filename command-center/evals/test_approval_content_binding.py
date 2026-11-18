import importlib.util
import pathlib
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


def _load(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "src" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


p = _load("policy_engine")
CMD, VER = "GIC-20260903-001", "v1"
CLEAN = "# Approval Packet\n\nRecommendation: Option A\n"
TAMPERED = "# Approval Packet\n\nRecommendation: Option A\n\nE-4 (VERIFIED_SOURCE): unsourced claim\n"
H_CLEAN, H_TAMPERED = p.packet_sha256(CLEAN), p.packet_sha256(TAMPERED)


def record(**kw):
    base = dict(command_id=CMD, packet_version=VER, decision="APPROVED", approver="Coach Sahid Attaf",
                timestamp="2026-09-03T10:00:00Z", method="CHAT", evidence_reference="chat:owner-reply:'Approved'",
                valid=True, packet_sha256=H_CLEAN)
    base.update(kw)
    return base


def check(rec, packet=H_CLEAN, validated=H_CLEAN, **kw):
    return p.approval_check(rec, CMD, VER, packet_sha256=packet, validated_sha256=validated, **kw)


class HashTests(unittest.TestCase):
    def test_hash_is_hex_sha256_and_deterministic(self):
        self.assertRegex(H_CLEAN, r"^[0-9a-f]{64}$")
        self.assertEqual(H_CLEAN, p.packet_sha256(CLEAN))

    def test_line_endings_do_not_change_the_hash(self):
        self.assertEqual(p.packet_sha256(CLEAN), p.packet_sha256(CLEAN.replace("\n", "\r\n")))

    def test_any_other_change_changes_the_hash(self):
        self.assertNotEqual(H_CLEAN, H_TAMPERED)
        self.assertNotEqual(H_CLEAN, p.packet_sha256(CLEAN + " "))


class ContentBindingTests(unittest.TestCase):
    def test_matching_hashes_allow(self):
        r = check(record())
        self.assertEqual((r.result, r.rule_id), ("ALLOW", "APPROVAL_VALID_CONTENT_BOUND"))

    def test_drill_scenario_packet_edited_after_validation_is_denied(self):
        # Validation passed on CLEAN; the owner approved TAMPERED. Nothing may carry it through.
        r = check(record(packet_sha256=H_TAMPERED), packet=H_TAMPERED, validated=H_CLEAN)
        self.assertEqual((r.result, r.rule_id), ("DENY", "PACKET_CHANGED_AFTER_VALIDATION"))

    def test_approval_given_for_different_content_is_denied(self):
        r = check(record(packet_sha256=H_TAMPERED))  # packet in hand == validated == CLEAN
        self.assertEqual((r.result, r.rule_id), ("DENY", "APPROVAL_CONTENT_MISMATCH"))

    def test_record_without_a_hash_is_denied_when_binding_is_on(self):
        legacy = record()
        del legacy["packet_sha256"]
        self.assertEqual(check(legacy).rule_id, "APPROVAL_CONTENT_UNBOUND")
        self.assertEqual(check(record(packet_sha256="")).rule_id, "APPROVAL_CONTENT_UNBOUND")
        self.assertEqual(check(record(packet_sha256="ABC")).rule_id, "APPROVAL_CONTENT_UNBOUND")

    def test_missing_or_malformed_caller_hashes_fail_closed(self):
        self.assertEqual(p.approval_check(record(), CMD, VER, packet_sha256=H_CLEAN).rule_id, "APPROVAL_CONTENT_UNVERIFIABLE")
        self.assertEqual(p.approval_check(record(), CMD, VER, validated_sha256=H_CLEAN).rule_id, "APPROVAL_CONTENT_UNVERIFIABLE")
        self.assertEqual(check(record(), packet="not-a-hash").rule_id, "APPROVAL_CONTENT_UNVERIFIABLE")
        self.assertEqual(check(record(), validated=None).rule_id, "APPROVAL_CONTENT_UNVERIFIABLE")

    def test_version_only_call_is_denied(self):
        # Mandatory binding: a perfect record with no caller hashes at all cannot be approved.
        r = p.approval_check(record(), CMD, VER)
        self.assertEqual((r.result, r.rule_id), ("DENY", "APPROVAL_CONTENT_UNVERIFIABLE"))

    def test_removed_opt_in_flag_is_rejected(self):
        with self.assertRaises(TypeError):
            p.approval_check(record(), CMD, VER, packet_sha256=H_CLEAN, validated_sha256=H_CLEAN, require_content_binding=False)

    def test_earlier_denials_still_win_over_content_checks(self):
        self.assertEqual(check(record(valid=False)).rule_id, "APPROVAL_INVALIDATED")
        self.assertEqual(check(record(packet_version="v2")).rule_id, "APPROVAL_VERSION_MISMATCH")
        self.assertEqual(check(record(decision="REVISE")).rule_id, "APPROVAL_NOT_APPROVED")
        self.assertEqual(check(record(method="FAX")).rule_id, "APPROVAL_METHOD_INVALID")
        self.assertEqual(check(record(approver="")).rule_id, "APPROVAL_INCOMPLETE")

    def test_identity_half_alone_never_authorizes_in_approval_check(self):
        legacy = record()
        del legacy["packet_sha256"]
        self.assertEqual(p.approval_version_check(legacy, CMD, VER).result, "ALLOW")  # identity only, used for auditing
        self.assertEqual(p.approval_check(legacy, CMD, VER).result, "DENY")  # authorizing function: denied
        self.assertEqual(check(legacy).result, "DENY")

    def test_schema_allows_the_new_optional_field(self):
        import json
        schema = json.loads((ROOT / "schemas" / "contracts.schema.json").read_text(encoding="utf-8"))["$defs"]["ApprovalRecord"]
        self.assertIn("packet_sha256", schema["properties"])
        self.assertNotIn("packet_sha256", schema["required"])


if __name__ == "__main__":
    unittest.main()
