import { resolveDefaultVersion } from '@geonovum/standards-checker';
import { describe, expect, test } from 'vitest';
import standards from './index';

describe('ogc-api-processes standard', () => {
  const processes = standards.find(standard => standard.slug === 'ogc-api-processes');

  test('exposes the approved 1.0.0 and the 2.0.0 draft', () => {
    expect(processes?.versions.map(version => version.id)).toEqual(['1.0.0', '2.0.0']);
    expect(processes?.versions.map(version => version.status)).toEqual(['final', 'draft']);
  });

  test('defaults to the approved version', () => {
    expect(resolveDefaultVersion(processes!).id).toBe('1.0.0');
  });

  test('binds each version to its own conformance classes', () => {
    for (const version of processes?.versions ?? []) {
      // Conformance class URIs carry the two-part version, e.g. `.../ogcapi-processes-1/1.0/conf/core`.
      const [major, minor] = version.id.split('.');
      const confClasses = Object.keys(version.rulesets);

      expect(confClasses.length).toBeGreaterThan(0);
      confClasses.forEach(confClass => expect(confClass).toContain(`/ogcapi-processes-1/${major}.${minor}/conf/`));
    }
  });

  test('ships an example per version', () => {
    const examples = processes?.versions.map(version => version.example) ?? [];

    expect(new Set(examples).size).toBe(examples.length);
    examples.forEach(example => expect(JSON.parse(example).openapi).toMatch(/^3\.0\./));
  });
});
