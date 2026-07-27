# @geonovum/ogc-checker

## 1.2.0

### Minor Changes

- f10cefc: Support the approved OGC API - Processes - Part 1: Core 1.0 (18-062r2).

  `ogc-api-processes` now ships two versions: the approved `1.0.0` and the existing `2.0.0` draft. Because
  `1.0.0` is the latest final version, it is the new default for `--standard ogc-api-processes`, for the
  deprecated `--ruleset ogc-api-processes` alias, and for `/#/ogc-api-processes` in the web UI — these all
  used to select the draft. Select the draft explicitly with `--version 2.0.0` (or
  `/#/ogc-api-processes/2.0.0`).

  The 1.0 rulesets cover the Core, OGC Process Description, JSON and Job list requirements classes, validate
  against the schemas published under `schemas.opengis.net/ogcapi/processes/part1/1.0/`, and ship their own
  example document. Both versions are now assembled from one shared library of rule builders, so requirements
  that only got renamed between 1.0 and 2.0 (`/req/core/job` → `/req/core/job-op` and friends) run the exact
  same check.

  The 2.0 rulesets are otherwise unchanged, apart from two message improvements: the seven Job list parameter
  rules now append the specific mismatch detail to their violation message (`{{error}}`), matching the
  existing Core parameter rules, and `/req/ogc-process-description/json-encoding` now says what it actually
  checks (validation against `process.yaml`) instead of claiming a media-type check it never performed.

## 1.1.0

### Minor Changes

- decbb67: Adopt the **Standard → Version** model from `@geonovum/standards-checker`.

  Each OGC standard — JSON-FG and OGC API Features / Processes / Records — is now a first-class
  `Standard` that owns an explicit version, rather than a bare ruleset slug. A single `Standard[]`
  config drives both the web app and the CLI.

  - **CLI:** validate with `--standard <slug>` and optional `--version <id>` (default = the latest
    `final` version). The old `--ruleset <slug>` flag keeps working as a **deprecated** alias that
    warns on stderr and resolves to the equivalent standard/version.
  - **UI:** the header gains a standard selector and an always-visible version selector; the URL anchor
    is `/#/{standard}/{version}` and legacy single-slug URLs redirect to it.

### Patch Changes

- decbb67: Ship the examples as raw fixture files: they are imported as raw text (Vite's
  `?raw` suffix, implemented for the CLI bundle by `build-cli` since
  `@geonovum/standards-checker` 1.2.0-beta.2) and render verbatim in the editor
  with the fixtures' own formatting.
- decbb67: Update `@geonovum/standards-checker` to the final `1.2.0` release (back to a
  caret range now that the pre-release period is over).

## 1.1.0-beta.0

### Minor Changes

- decbb67: Adopt the **Standard → Version** model from `@geonovum/standards-checker`.

  Each OGC standard — JSON-FG and OGC API Features / Processes / Records — is now a first-class
  `Standard` that owns an explicit version, rather than a bare ruleset slug. A single `Standard[]`
  config drives both the web app and the CLI.

  - **CLI:** validate with `--standard <slug>` and optional `--version <id>` (default = the latest
    `final` version). The old `--ruleset <slug>` flag keeps working as a **deprecated** alias that
    warns on stderr and resolves to the equivalent standard/version.
  - **UI:** the header gains a standard selector and an always-visible version selector; the URL anchor
    is `/#/{standard}/{version}` and legacy single-slug URLs redirect to it.

### Patch Changes

- decbb67: Ship the examples as raw fixture files: they are imported as raw text (Vite's
  `?raw` suffix, implemented for the CLI bundle by `build-cli` since
  `@geonovum/standards-checker` 1.2.0-beta.2) and render verbatim in the editor
  with the fixtures' own formatting.
- decbb67: Update `@geonovum/standards-checker` to the final `1.2.0` release (back to a
  caret range now that the pre-release period is over).
