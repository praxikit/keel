---
name: critique
description: Run the Keel critique gate alone on a plan, an idea, a feature or a PR — is it needed, does it exist, the simplest version, over-engineering, what breaks, cost by tier, attack surface, the counter-argument — and return a verdict. Use when the user says "critique this", "poke holes", "is this over-engineered", "should we", "devil's advocate", or before a big change.
---

# /keel:critique

Argue against the thing in front of you before it is built. Input is whatever the user points at:
`docs/plan/` files, a message, a PR, a design.

1. Gather the material. If `docs/plan/00-brief.md` exists, include it and `02-decisions.md`.
   For a PR, include the diff summary and the phase it claims to belong to.
2. Launch the `keel:critic` agent with `${CLAUDE_PLUGIN_ROOT}/../../method/prompts/critique.md`
   and the material. If the user asked for a quick pass, tell the critic to answer questions 1, 3,
   6, 7 and the verdict only.
3. If `docs/plan/01-critique.md` exists, append the new round under a dated heading (rounds are
   kept; the plan is edited, the critique history is not). Otherwise show the result inline.
4. Report to the user: the verdict first, then the three strongest objections, then the edits the
   plan needs. Do not add praise. Do not reopen decisions the critic accepted.
5. If the verdict changes the plan, say "this needs `/keel:replan`" and stop.
