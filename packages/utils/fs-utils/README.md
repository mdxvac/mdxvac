# @mdxvac/fs-utils

Some utilities to work with the file system, e.g. to find files in parent folders.

## Content

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)

## What is this?

An NPM package with a few utilities to work with configuration files in the file system. It also provides a cached variant, if you work in a static context, e.g. with a Static Site Generator (SSG).

## When should I use this?

If you work with configuration files placed in the file system relative to your subject file, you usually want to find the closest or all files looking up the directory tree. Then you can use the functions `findUp` (finding the closest) and `findUpAll` (finding all, up to a stop directory).

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/fs-utils
```

## Use

Example usages:

```js
const file = "src/pages/docs/install/my-content.mdx";

if (await exists(file)) {
  const howToRender = await findUp("how-to-render.json", file);

  const yaml = await findUpAll("_frontmatter.yaml", file);
  const frontmatter = deepMerge(yaml.map(c => loadYAML(c)));

  ...
}
```
