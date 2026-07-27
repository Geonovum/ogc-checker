---
'@geonovum/ogc-checker': minor
---

Support the approved OGC API - Processes - Part 1: Core 1.0 (18-062r2).

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
