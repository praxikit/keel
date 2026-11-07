# AGENTS.md — Keel adapter

<!-- Copy into your project root as AGENTS.md (or merge). Codex, Claude Code, Cursor and most
     coding agents read this file. It points them at the Keel plan documents. -->

This project is run with the **Keel method** (https://github.com/praxikit/keel).

- The plan is in `docs/plan/`: `00-brief.md`, `01-critique.md`, `02-decisions.md`,
  `03-phases.md`, `04-security.md`, `05-progress.md`. Read the brief, decisions and phases before
  working. Decisions are settled unless the owner re-plans.
- No code before `01-critique.md` has a verdict.
- Work one phase at a time, inside that phase's **Files** list. Need another file? Stop and say so.
- A phase passes only when its **Checks** pass; paste their output into `05-progress.md`.
- Security-sensitive changes (auth, secrets, uploads, queries, network) are reviewed before merge.
  Never commit secrets; assume the repo is public.
- Small commits, often. Log each session in `05-progress.md`, newest first, absolute dates.
