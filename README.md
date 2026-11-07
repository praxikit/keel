# keel

**Keeps a software project on course when AI agents build it.**

Keel is a method plus a Claude Code plugin. The method: write the plan at the project root, argue
against it before any code, split it into phases that each prove themselves, give each task to the
cheapest model that can do it, and go back through the same gate the moment the idea changes. The
plugin automates that inside Claude Code. The method and prompts work with any agent.

Honest scope: Keel is not a pentest, not a model classifier, and does not route models for tools
other than Claude Code. It will tell you when a project warrants paying a human for security.

## Install (Claude Code)

```
/plugin marketplace add praxikit/keel
/plugin install keel@praxikit
```

Then, in any project:

| Command | What it does |
|---|---|
| `/keel:plan` | Brief → critique gate → decisions → phases with checks → security notes, all in `docs/plan/` |
| `/keel:critique` | The gate alone, on a plan, an idea or a PR. Returns a verdict. |
| `/keel:delegate <task>` | Writes a full brief and hands the task to the right tier (Scout / Builder / Reviewer) |
| `/keel:verify [phase]` | Runs a phase's acceptance checks, pastes the output, marks it passed or not |
| `/keel:replan <change>` | The idea changed: back through the gate, decisions and phases edited, logged |

Agents the plugin adds: `keel:critic` (your session's model), `keel:builder` (Sonnet),
`keel:reviewer` (Sonnet), `keel:scout` (Haiku).

A hook refuses any `Agent` call that names no model, so nothing runs on your most expensive model
by accident. `fork` and Keel's own agents pass; set `KEEL_ALLOW_AGENTS=my-agent,other` for agents
you have pinned yourself.

## The method, without the plugin

Read [`method/METHOD.md`](method/METHOD.md). Copy [`templates/docs/plan/`](templates/docs/plan/)
into your project. Paste the prompts in [`method/prompts/`](method/prompts/) into whatever model
you use. Adapters for Cursor and Codex-style agents are in [`adapters/`](adapters/).

## The six documents

```
docs/plan/
  00-brief.md       what, who, why now, done-looks-like, constraints, non-goals
  01-critique.md    the critic's eight answers and a verdict, dated, every round kept
  02-decisions.md   one row per decision with why and what was rejected; the stack and its tiers
  03-phases.md      MVP then sub-phases: goal, files, tasks with tiers, acceptance checks, security
  04-security.md    threat model, scanners, pre-launch checklist, OWASP review
  05-progress.md    what happened, newest first, with pasted check output
```

## Why the critique gate

Most wasted work is work that should not have started. The critic answers eight questions in
writing before a line is written: is it needed, does it exist, the simplest version,
over-engineering, what breaks, cost by tier, attack surface, the counter-argument. The verdict is
one of three words. The owner decides, and the decision is recorded. See
[`method/prompts/critique.md`](method/prompts/critique.md).

## Why tiers, and what they save

The saving is the brief, not the routing. A mid-tier model with a tight brief (goal, exact files,
steps, acceptance checks, do-nots) finishes in one pass. The same model with "improve the CSS"
costs more than the lead doing it. Expect a third to a half off on implementation-heavy work, and
little on work that is mostly judgment. Running the lead one tier down for routine sessions saves
more than any sub-agent routing.

## Status

v0.1 — Phase 0 of [Keel's own plan](docs/plan/03-phases.md), written with the method. Roadmap:
drift hook, security tooling and tested adapters (v2), then publishing (v3).

## Licence

MIT.
