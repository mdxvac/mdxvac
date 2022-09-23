import { findUpAll } from '@mdxvac/fs-utils';
import type { Root } from 'mdast';
import { join } from 'path';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';
import { mergeMappings } from './mergeMappings';

const DEFAULT_NAME = '_components.ts';

/**
 * Options for plugin remark-astro-autocomponents, for details see
 * https://mdxvac.netlify.app/plugins/remark-astro-autocomponents
 */
export type Options = Partial<{
  /**
   * Name for component mapping files.
   *
   * - name, to find files with `name` up the directory tree
   * - default: `_components.ts`
   *
   * These files should be simple JavaScript/ESM files (i.e. ES >=6).
   */
  name: string;
}>;

/**
 * Auto-map HTML elements to JSX components by scanning the directory up.
 *
 * @param options For configuration options, see https://mdxvac.netlify.app/plugins/remark-astro-autocomponents
 * @returns transformer function
 */
export const plugin: Plugin<[Options], unknown> = (options = {}) => {
  const { name: fileName = DEFAULT_NAME } = options;

  return async function transformer(root: Root, file: VFile) {
    const dir = file.dirname;
    if (!dir) return;

    const stop = join(file.cwd, 'src');
    const files = await findUpAll(fileName, dir, stop);
    if (files.length === 0) return;
    mergeMappings(root, files);
  };
};

export default plugin;
