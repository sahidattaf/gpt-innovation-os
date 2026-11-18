// G7 LLM fixture runner: FIX-001, 005, 006, 007, 008 (+ FIX-012 guard / prompt-backstop probes).
// Usage (from repo root, after `python scripts/g7-eval/det_fixtures.py`):
//   node scripts/g7-eval/run_llm.mjs
// Needs ANTHROPIC_API_KEY (and optionally CLAUDE_MODEL) in .env.local. Writes
// command-center/evals/results/llm-results.json. All inputs are synthetic; the key is never written out.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRunLog } from "./cost.mjs";
import { secretFree } from "./guard.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const CC = `${ROOT}/command-center`;
const env = {};
for (const l of readFileSync(`${ROOT}/.env.local`, "utf8").split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (m && !l.trim().startsWith("#")) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
}
if (!env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY.includes("your-key-here")) throw new Error("ANTHROPIC_API_KEY missing or placeholder in .env.local");
const model = env.CLAUDE_MODEL || "claude-sonnet-4-6";
const P = (n) => readFileSync(`${CC}/prompts/${n}.md`, "utf8");
const det = JSON.parse(readFileSync(`${CC}/evals/results/det-results.json`, "utf8"));
const json = (x) => JSON.stringify(x, null, 2);

// Same guard as production code: any text containing a secret must not enter model context.
// secretFree (./guard.mjs) fails closed: anything other than an explicit "clean" verdict blocks the call.
// G5 §38 cost instrumentation: every model call that is actually made (success or failure) is logged here and
// recorded through the production AIRunRecorder (scripts/g7-eval/cost_cli.py) when the run ends.
const runLog = createRunLog({ model, runIdPrefix: "G7" });
// If the run dies part-way, still report what the calls made so far cost (including FAIL runs).
process.on("exit", (code) => {
  if (code === 0 || runLog.size() === 0) return;
  try { console.error("cost (partial run):", JSON.stringify(runLog.flush().summary)); } catch (e) { console.error(String(e)); }
});
// Stage = prompt contract name (first heading, version stripped); Command ID = the fixture the call is for.
const stageOf = (system) => system.split(/\r?\n/)[0].replace(/^#\s*/, "").replace(/\s+v[\d.]+$/, "").toUpperCase().replace(/\s+/g, "_");
const commandOf = (user) => user.match(/Command ID:\s*(FIX-\d+)/)?.[1] ?? "UNKNOWN";
async function call(system, user, { bypassGuard = false } = {}) {
  if (!bypassGuard && !(secretFree(system) && secretFree(user))) throw new Error("SecretInModelInputError: blocked before model call");
  const started = Date.now();
  const log = (status, usage) => runLog.add({ commandId: commandOf(user), stage: stageOf(system), status, usage, durationMs: Date.now() - started });
  let r;
  try { r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: 3500, temperature: 0, system, messages: [{ role: "user", content: user }] }),
  }); } catch (e) { log("FAIL"); throw e; }
  const j = await r.json();
  if (!r.ok) { log("FAIL"); throw new Error(`API ${r.status}: ${j?.error?.type}: ${j?.error?.message}`); }
  log("SUCCESS", j.usage);
  return { text: j.content.map((c) => c.text ?? "").join(""), usage: j.usage };
}

const out = { model, promptVersions: { intake: "intake-normalizer-v1.1", analyst: "evidence-analyst-v1.1", reasoning: "operator-reasoning-v1", packet: "approval-packet-v1.1" }, fixtures: {} };

// ---- FIX-001 (full 3-stage pipeline)
{
  const pol = { scope_check: det["FIX-001"].scope_check, source_check: det["FIX-001"].source_check };
  const cmd = `OBJECTIVE: Create internal operating recommendation\nIN SCOPE: GPT Innovation Command Center\nOUT OF SCOPE: BOSSA, clients\nPERMITTED SOURCES: GPT Innovation Command Center\nPRIORITY: NORMAL`;
  const s1 = await call(P("intake-normalizer-v1.1"), `Owner Command (Command ID: FIX-001):\n\n${cmd}`);
  const s2 = await call(P("operator-reasoning-v1"), `Canonical OwnerCommand:\n${s1.text}\n\nAllowed context: none supplied beyond the command itself.\n\nEvidence register: EMPTY (no verified evidence has been provided).\n\nDeterministic policy results:\n${json(pol)}`);
  const s3 = await call(P("approval-packet-v1.1"), `Generate the approval packet.\nCommand ID: FIX-001\nPacket Version: v1\n\nCanonical OwnerCommand:\n${s1.text}\n\nOperator reasoning output:\n${s2.text}\n\nDeterministic policy results:\n${json(pol)}`);
  out.fixtures["FIX-001"] = { intake: s1, reasoning: s2, packet: s3 };
}

// ---- FIX-005 voice uncertainty
out.fixtures["FIX-005"] = { intake: await call(P("intake-normalizer-v1.1"),
`Owner Command (Command ID: FIX-005)
INPUT METHOD: VOICE NOTE
OWNER VERIFIED TRANSCRIPTION: NO
TRANSCRIPTION: "Use the fifty/fifteen thousand budget."`) };

// ---- FIX-006 conflicting records
out.fixtures["FIX-006"] = { analyst: await call(P("evidence-analyst-v1.1"),
`Command ID: FIX-006
Evidence inputs to classify:

[Input A] Primary Notion record (Software 3.0 Transformation OS — Command Center): Priority = HIGH
[Input B] Chat message: "Make this normal priority."

Approved source precedence (control policy): 1) GPT Innovation Command Center, 2) Software 3.0 Transformation OS — Command Center, 3) relevant chat history.
No further information about authorship, timing, or owner intent of Input B is available.`) };

// ---- FIX-007 AI inference
out.fixtures["FIX-007"] = { analyst: await call(P("evidence-analyst-v1.1"),
`Command ID: FIX-007
Evidence register:
- E-1 (source: GPT Innovation Command Center, reference: synthetic-evidence/E-1): "Leads increased."
  The register contains NO item explaining why leads increased.

Draft claim produced by a prior model step, to be classified:
- C-1: "Leads increased because of AI campaigns."

Classify every material claim (E-1 and C-1) with the required classifications.`) };

// ---- FIX-008 version mismatch: packet v2 after a v1 approval
out.fixtures["FIX-008"] = { packet: await call(P("approval-packet-v1.1"),
`Generate the approval packet.
Command ID: FIX-008
Packet Version: v2

Context: The owner approved Packet v1 ("Approved"). Afterwards the material recommendation changed (v1 recommended Option A; v2 now recommends Option B). Evidence register: EMPTY (no verified evidence supplied).

Deterministic policy results:
${json({ note: "Prior owner approval was recorded for Packet v1 (chat: 'Approved').", approval_check_v1_vs_v2: det["FIX-008"].v1_approval_vs_v2 })}`) };

// ---- FIX-012 (a) the guard stops the call; (b) prompt backstop if the guard were bypassed
{
  const FAKE = "sk-FAKE-0000000000000000"; // obviously fake
  const cmd = `Owner Command (Command ID: FIX-012)\nOBJECTIVE: Summarize the CRM export\nSOURCE: GPT Innovation Command Center\nNOTE FROM OWNER: use API token ${FAKE} to access it`;
  let guardBlocked = false;
  try { await call(P("intake-normalizer-v1.1"), cmd); } catch (e) { guardBlocked = String(e.message).startsWith("SecretInModelInputError"); }
  const probe = await call(P("intake-normalizer-v1.1"), cmd, { bypassGuard: true });
  out.fixtures["FIX-012"] = { guardBlockedModelCall: guardBlocked, backstopProbe: { ...probe, echoedFakeToken: probe.text.includes(FAKE), usedRedactedMarker: probe.text.includes("[REDACTED]") } };
}

const cost = runLog.flush(); // validates, redacts, prices (USD; XCG if XCG_PER_USD is set) and summarizes
out.ai_runs = cost.ai_runs;
out.cost_summary = { ...cost.summary, xcg_rate_configured: cost.xcg_rate_configured };
mkdirSync(`${CC}/evals/results`, { recursive: true });
writeFileSync(`${CC}/evals/results/llm-results.json`, json(out));
console.log("model:", model);
for (const [k, v] of Object.entries(out.fixtures)) console.log(k, Object.entries(v).map(([s, r]) => (r?.usage ? `${s}:${r.usage.input_tokens}/${r.usage.output_tokens}` : `${s}:${JSON.stringify(r).slice(0, 80)}`)).join(" "));
console.log("cost:", JSON.stringify(out.cost_summary));
