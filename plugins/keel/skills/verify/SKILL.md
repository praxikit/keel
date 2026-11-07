---
name: verify
description: Run a phase's acceptance checks from docs/plan/03-phases.md, paste the real outputs into 05-progress.md, and mark the phase passed, in progress or blocked. Use when the user says "verify", "is phase N done", "run the checks", "mark it passed", or at the end of a build session.
---

# /keel:verify [phase]

A phase passes on evidence, not on a description.

1. Read `docs/plan/03-phases.md`. Take the phase the user named, or the first phase that is 🟨.
2. For every line under **Checks**: if it is a command, run it and capture the output; if it is an
   observation (a measurement, a screenshot fact), make the measurement with a tool and record the
   number. Never infer a result.
3. Decide: all pass → ✅ with today's date; some fail → 🟨 with the failing checks listed; cannot run
   (missing service, missing key) → ⛔ with why.
4. Update the status line in `03-phases.md` and add an entry to `05-progress.md` with the pasted
   outputs in a code block.
5. If files outside the phase's **Files** list changed in this phase (`git diff --stat` against
   the phase's start), list them under the entry and ask whether the phase's list should grow or
   the change should move; this is the drift check.
6. Report: the status, the failing checks if any, and the next phase's goal.
