# @mdxvac - MDX Vacuum for Astro

If you have used [MDX](https://mdxjs.com) before, you might have noticed that MDX files tend to become quite technical.

For us tech nerds, that is mostly fine, and being able to write the content into our technical documents in Markdown is already a big gain. But for non-tech content-editors, writing this style of markdown is quite a burden, and actually I realized, that it is quite a burden for my mind, too.

I like my content to be clean, so I decided to _dust off my MDX_.

With the arrival of [Astro v1.0](https://astro.build) and it's [MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/) I saw the chance to implement a publication pipeline that provides content-editors with the ability to write almost clean markdown, with only a few sprinkles of JSX and without overloading the frontmatter: **MDX Vacuum for Astro** was born.

MDX Vacuum is a [set of Vite, Remark and Rehype plugins](#the-plugins), that you can use in your Astro site generator, to keep your MDX as clean as you like.

<CTA>Dear Astronauts, take your vacuum cleaner and dust off your MDX!</CTA>

## The web site

Besides the plugins, the sources of the 'MDX Vacuum' web site are published as a showcase of how to apply the plugins to a file/git-base publication workflow. The source for the MDX Vacuum web site can be found in `apps/web`.

## The plugins

The plugins can be found in `packages/plugins/*` and will be published to [NPM](https://www.npmjs.com/org/mdxvac)

The following plugins are available:

- [remark-astro-autoimports](https://mdxvac.netlify.app/plugins/remark-astro-autoimports) - lets users define a set of components that can be used in MDX-files without explicitly being imported.
- [remark-astro-frontmatter](https://mdxvac.netlify.app/plugins/remark-astro-frontmatter) - lets users define default frontmatter for all MDX-pages in a directory and its subdirectories, e.g. the `layout` property.
- [remark-astro-rawmdx](https://mdxvac.netlify.app/plugins/remark-astro-rawmdx) - adds the raw markdown content to the frontmatter, to analyze in the layout, e.g. to compute reading time.
- [remark-sectionize-headings](https://mdxvac.netlify.app/plugins/remark-sectionize-headings) - wrap headings and the following paragraphs into sections, e.g. to style them.
- [vite-astro-mdxcomponents](https://mdxvac.netlify.app/plugins/vite-astro-mdxcomponents) - lets users define a mapping from standard html elements to JSX components on a per-directory basis.

The following plugins are planned:

- **remark-astro-titleabstract** - extracts the title and abstract of a markdown file and adds it to the frontmatter `title` and `abstract` properties.
- **remark-astro-importsrc** - imports files relative to referencing file from string `src` attributes.
- **remark-astro-styledirective** - lets users apply CSS classes to the HTML elements resulting from the markdown.
- **remark-astro-mdast** - adds the markdown AST (`mdast`) to the frontmatter, to analyze in Astro components, e.g. to generate a TOC, a search index or compute the reading time.
- **remark-astro-hast** - adds the HTML AST (`hast`) to the frontmatter, to analyze in Astro components (I do not have a use case for this yet, but technically it is trivially the same as adding the mdast).

## The utils

Besides the plugins, there are a few packages, that help me in writing Astro plugins, find them at [packages/utils](https://github.com/mdxvac/mdxvac/tree/main/packages/utils).
