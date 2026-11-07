# Decisions — Keel

| # | Date | Decision | Why | Alternatives rejected | Tier / cost |
|---|---|---|---|---|---|
| 1 | 2026-11-07 | Keel is its own repo under the `praxikit` org, separate from the portfolio | the owner's personal repos stay his own work; the org collects tools | a folder in the portfolio repo | free |
| 2 | 2026-11-07 | Method and prompts are plain markdown, usable by any agent; automation is a Claude Code plugin | portability where it is possible, automation where it is | a Node CLI; a hosted service | free |
| 3 | 2026-11-07 | No model classifier | the lead knows what is hard; a classifier call costs more than it saves | donimas/ai-routing's `router.py` | — |
| 4 | 2026-11-07 | The critique gate runs even when the owner asks to skip it (short form) | the gate is the method | optional gate | — |
| 5 | 2026-11-07 | Security track = threat model + free scanners + pre-launch review; a human pentest is a named paid step, never promised by the tool | honesty; liability | "no hacker gets in" | free scanners |
| 6 | 2026-11-07 | Drift detection is v2, as a once-per-session warning hook; v1 uses `git diff --stat` in `/keel:verify` | interruptions; Claude-Code-only | per-edit blocking | — |
| 7 | 2026-11-07 | Reuse installed phased-execution skills rather than rebuild them | avoid duplicate tooling | a `/keel:do` | — |
| 8 | 2026-11-07 | Tiers: Lead/Critic = strongest (Fable or Opus); Builder/Reviewer = Sonnet; Scout = Haiku; model aliases in agent frontmatter so they track the current generation | predictable cost; no hard-coded model IDs | pinned IDs | — |

## Stack

| Layer | Choice | Tier | Limit to watch |
|---|---|---|---|
| Hosting | GitHub public repo | free | none |
| Distribution | Claude Code plugin marketplace (this repo) | free | manifest schema changes |
| Runtime | Node for the hook script (present wherever Claude Code is) | free | none |
| CI | GitHub Actions: lint JSON, shellcheck-equivalent for scripts | free | 2 000 min/month (far above need) |
