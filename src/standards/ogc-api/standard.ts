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
import processesV1Example from './examples/processes-1.0.json?raw';
import processesV2Example from './examples/processes-2.0.json?raw';
import recordsExample from './examples/records.json?raw';
import { featuresRulesets, processesV1Rulesets, processesV2Rulesets, recordsRulesets } from './rulesets';

const sourceLabel = (confClass: string) => confClass.replace('http://www.opengis.net/spec/', '');

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
      id: '1.0.0',
      label: '1.0.0',
      status: 'final',
      example: processesV1Example,
      rulesets: processesV1Rulesets,
      sourceLabel,
      responseMapper: responseMapper(processesV1Rulesets),
      // The bare slug used to select the (then only) 2.0 draft; it now resolves
      // to the standard's default, which is the approved 1.0.
      legacySlug: 'ogc-api-processes',
    },
    {
      id: '2.0.0',
      label: '2.0.0',
      status: 'draft',
      example: processesV2Example,
      rulesets: processesV2Rulesets,
      sourceLabel,
      responseMapper: responseMapper(processesV2Rulesets),
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
