import { parseMdx } from '@mdxvac/mdx-utils';
import { describe, expect, test } from 'vitest';
import { findComponentsExport } from './findComponentsExport';

describe('findComponentsExport', function () {
  test('no components', function () {
    const input = parseMdx(`
# My Title

`);
    const found = findComponentsExport(input);
    expect(found).toBe(undefined);
  });

  test('exported components', function () {
    const input = parseMdx(`
export const components = {
  h1: Title
};

# My Title

`);
    const found = findComponentsExport(input);
    expect(!!found).toBe(true);
  });
});
