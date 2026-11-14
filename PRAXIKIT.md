# praxikit

**Practical kits for building with AI agents.** GitHub org: https://github.com/praxikit. Owner: Ratul Roy.
This folder is the monorepo `praxikit/praxikit`: every kit lives in `kits/<name>/`, the marketplace is at `.claude-plugin/marketplace.json`.

## What belongs here
Skills, plugins, MCP configs, agent adapters and templates that are reusable across projects. **Real apps do not belong in this org**
(the portfolio and the trading journal live in Ratul's personal GitHub, `royal-programmer`).

## Kits
| Kit | Folder | Repo | State |
|---|---|---|---|
| keel | `kits/keel/` | praxikit/praxikit | v0.1.1. Read `kits/keel/docs/why-keel.md`. |
| (next ones go in this table) | | | |

## The catalog (planned): a page that shows every kit as a collection
Ratul wants praxikit to have its own UI listing all skills, plugins and anything else as collections.
- **Source of truth:** the marketplace manifest (`.claude-plugin/marketplace.json`) plus one small manifest per kit
  (name, one-line promise, kind, tags, install line, repo, version, screenshots). The page reads them; nothing is hand-copied.
- **Collections:** Planning, Build and delegate, Quality and security, Design and 3D, Data and live sources, Adapters. A kit can sit in
  several. Kinds: Plugin, Skill, Agent, Hook, MCP config, Template.
- **Each kit page:** what it does, the one-line install, commands and agents it adds, a short demo, version and changelog, honest limits.
- **Hosting:** a static site on GitHub Pages in the org (free). Built from the manifests in CI.
- **Look:** calm, factual, no hype; same tone rule as the portfolio.
- **Not built yet.** Decide first whether the marketplace lives in one monorepo or one repo per kit (see below).

## Repo layout (decided 2026-11-14)
One monorepo, `praxikit/praxikit` (renamed from `praxikit/keel`; GitHub redirects the old URL). Install: `/plugin marketplace add praxikit/praxikit`. Plan: `docs/plan/`.

## How updates reach Claude Code
- Installed from GitHub: Claude Code copies the plugin into its cache by **version**. If the `version` in the plugin manifest does not
  change, installed copies do not update. Bump it on every release.
- Third-party marketplaces do not auto-update by default. Turn it on per marketplace in `/plugin` (Marketplaces), or run
  `/plugin marketplace update praxikit`, then `/reload-plugins` or restart.
- To try changes without releasing: start Claude Code with `--plugin-dir <path to the plugin folder>`; it loads the live files.

## Working here
- Open Claude Code in this folder. Git commands run at the repo root.
- Each kit keeps its own `CLAUDE.md` and `docs/`. The method for all of them is Keel's: plan, critique, delegate, verify.
