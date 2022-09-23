import { isVariableDeclarator } from '@mdxvac/esm-utils';
import { isMdxjsEsm } from '@mdxvac/mdx-utils';
import type { Identifier, Program, VariableDeclaration, VariableDeclarator } from 'estree';
import { EXIT as esEXIT, visit as esVisit } from 'estree-util-visit';
import type { Root } from 'mdast';
import { EXIT, visit } from 'unist-util-visit';

export function findComponentsExport(root: Root): VariableDeclarator | undefined {
  let found: VariableDeclarator | undefined = undefined;
  visit(root, (node) => {
    if (isMdxjsEsm(node)) {
      if ((found = findInProgram(node.data!.estree!))) {
        return EXIT;
      }
    }
  });
  return found;
}

function findInProgram(program: Program): VariableDeclarator | undefined {
  let found: VariableDeclarator | undefined = undefined;
  esVisit(program, (n, key, index, ancestors) => {
    if (isVariableDeclarator(n)) {
      const name = (n.id as Identifier).name;
      const declaration = ancestors[ancestors.length - 1] as VariableDeclaration;
      if (name === 'components' && declaration.kind === 'const') {
        found = n;
        return esEXIT;
      }
    }
  });
  return found;
}
