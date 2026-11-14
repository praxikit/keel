# Brief — praxikit monorepo and catalog

Date: 2026-11-14 · Owner: Ratul Roy

## What
Turn the praxikit workspace into one GitHub repo (`praxikit/praxikit`) that holds every kit Ratul builds, a
versioned marketplace, and a static catalog page that lists them by category. Improve Keel (v0.2) inside it.

## Who
- Developers who want to install a kit with one line and get updates when it improves.
- Ratul, who wants one place to publish, version and show his work.

## Done looks like
1. One repo `praxikit/praxikit`; `/plugin marketplace add praxikit/praxikit` and `/plugin install keel@praxikit` work.
2. Every kit has a `kit.json` (name, kind, tags, version, promise, install line) validated in CI.
3. A version bump is enforced: kit files changed without a `version` change fails CI.
4. A catalog site on GitHub Pages, generated from the manifests, with categories, a page per kit and a
   separate "Recommended" section for things Ratul uses but did not make (clearly labelled external).
5. Keel v0.2: drift hook, security skill, configurable tiers, install smoke test recorded.

## Constraints
Free tools only. No secrets. Static site, no framework, no runtime server. Calm, factual tone. Real apps stay in `royal-programmer`.

## Non-goals (for now)
A `praxikit` CLI; community or paid listings; a custom domain; analytics.
