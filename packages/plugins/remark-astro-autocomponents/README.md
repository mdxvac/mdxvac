# @mdxvac/remark-astro-autocomponents

> **DEPRECATED:** Please consider using the plugin [astro-m2dx](https://www.npmjs.com/package/astro-m2dx), which bundles all features from the `@mdxvac` plugins in one plugin (completely opt-in).

Remark plugin to define common component mappings for all Astro markdown files in a directory.

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
    - [`name: string`](#name-string)

## What is this?

This package is a [`remark`](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) plugin for markdown files in the context of [Astro](https://docs.astro.build/en/guides/integrations-guide/mdx) site generation.

## When should I use this?

In Astro you can define a mapping from HTML elements to JSX components by exporting `const components = { ... }` in any MDX file. With this plugin you can define this export per directory.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/remark-astro-autocomponents
```

## Use

In your `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import autoComponents from '@mdxvac/remark-astro-autocomponents';
//                       ^^^

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [autoComponents],
    //              ^^^
    extendDefaultPlugins: true,
  },
});
```

This uses the default options, where the name of the auto-import file is `_components.ts`.

Now create an auto-components file exporting `const components`, mapping HTML tags to JSX components:

```js
import { Title } from '@components/Title';

export const components = {
  h1: Title,
};
```

Files are evaluated up the directory tree, i.e. files closer to the MDX file take precedence over files further up the tree.

### Options

You can specify options for the plugin in `astro.config.mjs` like so:

```js
remarkPlugins: [[autoComponents, {...your_options}]],
```

The following options are available:

#### `name: string`

Name for auto-component files.

- name, to find files with `name` up the directory tree
- default: `_components.ts`

You can use it like so:

```js
remarkPlugins: [[autoComponents, {name: "_my-components.js"}]],
```
