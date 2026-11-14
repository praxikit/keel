# Phases — praxikit

Status: ⬜ not started · 🟨 in progress · ✅ passed (date) · ⛔ blocked (why).

## Phase 0 — monorepo restructure ⬜
**Goal:** `praxikit/praxikit` holds Keel under `kits/keel/`, installs from the new name, history kept.
**Files:** repo root, `.claude-plugin/marketplace.json`, `kits/keel/**` (moved), `.github/workflows/check.yml`, `CLAUDE.md`, `PRAXIKIT.md`, `README.md`.
**Tasks:** (Lead, needs owner OK) rename the GitHub repo; move `.git` to the workspace root; `git mv` keel content into `kits/keel/`; point the marketplace `source` at `./kits/keel/plugin`; update CI paths and docs; one commit.
**Checks:** `claude plugin validate ./kits/keel/plugin` passes; CI green; `git log` still shows the three original commits; smoke test: `/plugin marketplace add praxikit/praxikit` then `/plugin install keel@praxikit`.
**Security:** no secrets moved; confirm `.gitignore` before the first commit at the root.

## Phase 1 — kit manifest, versioning, release 🟨 (built 2026-11-14; release workflow awaiting first tag)
**Goal:** every kit is described by `kit.json`; a change without a version bump fails CI; releases are tagged.
**Files:** `schema/kit.schema.json`, `kits/*/kit.json`, `kits/*/CHANGELOG.md`, `scripts/check-kits.mjs`, `.github/workflows/{check,release}.yml`.
**Checks:** a bad `kit.json` fails the script; editing a kit file without bumping `version` fails CI; a tag `keel-v0.1.1` creates a release.

## Phase 2 — catalog site ⬜
**Goal:** a static page on Pages listing Built by praxikit (by category) and Recommended.
**Files:** `site/build.mjs`, `site/templates/*`, `site/recommended.json`, `site/styles.css`, `.github/workflows/pages.yml`.
**Checks:** build output has a page per kit and one per category; every manifest string is HTML-escaped (test with `<script>` in a promise); external links carry `rel="noopener noreferrer"`; page works at 375px width and in dark mode; `versions.json` matches the manifests; the site loads at `praxikit.github.io/praxikit/`.

## Phase 3 — Keel v0.2 ⬜
**Goal:** the roadmap items in `why-keel.md` v2.
**Files:** `kits/keel/plugin/**`, `kits/keel/docs/**`.
**Tasks:** drift hook (warn once per session on edits outside the phase's files); `/keel:security` skill + CI template; configurable tiers (models set in one place instead of per-agent frontmatter); record the install smoke test; bump to 0.2.0 with changelog.
**Checks:** one warning per session outside the phase list, none inside; `actionlint` passes on the security template; `claude plugin validate` passes.

## Phase 4 — later ⬜
CLI for non-plugin kits; community listings via PR; custom domain; sponsor link. Each goes through the critique gate first.
