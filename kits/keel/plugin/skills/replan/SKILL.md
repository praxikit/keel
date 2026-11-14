---
name: replan
description: The idea or the plan changed — take the change back through the Keel critique gate, edit decisions and phases, log the turn, and keep the docs truthful. Use when the user says "change of plan", "actually let's", "new idea", "scrap that", "pivot", when a phase is blocked, or when the drift check keeps firing.
---

# /keel:replan <what changed>

Re-planning is cheap; building the wrong thing is not. This skill is the same gate as `/keel:plan`,
run on a delta.

1. State the change in one paragraph and write it at the top of `docs/plan/00-brief.md` under a
   dated "Change" heading, with the old text kept below it struck through or in a "Was" line.
2. Launch `keel:critic` with the critique prompt, the updated brief, the current decisions and
   phases, and the instruction: "critique the change, not the whole project; say what it breaks,
   what it costs, and whether it is worth it." Append the round to `01-critique.md`.
3. Put the verdict in front of the user and stop for their decision.
4. Record the decision in `02-decisions.md` (a new row; if it reverses an old one, point at it).
5. Edit `03-phases.md`: phases affected get their Goal, Files, Tasks and Checks edited; passed
   phases are never un-passed, a new phase is added for rework instead. Edit `04-security.md` if
   the attack surface moved.
6. Log in `05-progress.md`: "re-planned — <change> — <verdict>".
7. Report: what changed in the plan, file by file, and where building resumes.
