import { fsUtils } from '@mdxvac/fs-utils';
import { dirname, join } from 'path';
import type { Plugin } from 'unified';
import { mergeComponents } from './mergeComponents';

const DEFAULT_NAME = '_components.ts';

/**
 * Options for plugin remark-astro-auto-layout
 *
 * Use in astro.config.mjs like
 *
 * ```
 * vite: {
 *     plugins: [mdxComponents({name: "_map-this.ts"})],
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
 * @param options optional `name` property for the layout file
 * @returns Vite plugin
 */
export const plugin: Plugin<[Partial<Options>], unknown> = (options = {}) => {
  const { name = DEFAULT_NAME, enableCache = false } = options;
  const fs = enableCache ? fsUtils.cached : fsUtils;

  const stop = join(process.cwd(), 'src');
  return {
    name: 'vite-astro-mdxcomponents',
    enforce: 'post',

    async transform(src: string, id: string) {
      if (id.endsWith('.mdx')) {
        const mappings = await fs.findUpAll(name, dirname(id), stop);
        return mergeComponents(src, mappings);
      }
      return undefined;
    },
  };
};

export default plugin;
