import { errorMessage } from '@geonovum/standards-checker';
import { RulesetFunction } from '@geonovum/standards-checker/spectral/core';
import { equals } from 'ramda';
import { getFeatures, isFeature, isFeatureCollection } from './util';

export const hasSingleFeatureSchema: RulesetFunction<unknown> = input => {
  if (!isFeature(input) && !isFeatureCollection(input)) {
    return;
  }

  if (!(input && typeof input === 'object' && 'featureSchema' in input && typeof input.featureSchema === 'string')) {
    return;
  }

  const featureTypes = [input, ...getFeatures(input)]
    .filter((member): member is { featureType: unknown } => !!member && typeof member === 'object' && 'featureType' in member)
    .map(member => member.featureType);

  if (featureTypes.length > 1 && featureTypes.some(featureType => !equals(featureType, featureTypes[0]))) {
    return errorMessage(
      'If the JSON-FG root object is a feature or feature collection with a "featureSchema" member where the value is a string (URI), ' +
        'all "featureType" members in the JSON document SHALL have the same value.',
    );
  }
};
