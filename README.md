# Geonovum OGC Checker

This repository contains a checker (validation & linting) for [OGC API Standards](https://ogcapi.ogc.org/) and [OGC Features and Geometries JSON (JSON-FG): Part 1 Core](https://docs.ogc.org/DRAFTS/21-045.html).

URL: https://geonovum.github.io/ogc-checker/

## JSON-FG

Version: 0.3.0\
Specification: https://docs.ogc.org/DRAFTS/21-045.html

| Requirement                                | Testable | Tested | Remarks                             |
| ------------------------------------------ | :------: | :----: | ----------------------------------- |
| `/req/core/schema-valid`                   |   Yes    |  Yes   |                                     |
| `/req/core/metadata`                       |   Yes    |  Yes   |                                     |
| `/req/core/instant`                        |   Yes    |  Yes   |                                     |
| `/req/core/interval`                       |   Yes    |  Yes   | Covered by `/req/core/schema-valid` |
| `/req/core/instant-and-interval`           |   Yes    |  Yes   |                                     |
| `/req/core/utc`                            |   Yes    |  Yes   | Covered by `/req/core/schema-valid` |
| `/req/core/coordinate-dimension`           |   Yes    |  Yes   |                                     |
| `/req/core/geometry-wgs84`                 |   Yes    |  Yes   |                                     |
| `/req/core/geometry-no-jsonfg-extension`   |   Yes    |  Yes   | Covered by `/req/core/schema-valid` |
| `/req/core/geom-valid`                     |   Yes    |   No   |                                     |
| `/req/core/place`                          |   Yes    |  Yes   |                                     |
| `/req/core/same-crs`                       |   Yes    |  Yes   | Covered by `/req/core/schema-valid` |
| `/req/core/fallback`                       |   Yes    |  Yes   |                                     |
| `/req/core/axis-order`                     |    No    |   No   |                                     |
| `/req/polyhedra/metadata`                  |   Yes    |  Yes   |                                     |
| `/req/polyhedra/coordinates`               |   Yes    |  Yes   |                                     |
| `/req/polyhedra/geom-valid`                |   Yes    |   No   |                                     |
| `/req/prisms/metadata`                     |   Yes    |  Yes   |                                     |
| `/req/prisms/coordinates`                  |   Yes    |  Yes   |                                     |
| `/req/circular-arcs/metadata`              |   Yes    |  Yes   |                                     |
| `/req/circular-arcs/geom-valid`            |   Yes    |   No   |                                     |
| `/req/measures/metadata`                   |   Yes    |  Yes   |                                     |
| `/req/measures/coordinates`                |   Yes    |  Yes   |                                     |
| `/req/measures/sub-geometries`             |   Yes    |  Yes   | Covered by `/req/core/schema-valid` |
| `/req/types-schemas/metadata`              |   Yes    |  Yes   |                                     |
| `/req/types-schemas/feature-type`          |   Yes    |  Yes   |                                     |
| `/req/types-schemas/geometry-dimension`    |   Yes    |  Yes   |                                     |
| `/req/types-schemas/feature-schemas`       |    ?     |   ?    |                                     |
| `/req/types-schemas/single-feature-schema` |    ?     |   ?    |                                     |
| `/req/profiles/rfc7946`                    |    ?     |   ?    |                                     |
| `/req/profiles/jsonfg`                     |    ?     |   ?    |                                     |
| `/req/profiles/jsonfg-plus`                |    ?     |   ?    |                                     |
| `/req/api/profile-parameter`               |    ?     |   ?    |                                     |

## OGC API - Features - Part 1: Core

Version: 1.0.1\
Specification: https://docs.ogc.org/is/17-069r4/17-069r4.html

| Requirement                     | Testable | Tested | Remarks |
| ------------------------------- | :------: | :----: | ------- |
| `/req/core/root-op`             |   Yes    |  Yes   |         |
| `/req/core/root-success`        |   Yes    |  Yes   |         |
| `/req/core/conformance-op`      |   Yes    |  Yes   |         |
| `/req/core/conformance-success` |   Yes    |  Yes   |         |
| `/req/core/fc-md-op`            |   Yes    |  Yes   |         |
| `/req/core/fc-md-success`       |   Yes    |  Yes   |         |
| `/req/core/sfc-md-op`           |   Yes    |  Yes   |         |
| `/req/core/sfc-md-success`      |   Yes    |  Yes   |         |
| `/req/core/fc-op`               |   Yes    |  Yes   |         |
| `/req/core/fc-response`         |   Yes    |  Yes   |         |
| `/req/core/fc-limit-definition` |   Yes    |  Yes   |         |
| `/req/core/fc-bbox-definition`  |   Yes    |  Yes   |         |
| `/req/core/fc-time-definition`  |   Yes    |  Yes   |         |
| `/req/core/f-op`                |   Yes    |  Yes   |         |
| `/req/core/f-response`          |   Yes    |  Yes   |         |
| `/req/oas30/oas-definition-2`   |   Yes    |  Yes   |         |

## OGC API - Features - Part 2: Coordinate Reference Systems by Reference

Version: 1.0.1\
Specification: https://docs.ogc.org/is/18-058r1/18-058r1.html

| Requirement                               | Testable | Tested | Remarks                                       |
| ----------------------------------------- | :------: | :----: | --------------------------------------------- |
| `/req/crs/crs-uri`                        |    No    |   No   |                                               |
| `/req/crs/fc-md-crs-list`                 |   Yes    |  Yes   |                                               |
| `/req/crs/fc-md-storageCrs`               |    No    |   No   |                                               |
| `/req/crs/fc-md-storageCrs-valid-value`   |   Yes    |  Yes   |                                               |
| `/req/crs/fc-md-crs-list-global`          |    No    |   No   |                                               |
| `/req/crs/fc-bbox-crs-definition`         |   Yes    |  Yes   |                                               |
| `/req/crs/fc-bbox-crs-valid-value`        |   Yes    |  Yes   | Tests the presence of a 400 response.         |
| `/req/crs/fc-bbox-crs-valid-defaultValue` |   Yes    |  Yes   | Covered by `/req/crs/fc-bbox-crs-definition`. |
| `/req/crs/fc-bbox-crs-action`             |    No    |   No   |                                               |
| `/req/crs/fc-crs-definition`              |   Yes    |  Yes   |                                               |
| `/req/crs/fc-crs-valid-value`             |    No    |   No   |                                               |
| `/req/crs/fc-crs-default-value`           |   Yes    |  Yes   | Covered by `/req/crs/fc-crs-definition`.      |
| `/req/crs/fc-crs-action`                  |    No    |   No   |                                               |
| `/req/crs/geojson`                        |    No    |   No   |                                               |
| `/req/crs/ogc-crs-header`                 |   Yes    |  Yes   |                                               |
| `/req/crs/ogc-crs-header-value`           |    No    |   No   |                                               |

## OGC API - Processes - Part 1: Core

Version: 2.0 (Draft)\
Specification: https://docs.ogc.org/DRAFTS/18-062r3.html

| Requirement                                                     | Testable | Tested | Remarks |
| --------------------------------------------------------------- | :------: | :----: | ------- |
| `/req/core/landingpage-op`                                      |   Yes    |  Yes   |         |
| `/req/core/landingpage-success`                                 |   Yes    |  Yes   |         |
| `/req/core/api-definition-op`                                   |    No    |   No   |         |
| `/req/core/api-definition-success`                              |    No    |   No   |         |
| `/req/core/conformance-op`                                      |   Yes    |  Yes   |         |
| `/req/core/conformance-success`                                 |   Yes    |  Yes   |         |
| `/req/core/http`                                                |    No    |   No   |         |
| `/req/core/process-list-op`                                     |   Yes    |  Yes   |         |
| `/req/core/pl-limit-definition`                                 |   Yes    |  Yes   |         |
| `/req/core/pl-limit-response`                                   |    No    |   No   |         |
| `/req/core/process-list-success`                                |   Yes    |  Yes   |         |
| `/req/core/pl-links`                                            |    No    |   No   |         |
| `/req/core/process-summary-links`                               |    No    |   No   |         |
| `/req/core/process-description-op`                              |   Yes    |  Yes   |         |
| `/req/core/process-description-success`                         |   Yes    |  Yes   |         |
| `/req/core/process-exception/no-such-process`                   |   Yes    |  Yes   |         |
| `/req/core/process-execute-op`                                  |   Yes    |  Yes   |         |
| `/req/core/process-execute-request`                             |   Yes    |  Yes   |         |
| `/req/core/process-execute-default-execution-mode`              |    No    |   No   |         |
| `/req/core/process-execute-auto-execution-mode`                 |    No    |   No   |         |
| `/req/core/process-execute-input-array`                         |    No    |   No   |         |
| `/req/core/process-execute-input-inline-object`                 |    No    |   No   |         |
| `/req/core/process-execute-input-multiple-types`                |    No    |   No   |         |
| `/req/core/process-execute-input-inline-binary`                 |    No    |   No   |         |
| `/req/core/process-execute-input-inline-bbox`                   |    No    |   No   |         |
| `/req/core/process-execute-input-validation`                    |    No    |   No   |         |
| `/req/core/process-execute-omitted-outputs`                     |    No    |   No   |         |
| `/req/core/process-execute-empty-outputs`                       |    No    |   No   |         |
| `/req/core/process-execute-sync-one`                            |   Yes    |  Yes   |         |
| `/req/core/process-execute-success-sync-one-default-content`    |    No    |   No   |         |
| `/req/core/process-execute-sync-many-json`                      |   Yes    |  Yes   |         |
| `/req/core/process-execute-success-sync-outputs-omitted`        |    No    |   No   |         |
| `/req/core/process-execute-success-sync-outputs-empty`          |    No    |   No   |         |
| `/req/core/job-results-success-sync`                            |    No    |   No   |         |
| `/req/core/process-execute-success-async`                       |   Yes    |  Yes   |         |
| `/req/core/process-execute-success-async-outputs`               |    No    |   No   |         |
| `/req/core/process-execute-success-async-outputs-empty`         |    No    |   No   |         |
| `/req/core/process-execute-success-async-outputs-omitted`       |    No    |   No   |         |
| `/req/core/job-op`                                              |   Yes    |  Yes   |         |
| `/req/core/job-success`                                         |   Yes    |  Yes   |         |
| `/req/core/job-exception-no-such-job`                           |   Yes    |  Yes   |         |
| `/req/core/job-results-op`                                      |   Yes    |  Yes   |         |
| `/req/core/job-results-param-outputs`                           |   Yes    |  Yes   |         |
| `/req/core/job-results-param-outputs-response`                  |    No    |   No   |         |
| `/req/core/job-result-op`                                       |   Yes    |  Yes   |         |
| `/req/core/job-results-async-one`                               |   Yes    |  Yes   |         |
| `/req/core/job-results-async-many`                              |   Yes    |  Yes   |         |
| `/req/core/job-results-exception/invalid-query-parameter-value` |   Yes    |  Yes   |         |
| `/req/core/job-results-exception/no-such-job`                   |   Yes    |  Yes   |         |
| `/req/core/job-results-exception/results-not-ready`             |   Yes    |  Yes   |         |
| `/req/core/job-results-exception/results-not-available`         |   Yes    |  Yes   |         |
| `/req/core/job-results-failed`                                  |   Yes    |  Yes   |         |
| `/req/ogc-process-description/json-encoding`                    |   Yes    |  Yes   |         |
| `/req/ogc-process-description/links`                            |    No    |   No   |         |
| `/req/ogc-process-description/inputs-def`                       |    No    |   No   |         |
| `/req/ogc-process-description/data-classes`                     |    No    |   No   |         |
| `/req/ogc-process-description/data-access-apis`                 |    No    |   No   |         |
| `/req/ogc-process-description/input-def`                        |    No    |   No   |         |
| `/req/ogc-process-description/input-multiple-types`             |    No    |   No   |         |
| `/req/ogc-process-description/value-passing`                    |    No    |   No   |         |
| `/req/ogc-process-description/execution-unit-requirements`      |    No    |   No   |         |
| `/req/ogc-process-description/outputs-def`                      |    No    |   No   |         |
| `/req/ogc-process-description/output-def`                       |    No    |   No   |         |
| `/req/ogc-process-description/output-multiple-types`            |    No    |   No   |         |
| `/req/job-list/job-list-op`                                     |   Yes    |  Yes   |         |
| `/req/job-list/type-definition`                                 |   Yes    |  Yes   |         |
| `/req/job-list/type-response`                                   |    No    |   No   |         |
| `/req/job-list/processID-mandatory`                             |   Yes    |   No   |         |
| `/req/job-list/processID-definition`                            |   Yes    |  Yes   |         |
| `/req/job-list/processid-response`                              |    No    |   No   |         |
| `/req/job-list/status-definition`                               |   Yes    |  Yes   |         |
| `/req/job-list/status-response`                                 |    No    |   No   |         |
| `/req/job-list/datetime-definition`                             |   Yes    |  Yes   |         |
| `/req/job-list/datetime-response`                               |    No    |   No   |         |
| `/req/job-list/duration-definition`                             |   Yes    |  Yes   |         |
| `/req/job-list/duration-response`                               |    No    |   No   |         |
| `/req/job-list/limit-definition`                                |   Yes    |  Yes   |         |
| `/req/job-list/limit-response`                                  |    No    |   No   |         |
| `/req/job-list/job-list-success`                                |   Yes    |  Yes   |         |
| `/req/job-list/links`                                           |    No    |   No   |         |
| `/req/json/definition`                                          |   Yes    |  Yes   |         |

## OGC API - Records - Part 1: Core

Version: 1.0 (Draft)\
Specification: https://docs.ogc.org/DRAFTS/20-004r1.html

| Requirement                        | Testable | Tested | Remarks |
| ---------------------------------- | :------: | :----: | ------- |
| `/req/json/conformance`            |    No    |   No   |         |
| `/req/json/record-response`        |   Yes    |  Yes   |         |
| `/req/json/record-content`         |   Yes    |  Yes   |         |
| `/req/json/record-content-profile` |    No    |   No   |         |
| `/req/json/collection-response`    |   Yes    |  Yes   |         |
| `/req/json/catalog-content`        |   Yes    |  Yes   |         |

## Development

Prepare your local environment:

- Install project dependencies: `npm install`
- Install VSCode extensions: Prettier, ESLint, Tailwind CSS IntelliSense
- Set VSCode default formatter to `esbenp.prettier-vscode`

Start the development server:

```bash
npm run dev
```
