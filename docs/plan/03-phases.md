# Phases — Keel

Status: ⬜ not started · 🟨 in progress · ✅ passed (date) · ⛔ blocked (why).

## Phase 0 — v1: the method, the templates, the plugin 🟨

**Goal:** A developer can install Keel from GitHub with two commands and plan a project through the critique gate, delegate with a brief, verify a phase, and re-plan.

**Files:**
- `method/METHOD.md`, `method/prompts/{critique,brief,phases}.md`
- `templates/docs/plan/0{0..5}-*.md`
- `plugins/keel/.claude-plugin/plugin.json`
- `plugins/keel/skills/{plan,critique,delegate,verify,replan}/SKILL.md`
- `plugins/keel/agents/{critic,builder,reviewer,scout}.md`
- `plugins/keel/hooks/hooks.json`, `plugins/keel/scripts/require-model.mjs`
- `.claude-plugin/marketplace.json`
- `adapters/cursor/.cursorrules`, `adapters/codex/AGENTS.md`
- `README.md`, `docs/plan/*`

**Tasks:**
1. (Lead) Write the method and the three prompts.
2. (Lead) Write the six templates.
3. (Lead) Write the five skills and four agents; verify manifest/hook formats against the Claude Code docs.
4. (Lead) Write the hook script: refuse `Agent` calls with no `model` unless `subagent_type` is `fork` or a `keel:*` agent.
5. (Lead) Marketplace manifest, README with install, adapters.
6. (Lead) Dogfood: this `docs/plan/` folder.

**Checks:**
- `node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json'))"` and the same for `plugins/keel/.claude-plugin/plugin.json` and `plugins/keel/hooks/hooks.json` exit 0
- `echo '{"tool_name":"Agent","tool_input":{"prompt":"x"}}' | node plugins/keel/scripts/require-model.mjs` exits 2 and prints a reason on stderr
- `echo '{"tool_name":"Agent","tool_input":{"prompt":"x","model":"sonnet"}}' | node plugins/keel/scripts/require-model.mjs` exits 0
- `echo '{"tool_name":"Agent","tool_input":{"prompt":"x","subagent_type":"keel:builder"}}' | node plugins/keel/scripts/require-model.mjs` exits 0
- Every `SKILL.md` and agent file has frontmatter with `name` and `description`
- Smoke test in Claude Code: `/plugin marketplace add praxikit/keel`, `/plugin install keel@praxikit`, `/keel:plan` in an empty temp folder produces `docs/plan/` with six files (recorded in `05-progress.md` with the session date)

**Security:** the hook script reads stdin only; no network, no writes. Reviewed by hand.

**Depends on:** —

## Phase 1 — v2: drift hook, security tooling, adapters tested ⬜

**Goal:** Building inside a phase is kept honest automatically, the security track has tooling, and the method is proven in Cursor on a real project.

**Files:**
- `plugins/keel/hooks/hooks.json` (PostToolUse on Edit/Write), `plugins/keel/scripts/drift.mjs`
- `plugins/keel/skills/security/SKILL.md`, `templates/ci/security.yml`
- `adapters/cursor/*`, `adapters/codex/*`, `docs/adapters.md`

**Tasks:**
1. (Lead) Drift hook: read the current 🟨 phase's Files from `docs/plan/03-phases.md`; on an edit outside them, print one warning per session (state file in the OS temp dir).
2. (Builder) `/keel:security`: wire dependency audit, gitleaks and Semgrep community rules into a GitHub Actions template; run the pre-launch checklist interactively; write the OWASP review table.
3. (Lead) Use the Cursor adapter on the trading-journal repo for one phase; record what broke.

**Checks:**
- Editing a file outside the phase list produces exactly one warning in a session; inside produces none
- `templates/ci/security.yml` passes `actionlint`
- `/keel:security` on a sample repo writes the OWASP table and ticks only items with evidence
- `docs/adapters.md` records a Cursor session on a real project

**Security:** the drift hook reads `docs/plan/03-phases.md` and the edited path only.

**Depends on:** 0

## Phase 2 — v3: publish ⬜

**Goal:** Anyone can find and install Keel; releases are tagged; the README has a two-minute walkthrough.

**Files:** `README.md`, `CHANGELOG.md`, `.github/workflows/release.yml`, `docs/walkthrough.md`

**Tasks:**
1. (Builder) Changelog, tags, a release workflow.
2. (Lead) Walkthrough with a real planning transcript (redacted).
3. (Scout) Check marketplace listing requirements at the time; list what is missing.

**Checks:**
- `git tag` shows `v1.0.0`; the release page exists
- A fresh machine installs from the tag and `/keel:plan` runs

**Security:** none new.

**Depends on:** 1

## Free-tier watchlist

| Limit | Service | First matters in phase |
|---|---|---|
| GitHub Actions 2 000 min/month | GitHub | 1 (security workflow on every push of a user's project, not this repo) |
