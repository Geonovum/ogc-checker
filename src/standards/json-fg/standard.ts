import type { Standard } from '@geonovum/standards-checker';
import example from './examples/feature.json';
import rulesets from './rulesets';

const sourceLabel = (confClass: string) => confClass.replace('http://www.opengis.net/spec/', '');

export const jsonFgStandard: Standard = {
  name: 'JSON-FG',
  slug: 'json-fg',
  versions: [
    {
      id: '1.0.0',
      label: '1.0.0',
      status: 'final',
      example: JSON.stringify(example, undefined, 2),
      rulesets,
      sourceLabel,
      legacySlug: 'json-fg',
    },
  ],
};
