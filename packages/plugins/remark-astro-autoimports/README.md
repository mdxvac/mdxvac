# @mdxvac/remark-astro-autoimports

> **DEPRECATED:** Please consider using the plugin [astro-m2dx](https://www.npmjs.com/package/astro-m2dx), which bundles all features from the `@mdxvac` plugins in one plugin (completely opt-in).

remark plugin to define default JSX component imports for all MDX files in a directory.

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

Now create an auto-import file exporting known components:

```js
import { Code } from 'astro/components';

export const autoimports = {
  Code,
};
```

In your MDX file you can now use `<Code ... />` without importing it:

```md
# My Title

Here I am embedding some fancy code from the frontmatter:

<Code code={frontmatter.rawmdx} />
```

> By default, we use .ts files, but actually we parse them internally with an ES6 parser (acorn), hence you shouldn't use any fancy TypeScript features in there.  
> You can structure your export pretty much as you like, as long as the variable initialization is an object expression without spread operator.

Files are evaluated up the directory tree, i.e. files closer to the MDX file take precedence over files further up the tree.

The variables inside a file are evaluated in order of appearance, i.e. the following export would yield the component FuzzyBear over FozzieBear for the use in `<Bear />`, although `b` is the default export:

```js
import { FuzzyBear } from '@components/FuzzyBear';
import { FozzieBear } from '@components/FozzieBear';

export const a = {
  Bear: FuzzyBear,
};

const b = {
  Bear: FozzieBear,
};

export default b;
```

### Options

You can specify options for the plugin in `astro.config.mjs` like so:

```js
remarkPlugins: [[autoImports, {...your_options}]],
```

#### `name: string`

Name for auto-import files.

- name, to find files with `name` up the directory tree
- default: `_autoimports.ts`

Despite the suffix of the default value, these files should be simple JavaScript/ESM files (i.e. ES >=6) and not use any none-ES TypeScript features.

You can use it like so:

```js
remarkPlugins: [[autoImports, {name: "_my-imports.js"}]],
```
