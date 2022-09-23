# @mdxvac/remark-astro-frontmatter

remark plugin to inject and define common frontmatter for all Markdown files, e.g. to **set a common layout** for all files.

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
    - [`merge: string | false`](#merge-string--false)
    - [`rawmdx: boolean | string`](#rawmdx-boolean--string)
    - [`mdast: boolean | string`](#mdast-boolean--string)
    - [`scanTitle: boolean | string`](#scantitle-boolean--string)
    - [`scanAbstract: boolean | string`](#scanabstract-boolean--string)
    - [⚠️ **Experimental** `enableCache: boolean`](#️-experimental-enablecache-boolean)

## What is this?

This package is a [`remark`](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) plugin for markdown files in the context of [Astro](https://docs.astro.build/en/guides/integrations-guide/mdx) site generation.

## When should I use this?

If you want to extract common frontmatter properties for all files in a directory, e.g. the `layout` to a common file (`_frontmatter.yaml` by default).

**NEW!** Besides the definition in the `_frontmatter.yaml` files, you can also inject some properties now, e.g.

- `rawmdx`: Get (read-only) access to the (really) raw MDX content of your file.
- `mdast`: Get (read-only) access to the parsed MDAST structure, e.g. to transform to text or analyze for added meta-info in your layout.
- `scanTitle`/`scanAbstract`: Use your content to define the title and abstract for your document and omit ugliness like `# {frontmatter.title}`

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

This uses the default options, where the name of the frontmatter files is `_frontmatter.yaml` and the other features are disabled.

Now you can create frontmatter files in your `src` directory to define common properties. The properties will be deeply merged, where properties from markdown file's frontmatter will have highest priority, and properties from frontmatter files closer to the markdown file will take precedence over properties from files higher up the tree.

### Options

You can specify options for the plugin in `astro.config.mjs` like so:

```js
remarkPlugins: [[frontmatter, {...your_options}]],
```

The following options are available:

#### `merge: string | false`

Merge YAML frontmatter files into the frontmatter.

- false, to disable frontmatter merging
- name, to find frontmatter in YAML files with `name` up the directory tree
- default: `_frontmatter.yaml`

#### `rawmdx: boolean | string`

Inject the raw MDX into the frontmatter.

- true, to have it injected into property `rawmdx`
- name, to have it injected as property `<name>`
- default: `false`

#### `mdast: boolean | string`

Inject the MD AST into the frontmatter.

> NOTE: The injected tree is not read by the HTML generation,
> so manipulation does not make sense.

- true, to have it injected into property `mdast`
- name, to have it injected as property `<name>`
- default: `false`

#### `scanTitle: boolean | string`

Scan the content for the title and inject it into the frontmatter.

The title will be taken from the first heading with depth=1,
i.e. the first line `# My Title`.

- true, to have it injected into property `title`
- name, to have it injected as property `<name>`
- default: `false`

If the frontmatter already has a property with that name, it will **NOT** be overwritten.

#### `scanAbstract: boolean | string`

Scan the content for the abstract and inject it into the frontmatter.

The abstract will be taken from the content between the title and the next
heading. BEWARE: The content is raw MDX!

- true, to have it injected into property `abstract`
- name, to have it injected as property `<name>`
- default: `false`

If the frontmatter already has a property with that name, it will **NOT** be overwritten.

#### ⚠️ **Experimental** `enableCache: boolean`

Flag to enable cache for file system access, use only when doing SSG in prod
