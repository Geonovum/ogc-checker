import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { schema } from '@geonovum/standards-checker/spectral/functions';
import { hasSingleFeatureSchema } from '../functions/hasSingleFeatureSchema';
import { isValidGeometryDimension } from '../functions/isValidGeometryDimension';
import { remoteSchema } from '@geonovum/standards-checker';

export const JSON_FG_TYPES_SCHEMAS_URI = 'http://www.opengis.net/spec/json-fg-1/1.0/conf/types-schemas';

export const JSON_FG_TYPES_SCHEMAS_DOC_URI = 'https://docs.ogc.org/is/21-045r1/21-045r1.html#types-schemas_';

const typesSchemas: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/json-fg-1/1.0/req/types-schemas',
  description: 'OGC Features and Geometries JSON - Part 1: Core - Requirements Class "Feature Types and Schemas"',
  rules: {
    '/req/types-schemas/metadata': {
      given: '$',
      documentationUrl: JSON_FG_TYPES_SCHEMAS_DOC_URI + 'metadata',
      severity: 'error',
      message: `The "conformsTo" member of a JSON-FG root object that contains a "featureType" or "featureSchema" member (on the root object or any feature) SHALL include the value "${JSON_FG_TYPES_SCHEMAS_URI}".`,
      then: {
        function: schema,
        functionOptions: {
          schema: {
            if: {
              anyOf: [
                { required: ['featureType'] },
                { required: ['featureSchema'] },
                {
                  // `required: ['features']` is essential: without it `properties` is vacuously
                  // satisfied when `features` is absent (e.g. a standalone geometry root object),
                  // which would make this branch — and thus the whole `if` — match every document.
                  required: ['features'],
                  properties: {
                    features: {
                      contains: {
                        anyOf: [{ required: ['featureType'] }, { required: ['featureSchema'] }],
                      },
                    },
                  },
                },
              ],
            },
            then: {
              properties: {
                conformsTo: {
                  contains: {
                    const: JSON_FG_TYPES_SCHEMAS_URI,
                  },
                },
              },
            },
          },
        },
      },
    },
    '/req/types-schemas/feature-type': {
      given: '$',
      documentationUrl: JSON_FG_TYPES_SCHEMAS_DOC_URI + 'feature-type',
      severity: 'error',
      then: {
        function: remoteSchema,
        functionOptions: {
          // The "Feature Types and Schemas" requirements only constrain features. Gate the
          // discriminated schema behind an `if` on the root `type` so a standalone geometry root
          // object (e.g. type "MultiCurve") is ignored rather than failing the Feature/
          // FeatureCollection discriminator.
          schema: {
            if: {
              required: ['type'],
              properties: {
                type: { enum: ['Feature', 'FeatureCollection'] },
              },
            },
            then: {
              type: 'object',
              discriminator: { propertyName: 'type' },
              oneOf: [
                {
                  required: ['type', 'featureType'],
                  properties: {
                    type: {
                      const: 'Feature',
                    },
                  },
                },
                {
                  required: ['type'],
                  properties: {
                    type: {
                      const: 'FeatureCollection',
                    },
                  },
                  oneOf: [
                    { required: ['featureType'] },
                    {
                      properties: {
                        features: {
                          type: 'array',
                          items: {
                            type: 'object',
                            required: ['featureType'],
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    '/req/types-schemas/geometry-dimension': {
      given: '$',
      documentationUrl: JSON_FG_TYPES_SCHEMAS_DOC_URI + 'geometry-dimension',
      severity: 'error',
      then: {
        function: isValidGeometryDimension,
      },
    },
    '/req/types-schemas/single-feature-schema': {
      given: '$',
      documentationUrl: JSON_FG_TYPES_SCHEMAS_DOC_URI + 'single-feature-schema',
      severity: 'error',
      then: {
        function: hasSingleFeatureSchema,
      },
    },
  },
};

export default typesSchemas;
