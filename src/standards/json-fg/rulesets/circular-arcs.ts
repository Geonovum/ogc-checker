import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { schema } from '@geonovum/standards-checker/spectral/functions';
import { GeometryTypes } from '../../types';

export const JSON_FG_CIRCULAR_ARCS_URI = 'http://www.opengis.net/spec/json-fg-1/1.0/conf/circular-arcs';

export const JSON_FG_CIRCULAR_ARCS_DOC_URI = 'https://docs.ogc.org/is/21-045r1/21-045r1.html#circular-arcs_';

const CIRCULAR_ARC_TYPES = [
  GeometryTypes.CIRCULARSTRING,
  GeometryTypes.COMPOUNDCURVE,
  GeometryTypes.CURVEPOLYGON,
  GeometryTypes.MULTICURVE,
  GeometryTypes.MULTISURFACE,
];

const circularArcs: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/json-fg-1/1.0/req/circular-arcs',
  description: 'OGC Features and Geometries JSON - Part 1: Core - Requirements Class "Circular Arcs"',
  rules: {
    '/req/circular-arcs/metadata': {
      given: '$',
      documentationUrl: JSON_FG_CIRCULAR_ARCS_DOC_URI + 'metadata',
      severity: 'error',
      message: `The "conformsTo" member of a JSON-FG root object that contains any of the geometry types "CircularString", "CompoundCurve", "CurvePolygon", "MultiCurve", or "MultiSurface" SHALL include the value "${JSON_FG_CIRCULAR_ARCS_URI}".`,
      then: {
        function: schema,
        functionOptions: {
          schema: {
            if: {
              anyOf: [
                {
                  required: ['type', 'place'],
                  properties: {
                    type: {
                      const: 'Feature',
                    },
                    place: {
                      type: 'object',
                      required: ['type'],
                      properties: {
                        type: {
                          enum: CIRCULAR_ARC_TYPES,
                        },
                      },
                    },
                  },
                },
                {
                  required: ['type'],
                  properties: {
                    type: {
                      const: 'FeatureCollection',
                    },
                    features: {
                      contains: {
                        required: ['place'],
                        properties: {
                          place: {
                            type: 'object',
                            required: ['type'],
                            properties: {
                              type: {
                                enum: CIRCULAR_ARC_TYPES,
                              },
                            },
                          },
                        },
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
                    const: JSON_FG_CIRCULAR_ARCS_URI,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default circularArcs;
