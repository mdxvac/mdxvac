import { findUpAll } from '@mdxvac/fs-utils';
import type { Root } from 'mdast';
import { join } from 'path';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';
import { findUnresolved } from './findUnresolved';
import { autoImport, JsxExports } from './JsxExports';

const DEFAULT_NAME = '_autoimports.ts';

/**
 * Options for plugin remark-astro-autoimports, for details see
 * https://mdxvac.netlify.app/plugins/remark-astro-autoimports
 */
export type Options = Partial<{
  /**
   * Name for auto-import files.
   *
   * - name, to find files with `name` up the directory tree
   * - default: `_autoimports.ts`
   *
   * These files should be simple JavaScript/ESM files (i.e. ES >=6).
   */
  name: string;
}>;

/**
 * Auto-import JSX components by scanning the directory up.
 *
 * @param options For configuration options, see https://mdxvac.netlify.app/plugins/remark-astro-autoimports
 * @returns transformer function
 */
export const plugin: Plugin<[Options], unknown> = (options = {}) => {
  const { name: fileName = DEFAULT_NAME } = options;

  return async function transformer(root: Root, file: VFile) {
    const dir = file.dirname;
    if (!dir) return;

    const unresolved = findUnresolved(root);
    if (unresolved.length === 0) return;

    const stop = join(file.cwd, 'src');
    const files = await findUpAll(fileName, dir, stop);
    if (files.length === 0) return;

    const jsxExports = new JsxExports(files.reverse());
    //                                      ^^^
    // We want the JSX exports in reverse order, i.e. bottom-up

    const appliedAutoImports: string[] = [];
    await Promise.all(
      unresolved.map(async (u) => {
        const jsxExport = await jsxExports.find(u.name);
        if (jsxExport) {
          u.name = `${jsxExport.as}.${u.name}`;
          if (!appliedAutoImports.includes(jsxExport.as)) {
            appliedAutoImports.push(jsxExport.as);
            root.children.push(autoImport(jsxExport));
          }
        }
        return;
      })
    );
  };
};

export default plugin;
