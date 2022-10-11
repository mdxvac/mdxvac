# @mdxvac/esm-utils

> **DEPRECATED:** Please consider using the plugin [astro-m2dx](https://www.npmjs.com/package/astro-m2dx), which bundles all features from the `@mdxvac` plugins in one plugin (completely opt-in).

Utilities to work with ESM (JavaScript) files.

## Content

- [Content](#content)
- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)

## What is this?

This is an NPM package providing some utilities to work with (parsed) JavaScript files.

## When should I use this?

You shouldn't, it is meant for internal use in the @mdxvac plugins, but not tested for general purpose.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/esm-utils
```

## Use

```js
import { parseEsm } from '@mdxvac/esm-utils';

const root = parseEsm(`
export function foo() {
  console.log("foo");
}
`);
```
