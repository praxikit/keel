# Why Keel exists

Read this first if you are an AI session or a new contributor opening this repo.

**Keel was built on 2026-11-07 by Ratul Roy and Claude while building a large portfolio platform.** On that project one
strong model (the lead) planned, argued against its own plan, handed well-briefed tasks to cheaper models (builders), and
checked their work in a browser. That split saved money and kept quality, but it lived in chat history and was repeated by
hand. Keel turns it into something any project can reuse and anyone can install.

## The problem
- A model that plans and builds in one pass builds what it first thought of, not the simplest thing that works.
- Cheap models fail when the brief is vague; strong models waste money on typing.
- Plans rot: the idea changes and the docs, the phases and the checks do not.
- "Done" is claimed without running anything.

## The method (short)
1. **Plan at the project root** (`docs/plan/`): brief, critique, decisions, phases with acceptance checks, security notes.
2. **Critique gate before code**, run by the strongest model: is it needed, does it exist, what is the simplest version,
   what breaks, free versus paid, attack surface, the counter-argument.
3. **Cheapest model that can do the task**: Scout (read and measure), Builder (implement a fully briefed task),
   Reviewer (a second read of a diff), Critic (the lead's model).
4. **Every phase proves itself**: declared check commands are run and their real output is pasted into the progress log.
5. **When the idea changes, go back through the gate** (`/keel:replan`).

## What it is not
Not a pentest, not a model classifier, and it does not route models for tools other than Claude Code. It says plainly when
a project needs a paid human for security.

## Roadmap (agreed 2026-11-07)
- **v1**: done. Plan docs, critique gate, model tiers, delegate, replan, verify, a hook that refuses sub-agents with no model.
- **v2**: a drift hook (warn once when an edit lands outside the phase's file list); a security track (threat model, free
  scanners in CI, OWASP review, pre-launch checklist); adapters for Cursor, Codex and GPT (method and prompts only).
- **v3**: publish as a plugin with one-line install and a catalog page on the praxikit site.

## Rules for working here
- Free tools only. No secrets in the repo.
- Keep every skill, agent and hook small enough to read in one sitting; prefer deleting to adding.
- Bump `version` in `kits/keel/plugin/.claude-plugin/plugin.json` on every release, or installed copies will not update.
- Keel is one kit in the **praxikit** family; see the workspace overview in the folder above this repo.
