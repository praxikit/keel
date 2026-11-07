# Task brief

A builder (a mid-tier model, or a colleague) gets this and nothing else. If you cannot fill every
field, you do not understand the task well enough to hand it off. Fill it, then paste it.

---

## Goal
One sentence. What exists when this is done that does not exist now.

## Context the builder needs
Three to six lines. The project, the stack, the conventions that matter for this task. Point at
files to read instead of retyping them. Mention the phase this belongs to (`docs/plan/03-phases.md`).

## Files
The exact paths this task may create or change. Nothing outside this list is touched; if the
builder believes it must be, it stops and says so.

- `path/to/file.ts` — what changes here
- `path/to/new-file.ts` — new, what it holds

## Steps
Numbered, each a paragraph at most. Decisions already made are stated, not reopened.

## Acceptance checks
Commands and observations that prove it. The builder runs them and pastes the output.

- `npm run typecheck` passes
- `npm test -- <pattern>` passes
- `curl -s localhost:3000/api/x | jq .ok` prints `true`
- the screenshot at 393 px wide shows …

## Do not
What is out of scope, what must not be changed, what must not be installed. Secrets never go in
code. No new dependencies unless listed above.

## Report back
A short summary: what changed (file list), the check outputs, anything left undone and why,
anything that surprised you.
