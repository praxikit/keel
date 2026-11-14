# Changelog — keel

## 0.1.1 — 2026-11-14
- Fix: skills read the method and templates from outside the installed plugin folder, so they would have failed after install. `method/` and `templates/` now ship inside the plugin.
- Moved into the praxikit monorepo (`kits/keel/`).

## 0.1.0 — 2026-11-07
- First release: five skills (plan, critique, delegate, verify, replan), four agents, the model-required hook, Cursor and Codex adapters.
