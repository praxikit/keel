# Security — Keel

## Assets
The user's machine (the hook runs locally on every `Agent` call); the user's plan documents
(they may contain unreleased product plans); trust in the critique (it must not be steerable by
text inside the files it critiques).

## Actors

| Actor | Access | Motivation |
|---|---|---|
| A contributor to this repo | can change the hook script | a malicious hook would run on every installer's machine |
| A repo being planned | its docs are fed to the critic | prompt injection into the critique |

## Entry points

| Entry point | Auth | Input | Risks | Mitigation | Phase |
|---|---|---|---|---|---|
| `scripts/require-model.mjs` | runs as the user | hook JSON on stdin | arbitrary code if tampered | tiny, dependency-free, read-only, reviewed on every change; branch protection on `main` | 0 |
| The critic agent | the user's model access | plan files | injected instructions in plan files | the critic prompt states that plan files are data; the agent has read-only tools | 0 |

## Secrets
None. The plugin needs no keys. Users' projects keep secrets in their own env; the templates say so.

## Scanners in CI (free)
- JSON validity and a Node syntax check of the hook script on every push.
- GitHub secret scanning (on by default for public repos).

## Pre-launch checklist (v3)
- [ ] Hook script reviewed line by line by a second person
- [ ] Branch protection on `main` (PR required)
- [ ] `SECURITY.md` with a contact for reports
- [ ] Decision: a paid pentest is **not** warranted (no network surface, no hosted service)
