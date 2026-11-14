# Decisions — praxikit

| # | Decision | Why | Rejected |
|---|---|---|---|
| 1 | One repo `praxikit/praxikit`, made by renaming `praxikit/keel` (keeps history, stars, redirects) | Single install line; catalog reads one place | New empty repo + copy (loses history) |
| 2 | Layout: `kits/<name>/{kit.json, README.md, CHANGELOG.md, ...}`; plugin kits keep their plugin in `kits/<name>/plugin/`; marketplace at root `.claude-plugin/marketplace.json` | A kit is any kind of thing, not only a plugin | `plugins/` only (cannot hold MCP configs, templates) |
| 3 | `kit.json` fields: name, kind, collections[], tags[], version, promise, install, repo path, limits | One source of truth the site and CI both read | Hand-written catalog data |
| 4 | Kinds: plugin, skill, agent, hook, mcp, template, adapter | Matches how people search | Free-text categories |
| 5 | SemVer per kit; tags `<kit>-vX.Y.Z`; CHANGELOG per kit; CI fails if kit files change without a version bump | Plugin updates only reach users when `version` changes | Trust to remember |
| 6 | Site: Node script -> static HTML in `site/dist`, deployed by GitHub Actions to Pages. Relative links so a custom domain later needs no change | Free, no dependencies, portable | Next/Astro/etc. |
| 7 | URL now: `praxikit.github.io/praxikit/`. Later: custom domain via a `CNAME` file and DNS (Pages still hosts it) | `praxikit.github.io` at the root needs a separate repo of that exact name | Separate `praxikit.github.io` repo + PAT now |
| 8 | Two lists on the site: **Built by praxikit** and **Recommended** (external, attributed, with a one-line why, dated, link-checked, no affiliate links) | Honest about what is ours | Mixing them |
| 9 | No CLI in v1. Plugins update via `/plugin marketplace update praxikit`. The site publishes `versions.json` so a CLI or script can be added later | Marketplace covers the main case | Build installer now |
| 10 | Commit trailer `Co-Authored-By: Claude Sonnet 5.5` stays | Owner said keep or remove; kept for honesty | Remove |
| 11 | Git identity: local `ratul.arya.roy@gmail.com`; gh account `royal-programmer` (org admin on praxikit, scopes repo/workflow/read:org). Global git stays on work address | Owner instruction | Changing global config |

## Tiers
Lead: plan, schema, review. Builder: generator, CI, skills from tight briefs. Scout: Pages limits, link checks. Reviewer: second read of the generator (HTML escaping).
