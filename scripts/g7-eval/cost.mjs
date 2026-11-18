// Cost instrumentation bridge for the Node harnesses (G5 §38).
// Collects one entry per model call (success or failure), then `flush()` sends them to cost_cli.py, which
// records them with the production AIRunRecorder (validation, redaction, USD/XCG estimate, summary).
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CLI = resolve(dirname(fileURLToPath(import.meta.url)), "cost_cli.py");

export function createRunLog({ model, runIdPrefix }) {
  const runs = [];
  return {
    // usage: the API's `usage` object (input_tokens / output_tokens), or undefined if the call failed.
    add({ commandId, stage, status, usage, durationMs }) {
      runs.push({
        command_id: commandId,
        stage,
        model,
        status,
        input_tokens: usage?.input_tokens ?? null,
        output_tokens: usage?.output_tokens ?? null,
        duration_ms: durationMs ?? null,
      });
    },
    size: () => runs.length,
    // Returns { ai_runs, summary, xcg_rate_configured }. Throws if the recorder rejects the input.
    flush() {
      const input = JSON.stringify({ run_id_prefix: runIdPrefix, runs });
      // `python` can be a non-working Windows app alias; fall back to the `py -3` launcher. PYTHON overrides both.
      const candidates = [...(process.env.PYTHON ? [[process.env.PYTHON]] : []), ["python"], ["py", "-3"]];
      let r;
      for (const [cmd, ...pre] of candidates) {
        r = spawnSync(cmd, [...pre, "-I", CLI], { input, encoding: "utf8" });
        if (!r.error && r.status !== null) break; // launched (even if it then reported an error)
      }
      if (r.error || r.status !== 0) throw new Error(`cost_cli failed (exit ${r.status}): ${(r.stderr || r.error?.message || "").trim()}`);
      return JSON.parse(r.stdout);
    },
  };
}
