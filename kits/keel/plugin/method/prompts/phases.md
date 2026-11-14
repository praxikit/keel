# Phases prompt

Paste this, then `00-brief.md`, `01-critique.md` and `02-decisions.md`.

---

Split this project into an **MVP** and numbered **sub-phases**, following the decisions as
written (do not reopen them). The MVP is the smallest version the critique allowed, nothing more.
Every later phase adds one coherent capability.

For each phase write:

- **Goal** — one sentence.
- **Files** — the paths it will create or change. Be specific; this list is enforced.
- **Tasks** — each small enough to brief in one paragraph; each names its model tier
  (Lead / Builder / Scout) with one line on why.
- **Checks** — commands or observations that prove the phase is done. Every phase has at least
  two. Prefer commands with pass/fail output.
- **Security** — what in this phase touches auth, secrets, uploads, queries or the network, and
  what the reviewer must look at.
- **Depends on** — earlier phases.

Order the phases so that each one leaves a working, demonstrable product. Flag any phase longer
than roughly a day of work and split it.

End with a **free-tier watchlist**: every limit the phases approach, with the phase number where
it first matters.
