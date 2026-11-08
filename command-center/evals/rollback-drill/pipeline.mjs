// Rollback drill: generate one packet version through the real v1.1 prompt pipeline.
// Usage (repo root):  node command-center/evals/rollback-drill/pipeline.mjs v1 [path/to/revision-instruction.txt]
// Reads 01-command.json, calls intake -> evidence analyst -> operator reasoning -> approval packet, and writes
// 02-<version>-{intake,evidence,reasoning,packet}.md and 02-<version>-run.json (model, tokens, timings).
// Every model input passes the secrets guard first. Inputs are synthetic; the API key is never written out.
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../..");
const version = process.argv[2];
const revisionFile = process.argv[3];
if (!/^v\d+$/.test(version ?? "")) throw new Error("usage: pipeline.mjs <v1|v2|...> [revision-instruction-file]");

const env = {};
for (const l of readFileSync(`${ROOT}/.env.local`, "utf8").split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (m && !l.trim().startsWith("#")) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
}
if (!env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY.includes("your-key-here")) throw new Error("ANTHROPIC_API_KEY missing or placeholder");
const model = env.CLAUDE_MODEL || "claude-sonnet-4-6";
const P = (n) => readFileSync(`${ROOT}/command-center/prompts/${n}.md`, "utf8");
const cmdFile = JSON.parse(readFileSync(`${HERE}/01-command.json`, "utf8"));
const cmdId = cmdFile.command_record.command_id;
const T = cmdFile.command_text_for_model;
const json = (x) => JSON.stringify(x, null, 2);

const secretFree = (t) => spawnSync("python", ["-I", `${ROOT}/scripts/g7-eval/guard_cli.py`], { input: t }).status !== 3;
const stages = {};
async function call(stage, system, user) {
  if (!(secretFree(system) && secretFree(user))) throw new Error(`SecretInModelInputError at stage ${stage}`);
  const t = Date.now();
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: 3500, temperature: 0, system, messages: [{ role: "user", content: user }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`API ${r.status} at stage ${stage}: ${j?.error?.type}: ${j?.error?.message}`);
  stages[stage] = { input_tokens: j.usage.input_tokens, output_tokens: j.usage.output_tokens, duration_ms: Date.now() - t };
  return j.content.map((c) => c.text ?? "").join("");
}

const revision = revisionFile ? readFileSync(resolve(revisionFile), "utf8").trim() : "";
const commandText = `OBJECTIVE: ${T.objective}
DELIVERABLE: ${T.deliverable}
IN SCOPE: ${T.scope}
OUT OF SCOPE: ${T.excluded_scope}
PERMITTED SOURCES: ${T.permitted_sources.join(", ")}
PRIORITY: ${T.priority_text}${revision ? `\n\nOWNER REVISION REQUEST (for ${version}): ${revision}` : ""}`;
const evidenceText = cmdFile.evidence_register.map((e) => `- ${e.id} (source: ${e.source}, reference: ${e.ref}): "${e.claim}"`).join("\n");
const policy = { scope_check: cmdFile.scope_check, source_checks: cmdFile.source_checks };
const startedAt = new Date().toISOString();

const intake = await call("intake", P("intake-normalizer-v1.1"), `Owner Command (Command ID: ${cmdId}):\n\n${commandText}`);
const evidence = await call("evidence", P("evidence-analyst-v1.1"), `Command ID: ${cmdId}\nEvidence register to classify (synthetic drill evidence):\n${evidenceText}\n\nClassify every material claim with the required classifications. Keep each source reference.`);
const reasoning = await call("reasoning", P("operator-reasoning-v1"), `Canonical OwnerCommand:\n${intake}\n\nAllowed context (evidence analyst output):\n${evidence}\n\nDeterministic policy results:\n${json(policy)}`);
const packet = await call("packet", P("approval-packet-v1.1"), `Generate the approval packet.\nCommand ID: ${cmdId}\nPacket Version: ${version}\n\nCanonical OwnerCommand:\n${intake}\n\nEvidence register (analyst output):\n${evidence}\n\nOperator reasoning output:\n${reasoning}\n\nDeterministic policy results:\n${json(policy)}`);

writeFileSync(`${HERE}/02-${version}-intake.md`, intake);
writeFileSync(`${HERE}/02-${version}-evidence.md`, evidence);
writeFileSync(`${HERE}/02-${version}-reasoning.md`, reasoning);
writeFileSync(`${HERE}/02-${version}-packet.md`, packet);
writeFileSync(`${HERE}/02-${version}-run.json`, json({ command_id: cmdId, version, model, started_at: startedAt, finished_at: new Date().toISOString(), revision: revision || null, stages }));
console.log(`model=${model} version=${version}`, Object.entries(stages).map(([s, v]) => `${s}:${v.input_tokens}/${v.output_tokens}/${v.duration_ms}ms`).join(" "));
