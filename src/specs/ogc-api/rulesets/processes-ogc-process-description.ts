import { hasSchemaMatch } from '@geonovum/standards-checker';
import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';

export const OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_URI =
  'http://www.opengis.net/spec/ogcapi-processes-1/2.0/conf/ogc-process-description';

export const OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_DOC_URI = 'https://docs.ogc.org/DRAFTS/18-062r3.html#req_ogc-process-description_';

const processOgcProcessDescription: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/2.0/req/ogc-process-description',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "OGC Process Description"',
  formats: [oas3_0],
  rules: {
    '/req/ogc-process-description/json-encoding': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+$/))].get.responses.200',
      message: '200-responses of the server SHALL support the "application/json" media type. {{error}}',
      documentationUrl: OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_DOC_URI + 'json-encoding',
      severity: 'error',
      then: {
        function: hasSchemaMatch,
        functionOptions: {
          // v2.0 process schema. The schemas.opengis.net/.../2.0/ tree is not published yet (draft),
          // so the `master` branch — which tracks the 2.0 revision — is the live source.
          schemaUri: 'https://raw.githubusercontent.com/opengeospatial/ogcapi-processes/master/openapi/schemas/processes-core/process.yaml',
        },
      },
    },
  },
};

export default processOgcProcessDescription;
