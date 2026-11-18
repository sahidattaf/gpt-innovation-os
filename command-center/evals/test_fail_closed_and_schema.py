"""Fail-closed secret guard in the Node harnesses, actor schema, and mandatory content binding call sites."""
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
REPO = ROOT.parent
GUARD_MJS = REPO / "scripts" / "g7-eval" / "guard.mjs"
SCHEMA = json.loads((ROOT / "schemas" / "contracts.schema.json").read_text(encoding="utf-8"))
SECRET = "password: hunter2"
CLEAN = "Create an internal operating recommendation"


def secret_free(text, candidates):
    """Run the real guard.mjs under Node with an explicit interpreter list; return its boolean verdict."""
    script = (f"import {{ secretFree }} from {json.dumps(GUARD_MJS.as_uri())};\n"
              f"const text = {json.dumps(text)};\nconst candidates = {json.dumps(candidates)};\n"
              "process.stdout.write(JSON.stringify(secretFree(text, { candidates })));\n")
    with tempfile.TemporaryDirectory() as tmp:
        path = pathlib.Path(tmp) / "probe.mjs"
        path.write_text(script, encoding="utf-8")
        r = subprocess.run(["node", str(path)], capture_output=True, text=True)
    if r.returncode != 0:
        raise AssertionError(r.stderr)
    return json.loads(r.stdout)


@unittest.skipUnless(shutil.which("node"), "node is not installed")
class SecretGuardFailsClosedTests(unittest.TestCase):
    PY = [sys.executable]

    def test_clean_text_with_a_working_guard_is_allowed(self):
        self.assertTrue(secret_free(CLEAN, [self.PY]))

    def test_secret_is_blocked(self):
        self.assertFalse(secret_free(SECRET, [self.PY]))

    def test_launch_failure_blocks(self):
        self.assertFalse(secret_free(CLEAN, [["no-such-interpreter-xyz"]]))

    def test_no_interpreters_at_all_blocks(self):
        self.assertFalse(secret_free(CLEAN, []))

    def test_unexpected_exit_codes_block(self):
        for code in (1, 2, 9, 49, 127, 9009):
            with self.subTest(code=code):
                self.assertFalse(secret_free(CLEAN, [[sys.executable, "-c", f"import sys; sys.exit({code})"]]))

    def test_crashing_guard_blocks(self):
        self.assertFalse(secret_free(CLEAN, [[sys.executable, "-c", "raise SystemExit('boom')"]]))

    def test_broken_first_interpreter_falls_through_to_a_working_one(self):
        self.assertTrue(secret_free(CLEAN, [["no-such-interpreter-xyz"], self.PY]))

    def test_a_secret_verdict_is_not_overridden_by_a_later_interpreter(self):
        # first interpreter really runs the guard and finds the secret; the second would exit 0
        self.assertFalse(secret_free(SECRET, [self.PY, [sys.executable, "-c", "pass"]]))


class HarnessesUseTheFailClosedGuardTests(unittest.TestCase):
    FILES = (REPO / "scripts" / "g7-eval" / "run_llm.mjs", ROOT / "evals" / "rollback-drill" / "pipeline.mjs")

    def test_harnesses_import_guard_and_have_no_local_permissive_check(self):
        for f in self.FILES:
            src = f.read_text(encoding="utf-8")
            with self.subTest(file=f.name):
                self.assertIn("guard.mjs", src)
                self.assertNotIn("guard_cli.py", src)
                self.assertNotRegex(src, r"status\s*!==?\s*3")
                self.assertNotIn("spawnSync", src)

    def test_guard_requires_explicit_zero(self):
        src = GUARD_MJS.read_text(encoding="utf-8")
        self.assertRegex(src, r"r\.status\s*===\s*GUARD_CLEAN")
        self.assertRegex(src, r"return false;\s*//\s*no interpreter")


class ActorSchemaTests(unittest.TestCase):
    ENUM = SCHEMA["$defs"]["AuditEvent"]["properties"]["actor"]["enum"]

    def test_operator_is_allowed_and_existing_actors_are_kept(self):
        for actor in ("OWNER", "AI_OPERATOR", "SYSTEM", "OPERATOR"):
            self.assertIn(actor, self.ENUM)

    def test_every_actor_in_the_drill_ledger_is_in_the_schema(self):
        ledger = json.loads((ROOT / "evals" / "rollback-drill" / "ledger.json").read_text(encoding="utf-8"))
        actors = {e["actor"] for e in ledger["events"]}
        self.assertIn("OPERATOR", actors)
        self.assertLessEqual(actors, set(self.ENUM))


class ContentBindingCallSitesTests(unittest.TestCase):
    def test_drill_and_fixtures_never_call_approval_check_without_hashes(self):
        for f, helper in ((ROOT / "evals" / "rollback-drill" / "drill.py", "def approval_gate"),
                          (REPO / "scripts" / "g7-eval" / "det_fixtures.py", "def approve")):
            src = f.read_text(encoding="utf-8")
            calls = [m for m in re.finditer(r"approval_check\(", src)]
            with self.subTest(file=f.name):
                self.assertIn(helper, src)
                for m in calls:
                    window = src[m.start(): m.start() + 400]
                    # direct calls are allowed only if they pass both hashes, or are the deliberate "no hashes => DENY" probe
                    self.assertTrue("packet_sha256=" in window or "no_hashes" in src[max(0, m.start() - 80): m.start()],
                                    f"unbound approval_check call in {f.name}: {window[:80]!r}")

    def test_drill_records_the_content_hash_in_every_approval_it_writes(self):
        src = (ROOT / "evals" / "rollback-drill" / "drill.py").read_text(encoding="utf-8")
        self.assertIn('"packet_sha256": packet_hashes(version)[0]', src)


if __name__ == "__main__":
    unittest.main()
