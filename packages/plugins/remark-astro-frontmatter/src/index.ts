import { deepMerge } from '@mdxvac/deep-merge';
import type { Root } from 'mdast';
import { join } from 'path';
import type { Plugin } from 'unified';
import { getFrontmatters } from './frontmatters';
import { scanTitleAndAbstract } from './scanTitleAndAbstract';
import type { VFile } from './VFile';

const DEFAULT_MERGE_NAME = '_frontmatter.yaml';

/**
 * Options for plugin remark-astro-frontmatter, for details see
 * https://mdxvac.netlify.app/plugins/remark-astro-frontmatter
 */
export type Options = Partial<{
  /**
   * Merge YAML frontmatter files into the frontmatter.
   *
   * - false, to disable frontmatter merging
   * - name, to find frontmatter in YAML files with `name` up the directory tree
   * - default: `_frontmatter.yaml`
   */
  merge: string | false;

  /**
   * Inject the raw MDX into the frontmatter.
   *
   * - true, to have it injected into property `rawmdx`
   * - name, to have it injected as property `<name>`
   * - default: `false`
   */
  rawmdx: boolean | string;

  /**
   * Inject the MD AST into the frontmatter.
   *
   * > NOTE: The injected tree is not read by the HTML generation,
   *   so manipulation does not make sense.
   *
   * - true, to have it injected into property `mdast`
   * - name, to have it injected as property `<name>`
   * - default: `false`
   */
  mdast: boolean | string;

  /**
   * Scan the content for the title and inject it into the frontmatter.
   *
   * The title will be taken from the first heading with depth=1,
   * i.e. the first line `# My Title`.
   *
   * - true, to have it injected into property `title`
   * - name, to have it injected as property `<name>`
   * - default: `false`
   *
   * If the frontmatter already has a property with that name, it will **NOT** be overwritten.
   */
  scanTitle: boolean | string;

  /**
   * Scan the content for the abstract and inject it into the frontmatter.
   *
   * The abstract will be taken from the content between the title and the next
   * heading. BEWARE: The content is raw MDX!
   *
   * - true, to have it injected into property `abstract`
   * - name, to have it injected as property `<name>`
   * - default: `false`
   *
   * If the frontmatter already has a property with that name, it will **NOT** be overwritten.
   */
  scanAbstract: boolean | string;

  /**
   * Experimental: Flag to enable cache for file system access, use only when doing SSG in prod
   */
  enableCache: boolean;
}>;

/**
 * Pimp your frontmatter, e.g. by merging default values or injecting info from your source file.
 *
 * @param options For configuration options, see https://mdxvac.netlify.app/plugins/remark-astro-frontmatter
 * @returns transformer function
 */
export const plugin: Plugin<[Options], unknown> = (options = {}) => {
  const {
    merge = DEFAULT_MERGE_NAME,
    rawmdx = false,
    mdast = false,
    scanTitle = false,
    scanAbstract = false,
    enableCache = false,
  } = options;

  return async function transformer(root: Root, file: VFile) {
    const dir = file.dirname;
    if (!dir) return;

    let frontmatter = file.data.astro.frontmatter;

    if (merge) {
      const stop = join(file.cwd, 'src');
      const merged = await getFrontmatters(merge, dir, stop, enableCache);
      if (merged) {
        frontmatter = deepMerge(frontmatter, merged);
      }
    }

    if (rawmdx) {
      frontmatter[typeof rawmdx === 'string' ? rawmdx : 'rawmdx'] = file.value;
    }

    if (mdast) {
      frontmatter[typeof mdast === 'string' ? mdast : 'mdast'] = root;
    }

    if (scanTitle || scanAbstract) {
      const titleProp = typeof scanTitle === 'string' ? scanTitle : 'title';
      const abstractProp = typeof scanAbstract === 'string' ? scanAbstract : 'abstract';

      const [title, abstract] = scanTitleAndAbstract(
        root,
        !!scanTitle && !frontmatter[titleProp],
        !!scanAbstract && !frontmatter[abstractProp]
      );
      if (title) {
        frontmatter[titleProp] = title;
      }
      if (abstract) {
        frontmatter[abstractProp] = abstract;
      }
    }

    file.data.astro.frontmatter = frontmatter;
  };
};

export default plugin;
