import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';
import * as rule from './processes-rules';
import { SCHEMAS_URI_PREFIX } from './processes-v2-core';

export const OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_URI =
  'http://www.opengis.net/spec/ogcapi-processes-1/2.0/conf/ogc-process-description';

export const OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_DOC_URI = 'https://docs.ogc.org/DRAFTS/18-062r3.html#req_ogc-process-description_';

const processOgcProcessDescription: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/2.0/req/ogc-process-description',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "OGC Process Description"',
  formats: [oas3_0],
  rules: {
    // v2.0 process schema. The schemas.opengis.net/.../2.0/ tree is not published yet (draft),
    // so the `master` branch — which tracks the 2.0 revision — is the live source.
    '/req/ogc-process-description/json-encoding': rule.processDescriptionJsonEncoding(
      OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_DOC_URI + 'json-encoding',
      `${SCHEMAS_URI_PREFIX}processes-core/process.yaml`,
    ),
  },
};

export default processOgcProcessDescription;
