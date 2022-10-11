# @mdxvac/mdx-utils

> **DEPRECATED:** Please consider using the plugin [astro-m2dx](https://www.npmjs.com/package/astro-m2dx), which bundles all features from the `@mdxvac` plugins in one plugin (completely opt-in).

Type guards for remark.

## Content

- [Content](#content)
- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)

## What is this?

This is an NPM package providing type guards for remark types.

## When should I use this?

You shouldn't, it is meant for internal use in the @mdxvac plugins, but not tested for general purpose.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/mdx-utils
```

## Use

```js
import { isHeading } from '@mdxvac/mdx-utils';

if (isHeading(node)) {
  // This is type-safe now
  if (node.depth > 2) {
    ...
  }
}
```
