import { isHeading, isRoot, isText } from '@mdxvac/mdx-utils';
import type { Root } from 'mdast';
import { CONTINUE, EXIT, Node, SKIP, visit } from 'unist-util-visit';

export function scanTitleAndAbstract(
  root: Root,
  scanTitle = true,
  scanAbstract = true
): (string | undefined)[] {
  let title: string | undefined = undefined;
  const abstract: string[] = [];

  if (scanTitle || scanAbstract) {
    visit(root, (node) => {
      if (isRoot(node)) {
        return CONTINUE;
      } else if (scanTitle && !title && isHeading(node) && node.depth === 1) {
        title = toText(node);
        if (!scanAbstract) {
          return EXIT;
        } else {
          abstract.length = 0;
          return SKIP;
        }
      } else if (scanAbstract) {
        if (isHeading(node)) {
          if (node.depth === 1) {
            abstract.length = 0;
            return SKIP;
          }
          return EXIT;
        }
        abstract.push(toText(node));
        return SKIP;
      }
    });
  }

  return [title, abstract.length === 0 ? undefined : abstract.join('\n\n').trim()];
}

function toText(root: Node) {
  const buffer: string[] = [];
  visit(root, (node) => {
    if (isText(node)) {
      buffer.push(node.value);
    }
  });
  return buffer.join(' ').trim();
}
