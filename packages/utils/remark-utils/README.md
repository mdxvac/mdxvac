# @mdxvac/remark-utils

Type guards for remark.

## Content

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)

## What is this?

This is an NPM package providing type guards for remark types.

## When should I use this?

If you want to check unknown remark nodes for their type and use them in a type-safe manner.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/remark-utils
```

## Use

```js
import { isHeading } from '@mdxvac/remark-utils';

if (isHeading(node)) {
  // This is type-safe now
  if (node.depth > 2) {
    ...
  }
}
```
