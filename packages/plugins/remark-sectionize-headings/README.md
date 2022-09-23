# @mdxvac/remark-sectionize-headings

remark plugin to wrap markdown headings and the following paragraphs in HTML `section` elements.

An alternative could be [remark-sectionize](https://www.npmjs.com/package/remark-sectionize), but this plugin offers a few more options and adds a CSS class according to the heading level to the resulting section.

> **Dust off your MDX**  
> [MDX Vacuum](https://mdxvac.netlify.app) is a set of plugins allowing you to write **clean** markdown, while still using all the great features of [MDX](https://mdxjs.com).  
> Use [Astro](https://astro.build) 🚀 and these plugins to build your publishing pipeline for Markdown/MDX.

Have a look at the other [`@mdxvac` plugins](https://www.npmjs.com/org/mdxvac) on NPM.

## Content

- [Content](#content)
- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
  - [Options](#options)
    - [`levels: number[]`](#levels-number)

## What is this?

This package is a [`remark`](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) plugin.

## When should I use this?

If you want to style sections of your document according to heading levels and need to wrap markdown headings and the following paragraphs in HTML `section` elements.

This is a pure remark plugin and can be used outside of an Astro context.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/remark-sectionize-headings
```

## Use

In your `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sectionizeHeadings from '@mdxvac/remark-sectionize-headings';
//                              ^^^

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [sectionizeHeadings],
    //              ^^^
    extendDefaultPlugins: true,
  },
});
```

This uses the default options, where all headings are wrapped according to their level.

This markdown:

```md
## Deprecated

- **remark-astro-auto-layout** - despite being the most successful plugin thus far, you should use the `remark-astro-frontmatter` plugin instead to define your common layout.
```

would yield this HTML:

```html
<section class="h2">
  <h2 id="deprecated">Deprecated</h2>
  <ul>
    <li>
      <strong>remark-astro-auto-layout</strong> - despite being the most successful plugin thus far,
      you should use the <code>remark-astro-frontmatter</code> plugin instead to define your common
      layout.
    </li>
  </ul>
</section>
```

### Options

#### `levels: number[]`

Heading levels to wrap into sections

- e.g. `[ 2, 3 ]` for only levels 2 & 3
- default: all
