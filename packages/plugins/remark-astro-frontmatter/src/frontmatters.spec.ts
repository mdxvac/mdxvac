import { join } from 'path';
import { describe, expect, test } from 'vitest';
import { getFrontmatters } from './frontmatters';

const fixtures = join(process.cwd(), 'fixtures');
const dir_d1 = join(fixtures, 'd1');
const name = '_frontmatter.yaml';

describe('frontmatters', function () {
  test('not found', async function () {
    const dir = join(fixtures, 'd2');
    const actual = await getFrontmatters(name, dir, dir);
    const expected = undefined;
    expect(actual).toBe(expected);
  });
  test('top-level', async function () {
    const dir = join(fixtures, 'd1');
    const actual = await getFrontmatters(name, dir, dir);
    const expected = {
      template: 'd1',
      site: {
        author: 'Christian',
        url: 'mdxvac.netlify.app',
      },
    };
    expect(actual).toStrictEqual(expected);
  });
  test('two merged', async function () {
    const dir = join(fixtures, 'd1', 'd11');
    const actual = await getFrontmatters(name, dir, dir_d1);
    const expected = {
      template: 'd11',
      site: {
        author: 'Christian',
        url: 'mdxvac.netlify.app',
        published: new Date('2022-09-19'),
      },
    };
    expect(actual).toStrictEqual(expected);
  });
  test('three merged', async function () {
    const dir = join(fixtures, 'd1', 'd11', 'd111');
    const actual = await getFrontmatters(name, dir, dir_d1);
    const expected = {
      template: 'd111',
      site: {
        author: 'Christian',
        url: 'mdxvac.netlify.app',
        published: new Date('2022-09-19'),
      },
      category: 'docs',
    };
    expect(actual).toStrictEqual(expected);
  });
});

describe('frontmatters cached', function () {
  test('two merged', async function () {
    const dir = join(fixtures, 'd1', 'd11');
    const actual = await getFrontmatters(name, dir, dir_d1, true);
    const expected = {
      template: 'd11',
      site: {
        author: 'Christian',
        url: 'mdxvac.netlify.app',
        published: new Date('2022-09-19'),
      },
    };
    expect(actual).toStrictEqual(expected);
    const actual_d1 = await getFrontmatters(name, dir_d1, dir_d1, true);
    const expected_d1 = {
      template: 'd1',
      site: {
        url: 'mdxvac.netlify.app',
        author: 'Christian',
      },
    };
    expect(actual_d1).toStrictEqual(expected_d1);
  });
});
