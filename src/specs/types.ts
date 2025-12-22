export enum GeometryTypes {
  POINT = 'Point',
  MULTIPOINT = 'MultiPoint',
  LINESTRING = 'LineString',
  MULTILINESTRING = 'MultiLineString',
  POLYGON = 'Polygon',
  MULTIPOLYGON = 'MultiPolygon',
  GEOMETRYCOLLECTION = 'GeometryCollection',
  POLYHEDRON = 'Polyhedron',
  MULTIPOLYHEDRON = 'MultiPolyhedron',
  PRISM = 'Prism',
  MULTIPRISM = 'MultiPrism',
  CIRCULARSTRING = 'CircularString',
  COMPOUNDCURVE = 'CompoundCurve',
  CURVEPOLYGON = 'CurvePolygon',
  MULTICURVE = 'MultiCurve',
  MULTISURFACE = 'MultiSurface',
}

export enum DocumentTypes {
  FEATURE = 'Feature',
  FEATURECOLLECTION = 'FeatureCollection',
}
export const GEOJSON_TYPES = [
  GeometryTypes.POINT,
  GeometryTypes.MULTIPOINT,
  GeometryTypes.LINESTRING,
  GeometryTypes.MULTILINESTRING,
  GeometryTypes.POLYGON,
  GeometryTypes.MULTIPOLYGON,
];

export type Position2D = [number, number];

export type Position3D = [number, number, number];

export type Position = Position2D | Position3D;

export type Coordinates = Position | Coordinates[];