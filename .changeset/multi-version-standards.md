---
"@geonovum/ogc-checker": minor
---

Adopt the **Standard → Version** model from `@geonovum/standards-checker`.

Each OGC standard — JSON-FG and OGC API Features / Processes / Records — is now a first-class
`Standard` that owns an explicit version, rather than a bare ruleset slug. A single `Standard[]`
config drives both the web app and the CLI.

- **CLI:** validate with `--standard <slug>` and optional `--version <id>` (default = the latest
  `final` version). The old `--ruleset <slug>` flag keeps working as a **deprecated** alias that
  warns on stderr and resolves to the equivalent standard/version.
- **UI:** the header gains a standard selector and an always-visible version selector; the URL anchor
  is `/#/{standard}/{version}` and legacy single-slug URLs redirect to it.
