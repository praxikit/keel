# Critique — Keel

**Date:** 2026-11-07 · **Critic:** Claude Fable 5.1 · **Round:** 1
(written in the owner's planning conversation before this repo existed; recorded here verbatim in substance)

## 1. Is it needed?
Partly. The *method* is needed: decisions are being lost in chat and the expensive model is doing
cheap work. The *tooling* is optional: the method works with copied templates and pasted prompts.
If nothing is built, the owner keeps paying top-tier prices for CSS and keeps re-deciding things.

## 2. Does it already exist?

| Option | Covers | Leaves undone | Licence / cost |
|---|---|---|---|
| Claude Code sub-agents with `model` in frontmatter | routing | brief discipline, planning docs, critique | built in, free |
| `make-plan` / `do` skills (installed) | phased plans, execution by sub-agents | the critique gate, security, portability | free |
| founder-board style skills | adversarial review for business ideas | software plans | free |
| donimas/ai-routing | config templates, 4 pinned agents, a model-required hook, a Haiku classifier | planning, docs, portability; classifier costs more than it saves | MIT, free; 6 stars |

Verdict on this question: build the gate, the docs and the portability; borrow the hook idea;
reuse rather than rebuild phased execution.

## 3. The simplest version
In: six plan templates, the critique prompt, the brief prompt, the phases prompt, one plugin with
five skills and four agents, one hook, two adapter files, a README.
Out (v1): drift hook, security scanners wired into CI, a `/keel:security` skill, a published
marketplace listing beyond this repo, any UI.

## 4. Over-engineering

| Item | Keep / cut / defer | Why |
|---|---|---|
| Automatic drift detection on every edit | defer to v2 | interruptions; only possible in Claude Code; a `git diff --stat` in `/keel:verify` covers 80% |
| A "testing module" | cut | phases declare check commands; the project's own tools run them |
| Full pentest promise | cut | not achievable by a tool; replaced by threat model + free scanners + honest "pay a human when it warrants" |
| Model classifier | cut | the lead already knows what is hard |
| Cross-tool automatic routing | cut | not possible outside Claude Code; the method and prompts are the portable part |
| Per-project copies of agents | defer | the plugin covers every project; copy only when a repo needs its own |

## 5. What breaks
- Plugin format drift: Claude Code's manifest and hook schemas change; pin to the documented
  shape and keep a smoke test (install from the repo, run `/keel:plan` in a temp dir).
- The critique gate becomes theatre if the critic runs on a weak model or the owner skips it;
  the `plan` skill runs a short form even when asked to skip.
- Briefs rot: a builder told to touch files outside the phase list; `/keel:verify` reports drift.
- The hook blocks legitimate `fork` or named-agent launches if written too strictly; allow `fork`
  and any `keel:*` agent.

## 6. Cost

| Service | Free tier limit | Paid line | At launch | At 10× | Pauses / expires? |
|---|---|---|---|---|---|
| GitHub (public repo, org) | unlimited public repos | none needed | $0 | $0 | no |
| Claude Code plugin mechanism | included | none | $0 | $0 | no |
| Model usage | n/a | per token | depends on the owner's plan | | the saving is the point |

## 7. Attack surface
- The plugin runs a hook script locally on every `Agent` call: it must read stdin only, never the
  network, never write outside its own output. Review it like any script that runs on your machine.
- Prompts and templates are text; the risk is prompt injection *from a repo's own docs* into the
  critic. Mitigation: the critic treats plan files as data to critique, not instructions.
- No secrets, no network, no telemetry.

## 8. Direction
The counter-argument: skip the plugin, ship only `method/` and `templates/`, and tell people to
paste. Cheaper, fully portable, no format risk. Rejected by the owner because the brief discipline
and the model-required hook are where the money is saved, and those need automation.

## Verdict
**BUILD THE CUT-DOWN VERSION** — v1 as listed in section 3. v2: drift hook, security track
tooling, Cursor/Codex adapters tested on a real project. v3: publish.

## Edits the plan needs
- `03-phases.md`: three phases as above; v1 checks must include an install-from-GitHub smoke test.
- `04-security.md`: the hook script's review is the only real item; the rest is "not applicable".
