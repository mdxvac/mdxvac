import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import autoImports from '@mdxvac/remark-astro-autoimports';
import frontmatter from '@mdxvac/remark-astro-frontmatter';
import rawMdx from '@mdxvac/remark-astro-rawmdx';
import sectionizeHeadings from '@mdxvac/remark-sectionize-headings';
import mdxComponents from '@mdxvac/vite-astro-mdxcomponents';

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  markdown: {
    remarkPlugins: [autoImports, frontmatter, rawMdx, [sectionizeHeadings, { levels: [2] }]],
    extendDefaultPlugins: true,
  },
  vite: {
    plugins: [mdxComponents()],
    ssr: {
      external: ['svgo'],
    },
  },
});
