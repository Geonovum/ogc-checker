import { Spectral } from '@geonovum/standards-checker/spectral/core';
import { omit, reject } from 'ramda';
import { describe, expect, test } from 'vitest';
import featureCollectionDoc from '../examples/feature-collection.json';
import featureDoc from '../examples/feature.json';
import ruleset, { JSON_FG_TYPES_SCHEMAS_URI } from './types-schemas';
import { GeometryTypes } from '../../types';

const spectral = new Spectral();
spectral.setRuleset(ruleset);

describe('/req/types-schemas/metadata', () => {
  test('Fails when a feature contains a "featureType" member and does not include the Feature Types and Schemas conformance class', async () => {
    const violations = await spectral.run({
      ...omit(['featureSchema'], featureDoc),
      conformsTo: reject(c => c === JSON_FG_TYPES_SCHEMAS_URI, featureDoc.conformsTo),
    });

    expect(violations).toContainViolation('/req/types-schemas/metadata');
  });

  test('Fails when a feature contains a "featureSchema" member and does not include the Feature Types and Schemas conformance class', async () => {
    const violations = await spectral.run({
      ...omit(['featureType'], featureDoc),
      conformsTo: reject(c => c === JSON_FG_TYPES_SCHEMAS_URI, featureDoc.conformsTo),
    });

    expect(violations).toContainViolation('/req/types-schemas/metadata');
  });

  test('Fails when a feature collection contains a "featureType" member and does not include the Feature Types and Schemas conformance class', async () => {
    const violations = await spectral.run({
      ...omit(['featureSchema'], featureCollectionDoc),
      conformsTo: reject(c => c === JSON_FG_TYPES_SCHEMAS_URI, featureDoc.conformsTo),
    });

    expect(violations).toContainViolation('/req/types-schemas/metadata');
  });

  test('Fails when a feature collection contains a "featureSchema" member and does not include the Feature Types and Schemas conformance class', async () => {
    const violations = await spectral.run({
      ...omit(['featureType'], featureCollectionDoc),
      conformsTo: reject(c => c === JSON_FG_TYPES_SCHEMAS_URI, featureDoc.conformsTo),
    });

    expect(violations).toContainViolation('/req/types-schemas/metadata');
  });

  test('Fails when a feature collection member contains a "featureType" member and does not include the Feature Types and Schemas conformance class', async () => {
    const violations = await spectral.run({
      ...omit(['featureType', 'featureSchema'], featureCollectionDoc),
      conformsTo: reject(c => c === JSON_FG_TYPES_SCHEMAS_URI, featureDoc.conformsTo),
      features: [
        {
          ...featureCollectionDoc.features[0],
          featureType: featureCollectionDoc.featureType,
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/metadata');
  });

  test('Fails when a feature collection member contains a "featureSchema" member and does not include the Feature Types and Schemas conformance class', async () => {
    const violations = await spectral.run({
      ...omit(['featureType', 'featureSchema'], featureCollectionDoc),
      conformsTo: reject(c => c === JSON_FG_TYPES_SCHEMAS_URI, featureDoc.conformsTo),
      features: [
        {
          ...featureCollectionDoc.features[0],
          featureSchema: featureCollectionDoc.featureSchema,
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/metadata');
  });
});

describe('/req/types-schemas/feature-type', () => {
  test('Fails when a feature conforms to the Feature Types and Schemas conformance class and does not contain a "featureType" member', async () => {
    const violations = await spectral.run({
      ...omit(['featureType', 'featureSchema'], featureDoc),
    });

    expect(violations).toContainViolation('/req/types-schemas/feature-type');
  });

  test('Succeeds when a feature collection contains a "featureType" member', async () => {
    const violations = await spectral.run({
      ...omit(['featureSchema'], featureCollectionDoc),
    });

    expect(violations).toHaveLength(0);
  });

  test('Succeeds when a feature collection contains a "featureType" member in every individual feature', async () => {
    const violations = await spectral.run({
      ...omit(['featureType', 'featureSchema'], featureCollectionDoc),
      features: [
        {
          ...featureCollectionDoc.features[0],
          featureType: 'Building',
        },
        {
          ...featureCollectionDoc.features[1],
          featureType: 'Building',
        },
      ],
    });

    expect(violations).toHaveLength(0);
  });

  test('Fails when both a feature collection and individual features contain a "featureType" member', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      features: [
        {
          ...featureCollectionDoc.features[0],
          featureType: 'Building',
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/feature-type');
  });

  test('Fails when not every individual feature contains a "featureType" member', async () => {
    const violations = await spectral.run({
      ...omit(['featureType', 'featureSchema'], featureCollectionDoc),
      features: [
        {
          ...featureCollectionDoc.features[0],
          featureType: 'Building',
        },
        {
          ...featureCollectionDoc.features[1],
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/feature-type', 3);
  });
});

describe('/req/types-schemas/geometry-dimension', () => {
  test('Succeeds when a feature collection with "geometryDimension" 0 contains valid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 0,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POINT,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.MULTIPOINT,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toHaveLength(0);
  });

  test('Fails when a feature collection with "geometryDimension" 0 contains invalid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 0,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POLYGON,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/geometry-dimension');
  });

  test('Succeeds when a feature collection with "geometryDimension" 1 contains valid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 1,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.LINESTRING,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[1],
          place: {
            type: GeometryTypes.CIRCULARSTRING,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[1],
          place: {
            type: GeometryTypes.COMPOUNDCURVE,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[1],
          place: {
            type: GeometryTypes.MULTICURVE,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toHaveLength(0);
  });

  test('Fails when a feature collection with "geometryDimension" 1 contains invalid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 1,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POINT,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/geometry-dimension');
  });

  test('Succeeds when a feature collection with "geometryDimension" 2 contains valid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 2,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POLYGON,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[1],
          place: {
            type: GeometryTypes.MULTIPOLYGON,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toHaveLength(0);
  });

  test('Fails when a feature collection with "geometryDimension" 2 contains invalid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 2,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POINT,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/geometry-dimension');
  });

  test('Succeeds when a feature collection with "geometryDimension" 3 contains valid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 3,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POLYHEDRON,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[1],
          place: {
            type: GeometryTypes.MULTIPOLYHEDRON,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[2],
          place: {
            type: GeometryTypes.PRISM,
            coordinates: [],
          },
        },
        {
          ...featureCollectionDoc.features[3],
          place: {
            type: GeometryTypes.MULTIPRISM,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toHaveLength(0);
  });

  test('Fails when a feature collection with "geometryDimension" 3 contains invalid geometry types', async () => {
    const violations = await spectral.run({
      ...featureCollectionDoc,
      geometryDimension: 3,
      features: [
        {
          ...featureCollectionDoc.features[0],
          place: {
            type: GeometryTypes.POINT,
            coordinates: [],
          },
        },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/geometry-dimension');
  });
});

describe('/req/types-schemas/single-feature-schema', () => {
  test('Succeeds when "featureSchema" is a string and all "featureType" members are equal', async () => {
    const violations = await spectral.run({
      ...omit(['featureType'], featureCollectionDoc),
      features: featureCollectionDoc.features.map(feature => ({ ...feature, featureType: 'Airport' })),
    });

    expect(violations).toHaveLength(0);
  });

  test('Fails when "featureSchema" is a string and "featureType" members differ', async () => {
    const violations = await spectral.run({
      ...omit(['featureType'], featureCollectionDoc),
      features: [
        { ...featureCollectionDoc.features[0], featureType: 'Airport' },
        { ...featureCollectionDoc.features[1], featureType: 'Airfield' },
      ],
    });

    expect(violations).toContainViolation('/req/types-schemas/single-feature-schema');
  });

  test('Succeeds when "featureType" members differ but "featureSchema" is not a string', async () => {
    const violations = await spectral.run({
      ...omit(['featureType'], featureCollectionDoc),
      featureSchema: {
        Airport: 'https://example.org/data/v1/collections/airports/schema',
        Airfield: 'https://example.org/data/v1/collections/airfields/schema',
      },
      features: [
        { ...featureCollectionDoc.features[0], featureType: 'Airport' },
        { ...featureCollectionDoc.features[1], featureType: 'Airfield' },
      ],
    });

    expect(violations).toHaveLength(0);
  });
});

describe('standalone geometry root object', () => {
  // A JSON-FG document may be a bare geometry object (the spec's circular-arcs example).
  // The "Feature Types and Schemas" requirements only constrain features, so none of these
  // rules must fire: `/req/types-schemas/metadata` must not treat a missing `features` member
  // as vacuously matching, and `/req/types-schemas/feature-type` must not run its
  // Feature/FeatureCollection discriminator against a geometry `type`.
  test('Produces no violations for a "MultiCurve" geometry root object', async () => {
    const violations = await spectral.run({
      conformsTo: ['http://www.opengis.net/spec/json-fg-1/1.0/conf/core', 'http://www.opengis.net/spec/json-fg-1/1.0/conf/circular-arcs'],
      coordRefSys: 'http://www.opengis.net/def/crs/OGC/0/CRS84',
      type: 'MultiCurve',
      geometries: [
        {
          type: 'CircularString',
          coordinates: [
            [4.5342436, 51.5876522],
            [4.5342459, 51.5876527],
            [4.534248, 51.5876533],
          ],
        },
        {
          type: 'CompoundCurve',
          geometries: [
            {
              type: 'LineString',
              coordinates: [
                [4.5343077, 51.5877972],
                [4.5342909, 51.5878242],
              ],
            },
            {
              type: 'CircularString',
              coordinates: [
                [4.5342863, 51.5878494],
                [4.5342756, 51.5878582],
                [4.5342598, 51.5878633],
              ],
            },
          ],
        },
      ],
    });

    expect(violations).toHaveLength(0);
  });
});
