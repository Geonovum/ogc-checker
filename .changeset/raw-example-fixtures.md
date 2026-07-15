---
'@geonovum/ogc-checker': patch
---

Ship the examples as raw fixture files: they are imported as raw text (Vite's
`?raw` suffix, implemented for the CLI bundle by `build-cli` since
`@geonovum/standards-checker` 1.2.0-beta.2) and render verbatim in the editor
with the fixtures' own formatting.
