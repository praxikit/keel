# Progress — praxikit

## 2026-11-14 — Phase 0 done, Phase 1 built
- Phase 0: repo renamed `praxikit/praxikit`; Keel moved to `kits/keel/`; fixed skills reading `../../method` outside the plugin (now `plugin/method`); keel 0.1.1. CI green on fa23166.
- Phase 1: `schema/kit.schema.json`, `kits/keel/kit.json`, `kits/keel/CHANGELOG.md`, `scripts/check-kits.mjs`, `check.yml` (validate + version-bump), `release.yml` (tag `<kit>-vX.Y.Z` -> release with CHANGELOG notes).
- Checks run locally (scratch copy for the negative cases):
  ```
  valid repo                      -> ok: 1 kit(s) valid
  shipped file changed, no bump   -> FAIL keel: shipped files changed ... version is still 0.1.1 (exit 1)
  docs-only change                -> ok (exit 0)
  bad kind / bad semver           -> FAIL x3 (exit 1)
  ```
- Open: install smoke test (`/plugin marketplace add praxikit/praxikit`) still to be run by the owner.
