import { createProgram } from '@mdxvac/mdx-utils';
import type { ObjectExpression } from 'estree';
import type { Root } from 'mdast';
import { findComponentsExport } from './findComponentsExport';

export function mergeMappings(root: Root, files: string[]) {
  const imports = files.map((f, i) => `import { components as _ac${i} } from '${f}';`).join('\n');
  root.children.push(createProgram(imports));

  const found = findComponentsExport(root);
  if (found) {
    const init = found.init! as ObjectExpression;
    for (let i = 0; i < files.length; i++) {
      init.properties = [
        { type: 'SpreadElement', argument: { type: 'Identifier', name: `_ac${i}` } },
        ...init.properties,
      ];
    }
  } else {
    const src = `export const components = {${files.map((_, i) => `..._ac${i}`).join(',')}};`;
    root.children.push(createProgram(src));
  }
}
