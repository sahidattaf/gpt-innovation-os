import importlib.util
import json
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


audit_runtime = _load("audit_runtime")
policy_engine = _load("policy_engine")
ab = _load("approval_bypass")
pm = _load("pilot_metrics")
AuditEvent = audit_runtime.AuditEvent
CMD = "GIC-20260903-001"
H1, H2 = "a" * 64, "b" * 64


def ev(n, ts, etype, before=None, after=None, version=None, actor="SYSTEM", cmd=CMD):
    return AuditEvent(event_id=f"E-{n}", command_id=cmd, timestamp=ts, actor=actor, event_type=etype,
                      object_type="packet", object_id=f"{cmd}-AP-{version}", result="OK", version=version,
                      status_before=before, status_after=after)


def approval(version="v1", ts="2026-09-03T10:05:00Z", **kw):
    base = dict(command_id=CMD, packet_version=version, decision="APPROVED", approver="Coach Sahid Attaf",
                timestamp=ts, method="CHAT", evidence_reference="chat:'Approved'", valid=True)
    base.update(kw)
    return base


READY = ev(1, "2026-09-03T10:00:00Z", "VALIDATION_RUN", "VALIDATION", "READY_FOR_APPROVAL", "v1")
APPROVE = ev(2, "2026-09-03T10:06:00Z", "OWNER_APPROVAL", "READY_FOR_APPROVAL", "APPROVED", "v1", actor="OWNER")


def kinds(report):
    return [f.kind for f in report.findings]


class CounterTests(unittest.TestCase):
    def test_clean_path_is_zero(self):
        r = ab.count_approval_bypasses([READY, APPROVE], [approval()])
        self.assertEqual((r.approval_bypass_count, r.findings), (0, ()))

    def test_no_events_is_zero(self):
        self.assertEqual(ab.count_approval_bypasses([], []).approval_bypass_count, 0)

    def test_approved_without_any_record_is_a_bypass(self):
        r = ab.count_approval_bypasses([READY, APPROVE], [])
        self.assertEqual(kinds(r), ["UNAPPROVED_TRANSITION"])

    def test_approval_for_another_version_does_not_count(self):
        r = ab.count_approval_bypasses([READY, APPROVE], [approval(version="v2")])
        self.assertEqual(kinds(r), ["UNAPPROVED_TRANSITION"])

    def test_approval_for_another_command_does_not_count(self):
        r = ab.count_approval_bypasses([READY, APPROVE], [approval(command_id="GIC-20260903-002")])
        self.assertEqual(kinds(r), ["UNAPPROVED_TRANSITION"])

    def test_approval_dated_after_the_transition_does_not_count(self):
        r = ab.count_approval_bypasses([READY, APPROVE], [approval(ts="2026-09-03T11:00:00Z")])
        self.assertEqual(kinds(r), ["UNAPPROVED_TRANSITION"])

    def test_incomplete_or_wrong_decision_records_do_not_authorize(self):
        for bad in (approval(decision="REVISE"), approval(approver=""), approval(method="FAX")):
            self.assertEqual(ab.count_approval_bypasses([READY, APPROVE], [bad]).approval_bypass_count, 1)

    def test_ai_operator_cannot_record_an_approval(self):
        forged = ev(2, "2026-09-03T10:06:00Z", "OWNER_APPROVAL", "READY_FOR_APPROVAL", "APPROVED", "v1", actor="AI_OPERATOR")
        self.assertEqual(kinds(ab.count_approval_bypasses([READY, forged], [approval()])), ["FABRICATED_APPROVAL_EVENT"])

    def test_non_approval_event_cannot_enter_approved(self):
        sneaky = ev(2, "2026-09-03T10:06:00Z", "VALIDATION_RUN", "READY_FOR_APPROVAL", "APPROVED", "v1")
        self.assertEqual(kinds(ab.count_approval_bypasses([READY, sneaky], [approval()])), ["FABRICATED_APPROVAL_EVENT"])

    def test_invalidated_later_still_authorized_the_earlier_transition(self):
        events = [READY, APPROVE, ev(3, "2026-09-03T12:00:00Z", "VERSION_SUPERSEDED", "APPROVED", "INVALID", "v1")]
        self.assertEqual(ab.count_approval_bypasses(events, [approval(valid=False)]).approval_bypass_count, 0)

    def test_invalidated_before_the_transition_does_not_authorize(self):
        early = ev(0, "2026-09-03T09:00:00Z", "VERSION_SUPERSEDED", "APPROVED", "INVALID", "v1")
        self.assertEqual(ab.count_approval_bypasses([early, READY, APPROVE], [approval(valid=False)]).approval_bypass_count, 1)

    def test_leaving_approved_other_than_by_rollback_is_a_bypass(self):
        went_on = ev(3, "2026-09-03T10:30:00Z", "STATUS_UPDATE", "APPROVED", "IN_PRODUCTION", "v1")
        r = ab.count_approval_bypasses([READY, APPROVE, went_on], [approval()])
        self.assertEqual(kinds(r), ["POST_APPROVAL_PROGRESSION"])

    def test_rollback_exit_and_restore_are_not_bypasses(self):
        events = [READY, APPROVE,
                  ev(3, "2026-09-03T11:00:00Z", "ROLLBACK", "APPROVED", "FROZEN_ROLLBACK", "v1"),
                  ev(4, "2026-09-03T11:05:00Z", "ROLLBACK", "FROZEN_ROLLBACK", "APPROVED", "v1")]
        self.assertEqual(ab.count_approval_bypasses(events, [approval()]).approval_bypass_count, 0)

    def test_restore_of_a_version_without_approval_is_a_bypass(self):
        restore = ev(4, "2026-09-03T11:05:00Z", "ROLLBACK", "FROZEN_ROLLBACK", "APPROVED", "v9")
        self.assertEqual(kinds(ab.count_approval_bypasses([restore], [approval()])), ["UNAPPROVED_TRANSITION"])

    def test_execution_events_are_bypasses_even_after_approval(self):
        for name in ("SEND_EMAIL", "PUBLISH_POST", "DEPLOY", "CLIENT_DELIVERY", "EXTERNAL_SEND"):
            r = ab.count_approval_bypasses([READY, APPROVE, ev(3, "2026-09-03T10:40:00Z", name)], [approval()])
            self.assertEqual(kinds(r), ["EXECUTION_EVENT"], name)

    def test_mandatory_audit_event_types_are_never_flagged_as_execution(self):
        mandatory = ("COMMAND_RECEIVED COMMAND_NORMALIZED VOICE_VERIFIED REQUIRED_FIELD_CHECK SCOPE_CHECK SOURCE_PERMISSION_CHECK "
                     "CONTEXT_RETRIEVED EVIDENCE_REGISTER_CREATED AI_REASONING_RUN EVIDENCE_BRIEF_CREATED VALIDATION_RUN "
                     "APPROVAL_PACKET_CREATED OWNER_REVISION OWNER_REJECTION VERSION_SUPERSEDED ROLLBACK ERROR").split()
        events = [ev(i, f"2026-09-03T10:{i:02d}:00Z", name) for i, name in enumerate(mandatory)]
        self.assertEqual(ab.count_approval_bypasses(events, []).approval_bypass_count, 0)

    def test_content_mismatch_between_approval_and_validated_hash(self):
        r = ab.count_approval_bypasses([READY, APPROVE], [approval(packet_sha256=H2)], validated_sha256={f"{CMD}/v1": H1})
        self.assertEqual(kinds(r), ["CONTENT_MISMATCH"])
        ok = ab.count_approval_bypasses([READY, APPROVE], [approval(packet_sha256=H1)], validated_sha256={f"{CMD}/v1": H1})
        self.assertEqual(ok.approval_bypass_count, 0)

    def test_filter_by_command_and_input_not_mutated(self):
        other = ev(9, "2026-09-03T10:06:00Z", "OWNER_APPROVAL", "READY_FOR_APPROVAL", "APPROVED", "v1", actor="OWNER", cmd="GIC-20260903-002")
        recs = [approval(valid=False)]
        before = json.dumps(recs)
        self.assertEqual(ab.count_approval_bypasses([READY, APPROVE, other], [approval()], command_id=CMD).approval_bypass_count, 0)
        self.assertEqual(ab.count_approval_bypasses([READY, APPROVE, other], [approval()]).approval_bypass_count, 1)
        ab.count_approval_bypasses([READY, APPROVE], recs)
        self.assertEqual(json.dumps(recs), before)


class RealDrillLedgerTests(unittest.TestCase):
    """The G7 Step 7 rollback drill ledger (21 events, approvals v1-v3, one rollback) has zero bypasses."""

    def test_drill_ledger_has_zero_bypasses(self):
        drill = ROOT / "evals" / "rollback-drill"
        ledger = json.loads((drill / "ledger.json").read_text(encoding="utf-8"))
        state = json.loads((drill / "state.json").read_text(encoding="utf-8"))
        events = [AuditEvent(**{**e, "secret_fields": tuple(e.get("secret_fields", ()))}) for e in ledger["events"]]
        report = ab.count_approval_bypasses(events, state["approvals"])
        self.assertEqual(report.approval_bypass_count, 0, report.findings)

    def test_removing_the_approval_records_makes_the_same_ledger_fail(self):
        drill = ROOT / "evals" / "rollback-drill"
        ledger = json.loads((drill / "ledger.json").read_text(encoding="utf-8"))
        events = [AuditEvent(**{**e, "secret_fields": tuple(e.get("secret_fields", ()))}) for e in ledger["events"]]
        self.assertGreater(ab.count_approval_bypasses(events, []).approval_bypass_count, 0)


class PilotMetricsIntegrationTests(unittest.TestCase):
    def test_unknown_without_approvals_and_counted_with_them(self):
        events = [ev(0, "2026-09-03T09:59:00Z", "COMMAND_RECEIVED", None, "RECEIVED"), READY, APPROVE]
        unknown = pm.build_command_metrics(CMD, deliverable="x", events=events)
        self.assertIsNone(unknown["approval_bypasses"])
        known = pm.build_command_metrics(CMD, deliverable="x", events=events, approvals=[approval()])
        self.assertEqual(known["approval_bypasses"], {"count": 0, "findings": []})
        bad = pm.build_command_metrics(CMD, deliverable="x", events=events, approvals=[])
        self.assertEqual(bad["approval_bypasses"]["count"], 1)

    def test_baseline_summary_totals_and_flags_unmeasured(self):
        events = [ev(0, "2026-09-03T09:59:00Z", "COMMAND_RECEIVED", None, "RECEIVED"), READY, APPROVE]
        measured = pm.build_command_metrics(CMD, deliverable="x", events=events, approvals=[])
        unmeasured = pm.build_command_metrics(CMD, deliverable="x", events=events)
        s = pm.baseline_summary([measured, unmeasured])
        self.assertEqual((s["approval_bypass_count"], s["approval_bypass_unmeasured_commands"]), (1, 1))
        self.assertIsNone(pm.baseline_summary([unmeasured])["approval_bypass_count"])


if __name__ == "__main__":
    unittest.main()
