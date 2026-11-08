"""Tiny CLI wrapper so the Node harness uses the SAME secrets guard as production code.

Reads text on stdin. Exit 0 = clean; exit 3 = secret detected (nothing is echoed).
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "command-center" / "src"))
from secrets_guard import contains_secret  # noqa: E402

sys.exit(3 if contains_secret(sys.stdin.read()) else 0)
