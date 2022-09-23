# @mdxvac/deep-merge

Simple algorithm to merge configuration objects with arbitrary depths.

## Content

- [Content](#content)
- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)

## What is this?

This package is a simple algorithm, that allows to merge configuration objects with arbitrary depths.

## When should I use this?

If you have configuration objects with a defined precedence order, you can merge them with this algorithm (the last one merged takes the highest precedence).

The algorithm will create new objects for merged objects, so the input objects are never changed. In the merged object, simple values are overwritten by later source values, object values will be merged.

> Note: Date and Array are **NOT** considered objects and will be overwritten instead of merged.

You must pass at least two objects.

> I use it e.g. in a Static Site Generator to merge configuration files with default values specified on directory level.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with `npm`:

```sh
npm install -D @mdxvac/deep-merge
```

## Use

```js
const a = {
  address: {
    city: 'Berlin',
  },
  self: 'Icke',
};
const b = {
  familyName: 'Poor',
  address: {
    street: 'Unter den Linden',
  },
  rich: false,
  vehicles: ['bicycle'],
};
const c = {
  firstName: 'Joe',
  address: {
    number: '100',
  },
  self: 'Me',
  rich: true,
  vehicles: ['sports car', 'private jet', 'e-bike'],
};
deepMerge(a, b, c);
```

Will result in the following merged object:

```js
{
  firstName: 'Joe',
  familyName: 'Poor',
  address: {
    number: '100',
    street: 'Unter den Linden',
    city: 'Berlin',
  },
  self: 'Me',
  rich: true,
  vehicles: ['sports car', 'private jet', 'e-bike'],
}
```
