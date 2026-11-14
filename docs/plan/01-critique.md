# Critique — round 1 (2026-11-14)

Verdict: **build the cut-down version.** Monorepo and generated catalog are right; defer the CLI and anything with other people's content.

1. **Needed?** Yes for the monorepo (install line and catalog both depend on it). The catalog is needed only once there are 2+ kits; build it now but keep it small, because it is also the shop window.
2. **Exists?** Claude Code marketplaces already give install and versioning for plugins. The catalog adds discovery and the non-plugin kinds (MCP configs, templates, adapters). Do not rebuild an installer.
3. **Simplest version:** `kit.json` per kit, one Node script that writes static HTML, one Pages workflow. No framework, no build dependencies beyond Node.
4. **Over-engineering risks:** a CLI (marketplace already updates plugins); a database; per-kit sites; a schema library. Skip all.
5. **What breaks:**
   - Moving files changes marketplace `source` paths; a wrong path silently breaks installs. Needs the smoke test.
   - Renaming `keel` -> `praxikit`: GitHub redirects the web and git URLs, but anyone who added `praxikit/keel` as a marketplace should be told once.
   - A bumped `version` that nobody tagged means installed copies update with no changelog. CI must check both.
6. **Cost by tier:** all free (Pages, Actions within the free minutes). Lead for schema and plan; Builder for the generator and CI from a tight brief; Scout to check Pages limits.
7. **Attack surface:** the generator renders manifest text into HTML, so it must escape everything. The Recommended list is external links, so it needs `rel="noopener noreferrer"`, link checking, and no affiliate links. Community submissions (later) are the real risk: a listed malicious plugin damages trust, so they stay out of v1.
8. **Counter-argument:** one repo couples release cadence and noise (a docs change in one kit triggers CI for all). Mitigation: CI runs per changed kit folder; tags are per kit (`keel-v0.2.0`). Big kits may still move to their own repo and be referenced by GitHub source.

## Owner decisions (2026-11-14)
- Monorepo: yes. Recommended section: yes. github.io first, custom domain later. CLI: later (recommended). Sponsor or community listings: discuss; not in v1.
