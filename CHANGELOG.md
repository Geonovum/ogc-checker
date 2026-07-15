# @geonovum/ogc-checker

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
