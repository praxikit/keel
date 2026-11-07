---
name: delegate
description: Hand a scoped task to the right Keel agent tier — Scout (Haiku) to read and search, Builder (Sonnet) to implement, Reviewer (Sonnet) to check a diff — with a full brief (goal, files, steps, checks, do-nots) so the cheaper model finishes in one pass. Use when the user says "delegate", "hand this off", "have sonnet do it", "let a sub-agent build this", or when a phase task is marked Builder or Scout.
---

# /keel:delegate <task>

The saving in model routing is the brief, not the routing. This skill refuses to launch without one.

## Steps

1. **Pick the tier.** Scout for reading, searching, measuring, summarising. Builder for
   implementation with known files. Reviewer for a second read of a diff. If the task needs
   design judgment, visual judgment, or a root cause nobody has found yet, do not delegate: say
   so and do it as the Lead.
2. **Write the brief** from `${CLAUDE_PLUGIN_ROOT}/../../method/prompts/brief.md`. Every section
   filled: Goal, Context, Files (exact paths), Steps, Acceptance checks (commands), Do not, Report
   back. Name the phase from `docs/plan/03-phases.md` and keep the Files inside that phase's list.
   If you cannot fill a section, you do not understand the task; find out first (a Scout can).
3. **Show the brief** to the user in one short block only if it changes files outside the current
   phase or installs anything. Otherwise launch.
4. **Launch** the agent (`keel:scout`, `keel:builder` or `keel:reviewer`) with the brief as the
   whole prompt. The agents carry their own model; never launch a bare general-purpose agent for
   delegated work (the Keel hook refuses an Agent call without a model for this reason).
5. **Run the checks yourself** when the agent reports back. Paste the outputs into
   `docs/plan/05-progress.md` under today's entry. If a check fails, fix it or send the agent back
   with the failure; do not mark it done.
6. **Report** to the user: what changed (files), the check outputs, what is left.

## Rules

- A Builder brief never says "improve", "clean up" or "make it nicer" without a measurable check.
- A Builder never gets a design decision to make; those are in `02-decisions.md` or are made by
  the Lead first.
- One task per launch. Parallel launches only for independent tasks with disjoint Files.
