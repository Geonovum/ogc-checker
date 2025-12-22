import { RulesetFunction } from '@stoplight/spectral-core';
import { errorMessage } from '@geonovum/standards-checker/engine/util';
import { isValidCoordinateArray, getDimensions } from './util';
import { Coordinates } from '../../types';

export const hasSameDimensions: RulesetFunction<unknown> = input => {
  if (!(input && typeof input === 'object') || !('coordinates' in input && isValidCoordinateArray(input.coordinates))) {
    return;
  }

  const dimensions = getDimensions(input.coordinates as Coordinates);

  if (dimensions.some(dimension => dimension !== dimensions[0])) {
    return errorMessage('All positions in a geometry object SHALL have the same dimension.');
  }
};