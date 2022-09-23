# @mdxvac/remark-astro-autoimports

remark plugin to define default JSX component imports for all MDX files in a directory.

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

In Astro you usually have to `import` components (Astro, JSX, ...) that you want to use in your MDX file. With this plugin you can define a set of _known_ components, that can be used in all MDX files in that directory and subdirectory without the need to explicitly import them.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/remark-astro-autoimports
```

## Use

In your `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import autoImports from '@mdxvac/remark-astro-autoimports';
//                       ^^^

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [autoImports],
    //              ^^^
    extendDefaultPlugins: true,
  },
});
```

This uses the default options, where the name of the auto-import file is `_autoimports.ts`.

Now create an auto-import file with a default export for all known components:

```js
import { Code } from 'astro/components';

const imports = {
  Code,
};

export default imports;
```

In your MDX file you can now use `<Code ... />` without importing it:

```md
# My Title

Here I am embedding some fancy code from the frontmatter, e.g. `rawmdx`, or any other fancy source:

<Code code={...} />
```

The default export must be a map/object of components and their JSX names.

### Options

If you want to use a different name for the auto-import file, you can specify it in the plugin's `name` option like so:

```js
remarkPlugins: [[autoImports, {name: "_my-imports.ts"}]],
```
