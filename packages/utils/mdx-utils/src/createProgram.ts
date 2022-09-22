import type { MdxjsEsm } from 'mdast-util-mdx';
import { parseEsm } from '@mdxvac/esm-utils';

export function createProgram(value: string): MdxjsEsm {
  const estree = parseEsm(value);
  return {
    type: 'mdxjsEsm',
    value,
    data: {
      estree,
    },
  };
}
