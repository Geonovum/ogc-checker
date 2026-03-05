import { Spec, spectralLinter } from '@geonovum/standards-checker-ui';
import example from './examples/feature.json';
import rulesets from './rulesets';
import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';

const linterName = (confClass: string) => confClass.replace('http://www.opengis.net/spec/', '');

export const jsonFgSpec: Spec = {
  name: 'JSON-FG',
  slug: 'json-fg',
  example: JSON.stringify(example, undefined, 2),
  linters: Object.entries(rulesets).map(entry => ({
    name: linterName(entry[0]),
    linter: spectralLinter(linterName(entry[0]), entry[1] as RulesetDefinition),
  })),
};
