// Secrets-guard bridge for the Node harnesses. FAILS CLOSED.
//
// guard_cli.py exits 0 = clean, 3 = secret detected. Only an explicit exit 0 from a launched interpreter
// counts as "secret free". A launch error, a null status (killed / signal), the Windows `python` app alias,
// a crash, or any other exit code is treated as "not provably clean" and blocks the model call.
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const GUARD_CLI = resolve(dirname(fileURLToPath(import.meta.url)), "guard_cli.py");

export const GUARD_CLEAN = 0;
export const GUARD_SECRET = 3;

export function defaultCandidates(env = process.env) {
  return [...(env.PYTHON ? [[env.PYTHON]] : []), ["python"], ["py", "-3"]];
}

/**
 * @param {string} text
 * @param {{candidates?: string[][], cli?: string}} [opts] interpreter command lines to try (tests inject their own)
 * @returns {boolean} true ONLY when some interpreter ran the guard and it exited exactly 0 (and none reported a secret).
 */
export function secretFree(text, { candidates = defaultCandidates(), cli = GUARD_CLI } = {}) {
  for (const [cmd, ...pre] of candidates) {
    const r = spawnSync(cmd, [...pre, "-I", cli], { input: String(text), encoding: "utf8" });
    if (r.error || r.status === null) continue; // could not run: try the next interpreter
    if (r.status === GUARD_SECRET) return false; // secret found: stop at once
    if (r.status === GUARD_CLEAN) return true;   // the only success signal
    // any other status (for example the Windows app-alias stub, or a Python crash): not a verdict, try the next
  }
  return false; // no interpreter produced an explicit "clean": block
}
