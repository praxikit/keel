#!/usr/bin/env node
/**
 * Keel PreToolUse hook for the Agent tool.
 *
 * Refuses a sub-agent launch that would silently run on the lead session's (most expensive)
 * model: no `model` given, and a `subagent_type` that carries no model of its own.
 *
 * Allowed without a model:
 *   - `fork`            — inherits the lead's model by design (it needs the lead's context)
 *   - `keel:*`          — Keel's agents pin their model in frontmatter
 *   - `KEEL_ALLOW_AGENTS` — comma-separated extra subagent_types the user has pinned themselves
 *
 * Reads the hook JSON from stdin only. Writes nothing. Exit 0 = allow, exit 2 = deny (reason on
 * stderr), exit 0 with no output on anything unexpected so a broken payload never blocks work.
 */
import { readFileSync } from "node:fs";

let raw = "";
try {
  raw = readFileSync(0, "utf8");
} catch {
  process.exit(0);
}
let payload;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}
if (!payload || (payload.tool_name !== "Agent" && payload.tool_name !== "Task")) process.exit(0);

const input = payload.tool_input ?? {};
const model = typeof input.model === "string" ? input.model.trim() : "";
const type = typeof input.subagent_type === "string" ? input.subagent_type.trim() : "";

if (model) process.exit(0);
if (type === "fork") process.exit(0);
if (type.startsWith("keel:") || ["critic", "builder", "reviewer", "scout"].includes(type)) process.exit(0);
const extra = (process.env.KEEL_ALLOW_AGENTS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
if (extra.includes(type)) process.exit(0);

process.stderr.write(
  `Keel: this Agent call names no model (subagent_type: ${type || "none"}). It would run on the lead's model. ` +
    `Use a Keel agent (keel:scout for reading, keel:builder for a briefed task, keel:reviewer for a diff, keel:critic for judgment), ` +
    `pass model: "haiku" | "sonnet" | "opus", or use subagent_type: "fork" when the lead's context is needed.\n`,
);
process.exit(2);
