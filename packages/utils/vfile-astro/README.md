# @mdxvac/vfile-astro

Astro-enhanced VFile type, typing the `astro.frontmatter` property.

## Content

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
  - [Options](#options)

## What is this?

This package just declares an ambient module `vfile-astro`.

## When should I use this?

If you are working with Unified/Vite/Markdown files that have been preprocessed by Astro and contain frontmatter, then this declaration will give you a typed experience.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/vfile-astro
```

## Use

```js
import type { VFile } from 'vfile-astro';

...
  file.data.astro.frontmatter[property] = value;
```
