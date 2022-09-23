import { fsUtils } from '@mdxvac/fs-utils';
import { dirname, join } from 'path';
import type { Plugin } from 'unified';
import { mergeComponents } from './mergeComponents';

const DEFAULT_NAME = '_components.ts';

/**
 * Options for plugin vite-astro-mdxcomponents, for details see
 * https://mdxvac.netlify.app/plugins/vite-astro-mdxcomponents
 */
export type Options = Partial<{
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
}>;

/**
 * Define MDX component mappings for your HTML elements by scanning the directory up.
 *
 * @param options For configuration options, see https://mdxvac.netlify.app/plugins/vite-astro-mdxcomponents
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
