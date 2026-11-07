# Security

> Written with the phases; revisited before launch. This is a threat model, scanners and a
> checklist. It is not a penetration test, and it does not promise that nothing can get in.

## Assets
What we protect: user data, secrets, the admin, availability, reputation.

## Actors

| Actor | Access | Motivation |
|---|---|---|
| Stranger on the internet | public pages, public API | |
| Signed-in user | own data | |
| Admin | everything | |
| Automated scanner / bot | public surface at volume | |

## Entry points

| Entry point | Auth | Input | Risks | Mitigation | Phase |
|---|---|---|---|---|---|

## Secrets
Where each secret lives (env, CI, provider), who can read it, how it rotates. Nothing in the
repo, ever; the repo is assumed public.

## Scanners in CI (free)
- Dependency audit (`npm audit` / `pip-audit`) on every push
- Secret scanning (GitHub's, plus `gitleaks` in CI)
- Static analysis (Semgrep community rules)
- Dynamic scan of a preview before launch (OWASP ZAP baseline)

## Pre-launch checklist
- [ ] Auth on every non-public route, verified by a test that requests each one signed out
- [ ] Row-level security or equivalent on every table with user data
- [ ] Rate limits on login, sign-up, uploads, expensive endpoints
- [ ] Upload validation: type, size, content; stored outside the web root or in a bucket
- [ ] No service-role / admin keys reach the browser (grep the client bundle)
- [ ] Security headers: CSP, HSTS, frame-ancestors, referrer policy
- [ ] Dependencies audited; known-vulnerable versions gone
- [ ] Error pages leak no stack traces or internals
- [ ] Backups exist and a restore was tried once
- [ ] Logging on auth events and admin actions
- [ ] OWASP Top-10 review by the critic, written below
- [ ] Decision recorded: does this project warrant a paid human pentest? Why / why not?

## OWASP Top-10 review
| Category | Finding | Status |
|---|---|---|
