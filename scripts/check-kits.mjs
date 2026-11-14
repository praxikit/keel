#!/usr/bin/env node
/**
 * Validates every kit and enforces version bumps. No dependencies.
 *
 *   node scripts/check-kits.mjs                 validate manifests, changelogs, marketplace
 *   node scripts/check-kits.mjs --base <ref>    also fail if a kit's shipped files changed
 *                                               since <ref> without a version change
 *
 * Shipped files = everything under kits/<name>/ except docs/, README.md, CLAUDE.md, CHANGELOG.md.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const KINDS = ["plugin", "skill", "agent", "hook", "mcp", "template", "adapter"];
const COLLECTIONS = ["Planning", "Build and delegate", "Quality and security", "Design and 3D", "Data and live sources", "Adapters"];
const SEMVER = /^\d+\.\d+\.\d+$/;
const errors = [];
const fail = (kit, msg) => errors.push(`${kit}: ${msg}`);

const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const baseIdx = process.argv.indexOf("--base");
const base = baseIdx > -1 ? process.argv[baseIdx + 1] : null;

const marketplace = readJson(".claude-plugin/marketplace.json");
const kitNames = existsSync("kits") ? readdirSync("kits", { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];

for (const name of kitNames) {
  const dir = join("kits", name);
  const manifestPath = join(dir, "kit.json");
  if (!existsSync(manifestPath)) { fail(name, "missing kit.json"); continue; }
  let k;
  try { k = readJson(manifestPath); } catch (e) { fail(name, `kit.json is not valid JSON (${e.message})`); continue; }

  if (k.name !== name) fail(name, `name "${k.name}" must equal the folder name`);
  if (!KINDS.includes(k.kind)) fail(name, `kind must be one of ${KINDS.join(", ")}`);
  if (!Array.isArray(k.collections) || !k.collections.length || !k.collections.every((c) => COLLECTIONS.includes(c)))
    fail(name, `collections must be a non-empty list from: ${COLLECTIONS.join(", ")}`);
  if (!Array.isArray(k.tags) || !k.tags.every((t) => /^[a-z0-9-]+$/.test(t))) fail(name, "tags must be lowercase words");
  if (!SEMVER.test(k.version ?? "")) fail(name, "version must be X.Y.Z");
  if (typeof k.promise !== "string" || !k.promise || k.promise.length > 140) fail(name, "promise must be one sentence of at most 140 characters");
  if (!Array.isArray(k.install) || !k.install.length) fail(name, "install must list at least one command");
  if (!Array.isArray(k.limits) || !k.limits.length) fail(name, "limits must list at least one honest limit");

  const changelog = join(dir, "CHANGELOG.md");
  if (!existsSync(changelog)) fail(name, "missing CHANGELOG.md");
  else if (!new RegExp(`^## ${k.version?.replaceAll(".", "\\.")}( |$)`, "m").test(readFileSync(changelog, "utf8")))
    fail(name, `CHANGELOG.md has no "## ${k.version}" heading`);

  if (k.kind === "plugin") {
    const pj = join(dir, "plugin", ".claude-plugin", "plugin.json");
    if (!existsSync(pj)) fail(name, "plugin kit has no plugin/.claude-plugin/plugin.json");
    else if (readJson(pj).version !== k.version) fail(name, `plugin.json version ${readJson(pj).version} != kit.json version ${k.version}`);
    const entry = (marketplace.plugins ?? []).find((p) => p.name === name);
    if (!entry) fail(name, "not listed in .claude-plugin/marketplace.json");
    else if (entry.source !== `./kits/${name}/plugin`) fail(name, `marketplace source is ${entry.source}, expected ./kits/${name}/plugin`);
  }

  if (base) {
    const git = (...a) => execFileSync("git", a, { encoding: "utf8" });
    let changed = [];
    try {
      changed = git("diff", "--name-only", `${base}...HEAD`, "--", dir).split("\n").filter(Boolean)
        .filter((f) => !/^kits\/[^/]+\/(docs\/|README\.md$|CLAUDE\.md$|CHANGELOG\.md$)/.test(f));
    } catch { console.log(`note: cannot diff against ${base}; skipping bump check for ${name}`); continue; }
    if (changed.length) {
      let before = null;
      try { before = JSON.parse(git("show", `${base}:${manifestPath.replaceAll("\\", "/")}`)).version; } catch { /* new kit */ }
      if (before !== null && before === k.version) fail(name, `shipped files changed since ${base} but version is still ${k.version}: ${changed.slice(0, 3).join(", ")}${changed.length > 3 ? ", ..." : ""}`);
    }
  }
}

for (const p of marketplace.plugins ?? []) {
  if (!kitNames.includes(p.name)) errors.push(`marketplace lists "${p.name}" but kits/${p.name}/ does not exist`);
}

if (errors.length) { console.error(errors.map((e) => `FAIL ${e}`).join("\n")); process.exit(1); }
console.log(`ok: ${kitNames.length} kit(s) valid${base ? `, version bumps checked against ${base}` : ""}`);
