---
'@geonovum/ogc-checker': patch
---

Update `@geonovum/standards-checker` to 1.4.1. It builds the CLI bundle with tsdown 0.23 and keeps its
`spectral/rulesets` entry, which the CLI loads at runtime, importable in Node. The CLI and the web app
behave exactly as before.
