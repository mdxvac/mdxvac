import { findUp } from '@mdxvac/fs-utils';
import { MemCache } from '@mdxvac/mem-cache';
import type { VFile } from '@mdxvac/vfile-astro';
import { readFileSync } from 'fs';
import type { Content, Root } from 'mdast';
import { join } from 'path';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const DEFAULT_NAME = '_autoimports.ts';
export interface Options {
  name: string;
}

/**
 * Plugin
 * @param options
 * @returns transformer function
 */
export const plugin: Plugin<[Partial<Options>], unknown> = (options = {}) => {
  const { name = DEFAULT_NAME } = options;
  async function getAutoImports(dir: string, stop: string) {
    const file = await findUp(name, dir, stop);
    if (!file) return undefined;
    const components = readComponents(file);
    return { file, components };
  }

  return async function transformer(root: Root, file: VFile) {
    const dir = file.dirname;
    if (!dir) return;

    const stop = join(file.cwd, 'src');
    const autoImport = await getAutoImports(dir, stop);
    if (!autoImport) return;

    const imports = findAllImports(root);
    let applied = false;
    visit(root, 'mdxJsxFlowElement', (node: Node) => {
      if (!imports.includes(node.name) && autoImport!.components.includes(node.name)) {
        node.name = `AutoImport.${node.name}`;
        applied = true;
      }
    });
    if (applied) {
      root.children.push(createImport(autoImport.file) as Content);
    }
  };
};

interface Node {
  name: string;
  value: string;
}

const IMPORT = /import\s+(\w+)\s+from/g;
function findAllImports(root: Root) {
  const result: string[] = [];
  visit(root, 'mdxjsEsm', (node: Node) => {
    const imports = [...node.value.matchAll(IMPORT)].map((match) => match[1]);
    result.push(...imports);
  });
  return result;
}

// TODO: Minimize to what is really needed for downstream transformations
export function createImport(file: string) {
  const name = 'AutoImport';
  return {
    type: 'mdxjsEsm',
    value: `import ${name} from "${file}";`,
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: name,
                },
              },
            ],
            source: {
              type: 'Literal',
              value: file,
              raw: `"${file}"`,
            },
          },
        ],
        sourceType: 'module',
        comments: [],
      },
    },
  };
}

const NO_MATCH = ['', undefined];
const DEFAULT_EXPORT = /export\s+default\s+(\w+)\s*;/;
function readComponents(file: string) {
  const src = readFileSync(file, 'utf8');
  const defaultExport = (src.match(DEFAULT_EXPORT) ?? NO_MATCH)[1];
  if (defaultExport) {
    const DECLARATION = new RegExp(`const\\s+${defaultExport}\\s*=\\s*{([\\s\\w,]*)}`);
    const declaration = (src.match(DECLARATION) ?? NO_MATCH)[1];
    if (declaration) {
      const result = declaration
        .split(',')
        .filter((s) => !!s)
        .map((s) => s.trim());
      return result;
    }
  }
  return [];
}

export default plugin;
