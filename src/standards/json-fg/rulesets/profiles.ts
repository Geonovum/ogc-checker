import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';

export const JSON_FG_PROFILES_URI = 'http://www.opengis.net/spec/json-fg-1/1.0/conf/profiles';

export const JSON_FG_PROFILES_DOC_URI = 'https://docs.ogc.org/is/21-045r1/21-045r1.html#profiles_';

const profiles: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/json-fg-1/1.0/req/profiles',
  description: 'OGC Features and Geometries JSON - Part 1: Core - Requirements Class "GeoJSON Profiles"',
  rules: {},
};

export default profiles;
