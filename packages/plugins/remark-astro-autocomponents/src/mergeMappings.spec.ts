import { MdxjsEsm, parseMdx } from '@mdxvac/mdx-utils';
import { describe, expect, test } from 'vitest';
import { findComponentsExport } from './findComponentsExport';
import { mergeMappings } from './mergeMappings';

describe('mergeMappings', function () {
  test('single file, no existing components', function () {
    const input = parseMdx(`
# My Title

Some text.
`);
    mergeMappings(input, ['_foo.ts']);
    expect(input.children.length).toBe(3);
    expect((input.children[2] as MdxjsEsm).value).toBe(
      `import { components as _ac0 } from '_foo.ts';
export const components = {..._ac0};`
    );
  });

  test('multiple files, no existing components', function () {
    const input = parseMdx(`
# My Title

Some text.
`);
    mergeMappings(input, ['_foo.ts', '_bar.ts', '_baz.ts']);
    expect(input.children.length).toBe(3);
    expect((input.children[2] as MdxjsEsm).value).toBe(
      `import { components as _ac0 } from '_foo.ts';
import { components as _ac1 } from '_bar.ts';
import { components as _ac2 } from '_baz.ts';
export const components = {..._ac0,..._ac1,..._ac2};`
    );
  });

  test.only('single file, existing components', function () {
    const input = parseMdx(`
# My Title

Some text.

import Title from "../../Title.astro";
export const components = {
  h1: Title,
  h2: H2,
}
`);
    mergeMappings(input, ['_foo.ts']);
    expect(input.children.length).toBe(4);
    expect((input.children[3] as MdxjsEsm).value).toBe(
      `import { components as _ac0 } from '_foo.ts';`
    );
    const decl = findComponentsExport(input);
    console.log(decl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const init = decl!.init! as any;
    expect(init.properties.length).toBe(3);
    // Make sure the spread elements are added first.
    expect(init.properties[0].type).toBe('SpreadElement');
  });
});
