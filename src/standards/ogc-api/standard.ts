import {
  APPLICATION_JSON_TYPE,
  APPLICATION_OPENAPI_JSON_3_0_TYPE,
  handleResponse,
  handleResponseJson,
  type Standard,
  type VersionResponseMapper,
} from '@geonovum/standards-checker';
import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
// Examples are imported as raw text (`?raw`) and appear verbatim in the editor.
import featuresExample from './examples/features.json?raw';
import processesExample from './examples/processes.json?raw';
import recordsExample from './examples/records.json?raw';
import rulesets from './rulesets';

const sourceLabel = (confClass: string) => confClass.replace('http://www.opengis.net/spec/', '');

export const ogcapiFeatures = 'http://www.opengis.net/spec/ogcapi-features-';
export const ogcApiProcesses = 'http://www.opengis.net/spec/ogcapi-processes-';
export const ogcApiRecords = 'http://www.opengis.net/spec/ogcapi-records-';

const subsetByPrefix = (prefix: string): Record<string, RulesetDefinition> =>
  Object.fromEntries(Object.entries(rulesets).filter(([uri]) => uri.startsWith(prefix)));

// Follows an OGC API landing page to its OpenAPI service-desc and conformance
// declaration, then keeps the rulesets whose conformance class this version
// covers.
const responseMapper =
  (versionRulesets: Record<string, RulesetDefinition>): VersionResponseMapper =>
  async responseText => {
    let document;

    try {
      document = JSON.parse(responseText);
    } catch {
      return { content: responseText };
    }

    const links = document.links;

    if (Array.isArray(links)) {
      const serviceDescLink = links.find(link => link.rel === 'service-desc' && link.type === APPLICATION_OPENAPI_JSON_3_0_TYPE);

      const conformanceLink = links.find(link => link.rel === 'conformance');

      if (serviceDescLink) {
        const content = await fetch(serviceDescLink.href, {
          headers: { Accept: serviceDescLink.type },
        }).then(response => handleResponse(response, serviceDescLink.href));

        const matched: Record<string, RulesetDefinition> = {};

        if (conformanceLink) {
          const conformance = await fetch(conformanceLink.href, {
            headers: { Accept: APPLICATION_JSON_TYPE },
          }).then(response => handleResponseJson(response, conformanceLink.href));

          const conformsTo = conformance.conformsTo;

          if (Array.isArray(conformsTo)) {
            conformsTo.forEach(reqClass => {
              if (typeof reqClass === 'string' && versionRulesets[reqClass]) {
                matched[reqClass] = versionRulesets[reqClass];
              }
            });
          }
        }

        return { content, rulesets: matched };
      }
    }

    return { content: responseText };
  };

const featuresRulesets = subsetByPrefix(ogcapiFeatures);
const processesRulesets = subsetByPrefix(ogcApiProcesses);
const recordsRulesets = subsetByPrefix(ogcApiRecords);

export const ogcApiFeaturesStandard: Standard = {
  name: 'OGC API - Features',
  slug: 'ogc-api-features',
  versions: [
    {
      id: '1.0.1',
      label: '1.0.1',
      status: 'final',
      example: featuresExample,
      rulesets: featuresRulesets,
      sourceLabel,
      responseMapper: responseMapper(featuresRulesets),
      legacySlug: 'ogc-api-features',
    },
  ],
};

export const ogcApiProcessesStandard: Standard = {
  name: 'OGC API - Processes',
  slug: 'ogc-api-processes',
  versions: [
    {
      id: '2.0.0',
      label: '2.0.0',
      status: 'draft',
      example: processesExample,
      rulesets: processesRulesets,
      sourceLabel,
      responseMapper: responseMapper(processesRulesets),
      legacySlug: 'ogc-api-processes',
    },
  ],
};

export const ogcApiRecordsStandard: Standard = {
  name: 'OGC API - Records',
  slug: 'ogc-api-records',
  versions: [
    {
      id: '1.0.0',
      label: '1.0.0',
      status: 'final',
      example: recordsExample,
      rulesets: recordsRulesets,
      sourceLabel,
      responseMapper: responseMapper(recordsRulesets),
      legacySlug: 'ogc-api-records',
    },
  ],
};
