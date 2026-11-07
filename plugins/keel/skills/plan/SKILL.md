---
name: plan
description: Start or restart a project plan the Keel way — brief, critique gate, decisions, phases with acceptance checks, security notes — written to docs/plan/ at the project root. Use when the user says "plan this", "let's plan", "new project", "should we build", or starts something with no docs/plan/ folder.
---

# /keel:plan

You are running the Keel planning phase. Read `${CLAUDE_PLUGIN_ROOT}/../../method/METHOD.md` once
if you have not this session. The output is the `docs/plan/` folder at the project root, filled.
Nothing is built in this skill.

## Steps

1. **Find or create the folder.** If `docs/plan/` does not exist, copy
   `${CLAUDE_PLUGIN_ROOT}/../../templates/docs/plan/` there. If it exists, read all six files
   first; this is a re-plan, and you edit rather than overwrite.
2. **Brief.** Fill `00-brief.md` with the user. Ask only what the template needs and you cannot
   infer from the request or the repo. Short answers are fine; empty sections are not. Write the
   file before going on.
3. **Critique gate.** Launch the `keel:critic` agent with the critique prompt
   (`${CLAUDE_PLUGIN_ROOT}/../../method/prompts/critique.md`) and the brief (plus decisions and
   phases if they exist). Save its answer verbatim as `01-critique.md` with today's date, the
   model, and the round number. Then put the verdict and the edits in front of the user in your
   own words, lead with the verdict, and **stop for their decision**. Do not soften the critique.
   Do not proceed on silence.
4. **Decisions.** Record what the user decided and why in `02-decisions.md`, one row per
   decision, including the ones where they overruled the critic. Fill the stack table with the
   tier and the limit to watch for every service.
5. **Phases.** Run the phases prompt (`${CLAUDE_PLUGIN_ROOT}/../../method/prompts/phases.md`) with
   the brief, critique and decisions — yourself, or via `keel:critic` for a large project. Write
   `03-phases.md`. Every phase has Goal, Files, Tasks with tiers, at least two Checks that are
   commands or precise observations, a Security line and Depends on. Split any phase over a day.
6. **Security.** Fill the threat model in `04-security.md` from the attack-surface section of the
   critique and the phases' Security lines. Leave the checklist unticked.
7. **Progress.** Add the first entry to `05-progress.md`: date, "planned", the verdict, what is
   open.
8. **Hand-off.** Tell the user, in a few lines: the verdict, the MVP's goal, its checks, and that
   building starts with `/keel:delegate` for Builder tasks or directly for Lead tasks. Offer a
   commit of `docs/plan/` with the message `docs(plan): keel plan — <verdict>`.

## Rules

- The critic's verdict is reported as written. If you disagree with the critic, say so separately
  and say why; do not edit the critique.
- No code, no scaffolding, no `npm init` in this skill.
- Dates are absolute (YYYY-MM-DD).
- If the user wants to skip the critique, do it anyway in a short form (questions 1, 3, 6, 7 and
  the verdict) and say that you did. The gate is the point of the method.
