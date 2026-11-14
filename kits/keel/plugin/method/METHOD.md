# The Keel method

Keel is a way of building software with AI agents that keeps the project on course: **argue
against the plan before anything is built, write the plan down where the code lives, give every
phase a check that proves it, route each task to the cheapest model that can do it, and go back
through the same gate the moment the idea changes.**

It is tool-agnostic. The method and the prompts in this folder work with Claude Code, Cursor,
Codex, ChatGPT or a person with a notebook. Only the automation layer (the plugin in
`plugin/`) is specific to Claude Code.

## The six documents

Every project carries a `docs/plan/` folder at its root. Templates are in `plugin/templates/docs/plan/`.

| File | Question it answers | Written |
|---|---|---|
| `00-brief.md` | What are we building, for whom, and what does "done" look like? | first, by the owner with the agent |
| `01-critique.md` | Should we build it at all, and is this the simplest honest version? | by the **critic** before any code |
| `02-decisions.md` | What did we decide, and why? (stack, tiers, trade-offs) | after the critique, kept current |
| `03-phases.md` | MVP first, then sub-phases: for each, its files, its tasks, its **acceptance checks** | after decisions |
| `04-security.md` | Threat model, scanners, the pre-launch checklist | with the phases, revisited before launch |
| `05-progress.md` | What happened, in order, with dates | every work session |

The folder is the source of truth. Chat is not. If a decision is not in `02-decisions.md`, it was
not decided.

## The critique gate

Nothing is built until `01-critique.md` has a verdict. The critic (the strongest model available,
or a sceptical colleague) must answer, in writing:

1. **Is it needed?** What happens if we do not build it. Who asked.
2. **Does it exist?** Libraries, services, prior art. "Use X" beats "build X".
3. **What is the simplest version** that would still be worth shipping? Cut until it hurts.
4. **Where is it over-engineered?** Every abstraction, every option, every "later we might".
5. **What breaks?** Failure modes, scale, data loss, the unhappy paths.
6. **What does it cost?** Free-tier limits and the paid line, per service, per month, at 10× use.
7. **Where is the attack surface?** Auth, secrets, uploads, injection, what a stranger can do.
8. **Are we pointed the right way?** The counter-argument. The better approach we have not seen.

The verdict is one of: **build as planned**, **build the cut-down version** (listed), **do not
build** (with what to do instead). The plan is then *edited*, not appended to.

The critic is not polite. The critic does not have to agree with the owner. The owner decides,
and the decision and its reasoning go into `02-decisions.md`.

## Phases and checks

`03-phases.md` splits the work into an MVP and numbered sub-phases. Each phase lists:

- **Goal**: one sentence.
- **Files**: the paths this phase may touch (the drift hook warns outside them).
- **Tasks**: small enough to brief in a paragraph each.
- **Checks**: commands or observations that prove the phase. `npm test`, a curl that returns 200,
  a screenshot measurement, a Lighthouse score. A phase without checks is not a phase.
- **Tier**: which model tier builds it (see below).

A phase is **passed** when every check passes and the result is written to `05-progress.md`.

## Model tiers

| Tier | Role | Typical model | Use for |
|---|---|---|---|
| Lead | directs, debugs, judges visuals, writes the critique | the strongest available (Claude Fable / Opus) | design direction, hard bugs, anything where a confident wrong answer costs more than the tokens |
| Critic | argues against the plan | the strongest available | the critique gate, re-plans, final review |
| Builder | implements a briefed task | mid tier (Claude Sonnet) | scoped implementation with exact files and checks |
| Reviewer | second read of a diff | mid tier | correctness and security review of a builder's work |
| Scout | reads and searches | small tier (Claude Haiku) | finding files, summarising docs, measuring |

The saving is not the routing; it is the **brief**. A builder with a tight brief (goal, files,
checks, what not to touch) finishes in one pass. A builder with a vague brief costs more than the
lead doing it. `prompts/brief.md` is the brief template; the Claude Code `/keel:delegate` skill
enforces it.

Honest expectations: a third to a half off on implementation-heavy work; little on work that is
mostly judgment. Running the **lead** one tier down for routine sessions saves more than any
sub-agent routing.

## Re-planning

When the idea changes, when a phase's checks cannot be met, or when the drift hook keeps firing:
stop, re-run the critique on the change, update `02-decisions.md` and `03-phases.md`, and log the
turn in `05-progress.md`. Re-planning is cheap. Building the wrong thing is not.

## Security track

- At planning: the threat model in `04-security.md` (assets, actors, entry points, what a
  stranger, a user and an admin can each do).
- During build: free scanners in CI (dependency audit, Semgrep, secret scanning), the reviewer
  reads every diff that touches auth, uploads, queries or secrets.
- Before launch: the pre-launch checklist in `04-security.md`, an OWASP Top-10 review by the
  critic, a dynamic scan of a preview (OWASP ZAP is free).
- What this is **not**: a penetration test. A pentest is a human with authorisation and a scope
  letter. Keel will tell you when a project warrants paying for one. No tool can promise that
  "no hacker gets in", and one that does is a liability.

## Using the method without the plugin

1. Copy `plugin/templates/docs/plan/` into your project as `docs/plan/`.
2. Fill `00-brief.md`.
3. Paste `prompts/critique.md` plus the brief into the strongest model you have. Save the answer as
   `01-critique.md`. Decide. Write `02-decisions.md`.
4. Paste `prompts/phases.md` plus the decisions. Save as `03-phases.md`.
5. For each task, paste `prompts/brief.md` filled in, into whichever model builds it.
6. Run the phase's checks. Log in `05-progress.md`.
7. Idea changed? Go to step 3.

Adapters for Cursor and Codex live in `adapters/`; they point those tools at these same files.
