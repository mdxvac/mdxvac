import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import autoImports from '@mdxvac/remark-astro-autoimports';
import frontmatter from '@mdxvac/remark-astro-frontmatter';
import sectionizeHeadings from '@mdxvac/remark-sectionize-headings';
import mdxComponents from '@mdxvac/vite-astro-mdxcomponents';

import { defineConfig } from 'astro/config';

const options = {
  /** @type {import('@mdxvac/remark-astro-frontmatter').Options} */
  frontmatter: {
    rawmdx: true,
    scanTitle: true,
    scanAbstract: true,
  },
  /** @type {import('@mdxvac/remark-sectionize-headings').Options} */
  sectionize: {
    levels: [2],
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  markdown: {
    remarkPlugins: [
      autoImports, //
      [frontmatter, options.frontmatter],
      [sectionizeHeadings, options.sectionize],
    ],
    extendDefaultPlugins: true,
  },
  vite: {
    plugins: [
      mdxComponents(), //
    ],
    ssr: {
      external: ['svgo'],
    },
  },
});
