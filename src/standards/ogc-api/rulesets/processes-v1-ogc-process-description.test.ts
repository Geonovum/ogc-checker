import { OpenLint } from '@geonovum/standards-checker/openlint/core';
import { clone } from 'ramda';
import { describe, expect, test } from 'vitest';
import exampleDoc from '../examples/processes-1.0.json';
import ruleset from './processes-v1-ogc-process-description';

const openLint = new OpenLint();
openLint.setRuleset(ruleset);

describe('/req/ogc-process-description/json-encoding', () => {
  test('Fails when process description has an invalid schema', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.components.schemas.processSummary.allOf[1].properties as Record<string, unknown>).version;
    const violations = await openLint.run(oasDoc);

    expect(violations).toContainViolation('/req/ogc-process-description/json-encoding', 1);
  });
});
