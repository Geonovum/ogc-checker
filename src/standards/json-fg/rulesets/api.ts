import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';

export const JSON_FG_API_URI = 'http://www.opengis.net/spec/json-fg-1/1.0/conf/api';

export const JSON_FG_API_DOC_URI = 'https://docs.ogc.org/is/21-045r1/21-045r1.html#api_';

const api: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/json-fg-1/1.0/req/api',
  description: 'OGC Features and Geometries JSON - Part 1: Core - Requirements Class "JSON-FG in Web APIs"',
  rules: {},
};

export default api;
