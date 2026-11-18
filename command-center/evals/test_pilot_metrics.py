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
pm = _load("pilot_metrics")
AuditEvent = audit_runtime.AuditEvent
CMD = "GIC-20260903-001"
FAKE_TOKEN = "sk-FAKE-0000000000000000"  # obviously fake, test-only


def ev(ts, etype, before=None, after=None, cmd=CMD):
    return AuditEvent(event_id=f"E-{ts}-{etype}", command_id=cmd, timestamp=ts, actor="SYSTEM",
                      event_type=etype, object_type="command", object_id=cmd, result="OK",
                      status_before=before, status_after=after)


HAPPY = [
    ev("2026-09-03T10:00:00Z", "COMMAND_RECEIVED", None, "RECEIVED"),
    ev("2026-09-03T10:01:30Z", "VALIDATION_RUN", "VALIDATION", "READY_FOR_APPROVAL"),
    ev("2026-09-03T10:11:30Z", "OWNER_APPROVAL", "READY_FOR_APPROVAL", "APPROVED"),
]


class TimingTests(unittest.TestCase):
    def test_processing_and_owner_review_are_separate(self):
        self.assertEqual(pm.processing_time(HAPPY)["seconds"], 90.0)
        self.assertEqual(pm.owner_review_time(HAPPY)["seconds"], 600.0)

    def test_not_yet_measurable_is_none_not_zero(self):
        events = HAPPY[:1]
        self.assertIsNone(pm.processing_time(events)["seconds"])
        self.assertIsNone(pm.owner_review_time(events)["seconds"])

    def test_end_before_start_rejected(self):
        bad = [ev("2026-09-03T10:05:00Z", "COMMAND_RECEIVED", None, "RECEIVED"),
               ev("2026-09-03T10:00:00Z", "X", "VALIDATION", "READY_FOR_APPROVAL")]
        with self.assertRaises(ValueError):
            pm.processing_time(bad)


class ReworkTests(unittest.TestCase):
    def test_clean_run_has_no_rework(self):
        r = pm.rework(HAPPY)
        self.assertEqual((r["owner_requested"], r["system_detected"], r["reworked_after_first_owner_review"]), (0, 0, False))
        self.assertTrue(r["submitted_for_owner_review"])

    def test_system_and_owner_revisions_are_split(self):
        events = HAPPY[:1] + [
            ev("2026-09-03T10:01:00Z", "VALIDATION_RUN", "VALIDATION", "NEEDS_REVISION"),
            ev("2026-09-03T10:02:00Z", "VALIDATION_RUN", "VALIDATION", "READY_FOR_APPROVAL"),
            ev("2026-09-03T10:09:00Z", "OWNER_REVISION", "READY_FOR_APPROVAL", "NEEDS_REVISION"),
        ]
        r = pm.rework(events)
        self.assertEqual((r["system_detected"], r["owner_requested"], r["reworked_after_first_owner_review"]), (1, 1, True))

    def test_rate_counts_only_submitted_commands(self):
        def m(submitted, reworked):
            return {"rework": {"submitted_for_owner_review": submitted, "reworked_after_first_owner_review": reworked}}

        self.assertEqual(pm.rework_rate_percent([m(True, True), m(True, False), m(False, False), m(True, False), m(True, False)]), 25.0)
        self.assertIsNone(pm.rework_rate_percent([m(False, False)]))


class FollowUpTests(unittest.TestCase):
    def test_counts_only_before_first_ready_and_by_reason(self):
        qs = [pm.FollowUpQuestion("MISSING_FIELD", "2026-09-03T10:00:30Z"),
              pm.FollowUpQuestion("MISSING_FIELD", "2026-09-03T10:01:00Z"),
              pm.FollowUpQuestion("CONFLICT", "2026-09-03T10:05:00Z")]  # after READY -> not counted
        r = pm.follow_up_questions(qs, HAPPY)
        self.assertEqual(r["count"], 2)
        self.assertEqual(r["by_reason"]["MISSING_FIELD"], 2)
        self.assertEqual(r["by_reason"]["CONFLICT"], 0)

    def test_unknown_reason_rejected(self):
        with self.assertRaises(ValueError):
            pm.FollowUpQuestion("BECAUSE", "2026-09-03T10:00:00Z")


class DeliverableAndPayloadTests(unittest.TestCase):
    def test_missing_deliverable_is_never_invented(self):
        for blank in (None, "", "   "):
            self.assertEqual(pm.normalize_deliverable(blank), "NOT_PROVIDED")
        self.assertEqual(pm.normalize_deliverable(" One-page brief "), "One-page brief")

    def test_build_ignores_other_commands_events(self):
        other = [ev("2026-09-03T09:00:00Z", "COMMAND_RECEIVED", None, "RECEIVED", cmd="GIC-20260903-002")]
        m = pm.build_command_metrics(CMD, deliverable=None, events=HAPPY + other)
        self.assertEqual(m["processing_time"]["seconds"], 90.0)
        self.assertEqual(m["deliverable"], "NOT_PROVIDED")

    def test_secret_in_deliverable_is_redacted(self):
        m = pm.build_command_metrics(CMD, deliverable=f"use {FAKE_TOKEN}", events=HAPPY)
        self.assertNotIn(FAKE_TOKEN, json.dumps(m))
        self.assertNotIn(FAKE_TOKEN, pm.render_page_body_section(m))

    def test_attach_to_payload_adds_one_key_and_keeps_the_rest(self):
        m = pm.build_command_metrics(CMD, deliverable="Brief", events=HAPPY)
        out = pm.attach_to_payload({"command_id": CMD, "objective": "x"}, m)
        self.assertEqual(set(out), {"command_id", "objective", "pilot_metrics"})


class PageBodyTests(unittest.TestCase):
    def setUp(self):
        self.m = pm.build_command_metrics(CMD, deliverable="Brief", events=HAPPY)

    def test_round_trip(self):
        self.assertEqual(pm.parse_page_body_section(pm.render_page_body_section(self.m)), self.m)

    def test_upsert_appends_then_replaces_in_place_preserving_other_content(self):
        body = "# Owner Command\n\nKeep this text.\n"
        once = pm.upsert_page_body_section(body, self.m)
        self.assertTrue(once.startswith(body.rstrip("\n")))
        newer = pm.build_command_metrics(CMD, deliverable="Updated brief", events=HAPPY)
        twice = pm.upsert_page_body_section(once, newer)
        self.assertEqual(twice.count(pm.SECTION_START), 1)
        self.assertIn("Keep this text.", twice)
        self.assertEqual(pm.parse_page_body_section(twice)["deliverable"], "Updated brief")

    def test_no_section_returns_none_and_corrupt_section_raises(self):
        self.assertIsNone(pm.parse_page_body_section("nothing here"))
        with self.assertRaises(ValueError):
            pm.parse_page_body_section(f"{pm.SECTION_START}\nno json\n{pm.SECTION_END}")

    def test_baseline_summary_makes_no_roi_claim(self):
        s = pm.baseline_summary([self.m])
        self.assertEqual((s["commands"], s["processing_seconds_mean"], s["owner_review_seconds_mean"]), (1, 90.0, 600.0))
        self.assertIn("ROI", s["note"])


if __name__ == "__main__":
    unittest.main()
