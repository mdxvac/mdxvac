import { describe, expect, test } from 'vitest';
import { mergeComponents } from './mergeComponents';

describe('mergeMapping', function () {
  test('no existing mapping', function () {
    const src = `export const theEnd = 'The End';`;
    const file = '/foo/bar/_mdx-mapping.ts';
    const actual = mergeComponents(src, [file]);
    const expected = `
export { components } from '/foo/bar/_mdx-mapping.ts';
export const theEnd = 'The End';`;
    expect(actual).toBe(expected);
  });
  test('existing mapping', function () {
    const src = `import Card from '../../components/Card.astro';
export const components = { h1: Title };`;
    const file = '/foo/bar/_mdx-mapping.ts';
    const actual = mergeComponents(src, [file]);
    const expected = `
import Card from '../../components/Card.astro';

import { components as _injected_components } from '/foo/bar/_mdx-mapping.ts';
export const components = {
  ..._injected_components, h1: Title };`;
    expect(actual).toBe(expected);
  });
  test('strange formatting', function () {
    const src = `import Card from '../../components/Card.astro';
export const components = {
h1: Title,h2:Headline
,h3                :             Foo};`;
    const file = '/foo/bar/_mdx-mapping.ts';
    const actual = mergeComponents(src, [file]);
    const expected = `
import Card from '../../components/Card.astro';

import { components as _injected_components } from '/foo/bar/_mdx-mapping.ts';
export const components = {
  ..._injected_components,
h1: Title,h2:Headline
,h3                :             Foo};`;
    expect(actual).toBe(expected);
  });

  test('multiple mappings', function () {
    const src = `import Card from '../../components/Card.astro';
export const components = { h1: Title };`;
    const file0 = '/_mdx-mapping.ts';
    const file1 = '/foo/_mdx-mapping.ts';
    const file2 = '/foo/bar/_mdx-mapping.ts';
    const actual = mergeComponents(src, [file0, file1, file2]);
    const expected = `
import Card from '../../components/Card.astro';

import { components as _injected_components_0 } from '/_mdx-mapping.ts';
import { components as _injected_components_1 } from '/foo/_mdx-mapping.ts';
import { components as _injected_components_2 } from '/foo/bar/_mdx-mapping.ts';
export const components = {
  ..._injected_components_0,
  ..._injected_components_1,
  ..._injected_components_2, h1: Title };`;
    expect(actual).toBe(expected);
  });
});
