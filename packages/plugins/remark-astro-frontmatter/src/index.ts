import { deepMerge } from '@mdxvac/deep-merge';
import type { VFile } from '@mdxvac/vfile-astro';
import { join } from 'path';
import type { Plugin } from 'unified';
import { getFrontmatters } from './frontmatters';

const DEFAULT_NAME = '_frontmatter.yaml';

/**
 * Options for plugin remark-astro-auto-layout
 *
 * Use in astro.config.mjs like
 *
 * ```
 * markdown: {
 *     remarkPlugins: [[mdxMapping, {name: "_map-this.ts"}]],
 *     ...
 */
export interface Options {
  /**
   * Name of Astro layout files to detect in the directory of the MDX-page.
   *
   * The default is '_components.ts'
   */
  name: string;
  /**
   * Flag to enable cache for file system access, use only when doing SSG in prod
   */
  enableCache?: boolean;
}

/**
 * Plugin
 * @param options
 * @returns transformer function
 */
export const plugin: Plugin<[Partial<Options>], unknown> = (options = {}) => {
  const { name = DEFAULT_NAME, enableCache = false } = options;

  return async function transformer(_: unknown, file: VFile) {
    const dir = file.dirname;
    if (!dir) return;

    const stop = join(file.cwd, 'src');

    const frontmatter = await getFrontmatters(name, dir, stop, enableCache);
    if (frontmatter) {
      file.data.astro.frontmatter = deepMerge(file.data.astro.frontmatter, frontmatter);
    }
  };
};

export default plugin;
