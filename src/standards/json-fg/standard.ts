import type { Standard } from '@geonovum/standards-checker';
// The example is imported as raw text (`?raw`) and appears verbatim in the editor.
import example from './examples/feature.json?raw';
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
      example,
      rulesets,
      sourceLabel,
      legacySlug: 'json-fg',
    },
  ],
};
