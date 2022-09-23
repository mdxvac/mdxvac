# @mdxvac/remark-astro-frontmatter

remark plugin to define common frontmatter for all Markdown files in a directory, e.g. to _set a common layout_ for all files.

> **Dust off your MDX**  
> [MDX Vacuum](https://mdxvac.netlify.app) is a set of plugins allowing you to write **clean** markdown, while still using all the great features of [MDX](https://mdxjs.com).  
> Use [Astro](https://astro.build) 🚀 and these plugins to build your publishing pipeline for Markdown/MDX.

Have a look at the other [`@mdxvac` plugins](https://www.npmjs.com/org/mdxvac) on NPM.

## Content

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
  - [Options](#options)

## What is this?

This package is a [`remark`](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) plugin for markdown files in the context of [Astro](https://docs.astro.build/en/guides/integrations-guide/mdx) site generation.

## When should I use this?

If you want to extract common frontmatter properties for all files in a directory, e.g. the `layout` to a common file within the directory (`_frontmatter.yaml` by default). This helps you, keep your markdown files and their frontmatter as clean as possible.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/remark-astro-frontmatter
```

## Use

In your `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import frontmatter from '@mdxvac/remark-astro-frontmatter';
//                       ^^^

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [frontmatter],
    //              ^^^
    extendDefaultPlugins: true,
  },
});
```

This uses the default options, where the name of the frontmatter files is `_frontmatter.yaml`.

Now you can create frontmatter files in your `src` directory to define common properties. The properties will be deeply merged, where properties from markdown file's frontmatter will have highest priority, and properties from frontmatter files closer to the markdown file will take precedence over properties from files higher up the tree.

### Options

If you want to use a different name for the frontmatter files, you can specify it in the plugin's `name` option like so:

```js
remarkPlugins: [[frontmatter, {name: "_props.yaml"}]],
```
