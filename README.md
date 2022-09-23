# @mdxvac - MDX Vacuum for Astro

[MDX Vacuum](https://mdxvac.netlify.app) is a set of Vite, Remark and Rehype plugins, that you can use in your [Astro](https://astro.build)🚀 site generator, to keep your [MDX](https://mdxjs.com) as clean as you like.

> This is the monorepo, that I use to maintain those plugins and the website.

## The web site

Besides the plugins, the sources of the 'MDX Vacuum' web site are published as a showcase of how to apply the plugins to a file/git-based publication workflow. The source for the MDX Vacuum web site can be found in [`apps/web`](./tree/main/apps/web).

## The plugins

The plugins can be found in [`packages/plugins/*`](./tree/main/packages/plugins) and will be published to [NPM](https://www.npmjs.com/org/mdxvac)

The following plugins are planned:

- **remark-astro-relativeimport** - dynamically imports files relative to the referencing file.
- **remark-astro-styledirective** - lets users apply CSS classes to the HTML elements resulting from the markdown.

If you want to start a discussion [open an issue on github](./issues/new/choose)...

## The utils

Besides the plugins, there are a few packages, that help me in writing Astro plugins, find them at [packages/utils](./tree/main/packages/utils).
