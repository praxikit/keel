# Brief — Keel

**Date:** 2026-11-07 · **Owner:** Ratul Roy (praxikit)

## What
A method and a toolkit for building software with AI agents that stays on course: a written plan
at the project root, a critique gate that argues against the plan before any code, phases with
acceptance checks, model tiers so cheap models do the scoped work and expensive ones do the
judgment, a re-plan path for when the idea changes, and a security track that is honest about
what it is. Distributed as a Claude Code plugin from this repo, with the method and prompts usable
by any agent (Cursor, Codex, ChatGPT) through adapters.

## Who
- Ratul, on every project from now on (first: the portfolio platform, then a trading journal).
- Other developers who want the same discipline without reinventing it.

## Why now
Ratul's portfolio work runs on the most expensive model for everything, including CSS. The split
(strong model for direction and debugging, mid model for briefed implementation) was agreed but
has no tooling. Planning conversations happen in chat and are lost. Ideas change mid-build and the
docs do not follow.

## Done looks like
- `/keel:plan` in an empty repo produces a filled `docs/plan/` with a critic's verdict in under 15 minutes of the owner's time.
- `/keel:delegate` refuses to launch without a complete brief; a Builder task on Sonnet finishes in one pass on a well-briefed CSS/data task.
- `/keel:verify` marks a phase passed only with pasted check output.
- `/keel:replan` re-runs the gate on a change and edits (not appends to) decisions and phases.
- An `Agent` call without a model is refused by the hook.
- A Cursor project can follow the same method with the adapter file and the prompts.
- Installable with two slash commands from GitHub.

## Constraints
- Free: GitHub, Claude Code plugin mechanism, no hosted service, no API keys needed.
- Must not depend on any third-party routing service or proxy.
- Honest about limits: no "no hacker can get in"; automatic routing only in Claude Code.

## Non-goals
- A task classifier that calls a model to decide which model to use (costs more than it saves).
- Rebuilding planning skills that already exist in the user's install (make-plan, do, founder board); Keel's edge is the critique gate, the security track, the tiers and portability.
- A hosted dashboard, accounts, telemetry.

## Open questions
- Exact Claude Code plugin manifest fields and hook JSON (verify against docs before v1 ships).
- Whether a `/keel:security` skill (scanners in CI, pre-launch review) belongs in v1 or v2.
