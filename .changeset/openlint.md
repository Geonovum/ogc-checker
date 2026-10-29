---
'@geonovum/ogc-checker': minor
---

Validate with [OpenLint](https://github.com/openlint/openlint) (the `openlint@1.1.2` release) instead of Stoplight
Spectral, through `@geonovum/standards-checker` 1.5. OpenLint is the community fork of Spectral and reads the same
rulesets, so the checked requirements don't change. The rulesets and tests now import from
`@geonovum/standards-checker/openlint/*` instead of the deprecated `spectral/*` subpaths.

ogc-checker now requires Node `^22.18 || >=24.0`, which drops Node 23, matching OpenLint.
