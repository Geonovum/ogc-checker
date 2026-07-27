import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';
import * as rule from './processes-rules';

export const OGC_API_PROCESSES_V1_JSON_URI = 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/conf/json';

export const OGC_API_PROCESSES_V1_JSON_DOC_URI = 'https://docs.ogc.org/is/18-062r2/18-062r2.html#req_json_';

const processesJson: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/req/json',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "JSON"',
  formats: [oas3_0],
  rules: {
    '/req/json/definition': rule.jsonDefinition(OGC_API_PROCESSES_V1_JSON_DOC_URI + 'definition'),
  },
};

export default processesJson;
