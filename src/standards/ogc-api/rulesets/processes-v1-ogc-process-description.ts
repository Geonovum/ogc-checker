import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';
import * as rule from './processes-rules';
import { SCHEMAS_URI_PREFIX } from './processes-v1-core';

export const OGC_API_PROCESSES_V1_OGC_PROCESS_DESCRIPTION_URI =
  'http://www.opengis.net/spec/ogcapi-processes-1/1.0/conf/ogc-process-description';

export const OGC_API_PROCESSES_V1_OGC_PROCESS_DESCRIPTION_DOC_URI =
  'https://docs.ogc.org/is/18-062r2/18-062r2.html#req_ogc-process-description_';

const processOgcProcessDescription: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/req/ogc-process-description',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "OGC Process Description"',
  formats: [oas3_0],
  rules: {
    '/req/ogc-process-description/json-encoding': rule.processDescriptionJsonEncoding(
      OGC_API_PROCESSES_V1_OGC_PROCESS_DESCRIPTION_DOC_URI + 'json-encoding',
      `${SCHEMAS_URI_PREFIX}process.yaml`,
    ),
  },
};

export default processOgcProcessDescription;
