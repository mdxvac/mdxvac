import type { Plugin } from 'unified';
import type { VFile } from '@mdxvac/vfile-astro';

const DEFAULT_PROPERTY = 'rawmdx';
/**
 * Structured options for plugin remark-astro-rawmdx
 *
 * Use in astro.config.mjs like
 *
 * ```
 * markdown: {
 *     remarkPlugins: [[rawMdx, {property: "raw"}]],
 *     ...
 */
export interface Options {
  /**
   * Name of Astro layout files to detect in the directory of the MDX-page.
   *
   * The default is '_layout.astro'
   */
  property: string;
}

/**
 * Plugin
 * @param options optional `name` property for the layout file
 * @returns transformer function, that operates only on VFile level
 */
export const plugin: Plugin<[Partial<Options>], unknown> = (options = {}) => {
  const { property = DEFAULT_PROPERTY } = options;

  return function transformer(_: unknown, file: VFile) {
    file.data.astro.frontmatter[property] = file.value;
  };
};

export default plugin;
