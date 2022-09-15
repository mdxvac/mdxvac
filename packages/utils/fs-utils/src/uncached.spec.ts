import { join, relative as r } from 'path';
import { describe, expect, test } from 'vitest';
import { findUp, findUpAll } from './uncached';

const fixtures = join(process.cwd(), 'fixtures');
const name = '_frontmatter.yaml';

/**
 * Make an absolute path relative to our fixtures
 * @param absolute
 * @returns
 */
function relative(absolute) {
  if (Array.isArray(absolute)) {
    return absolute.map((a) => r(fixtures, a));
  }
  return absolute === undefined ? undefined : r(fixtures, absolute);
}

describe('fs-utils', function () {
  test('findUp finds an immediate file', async function () {
    const dir = join(fixtures, 'd1', 'd11', 'd111');
    const actual = await findUp(name, dir);
    const expected = 'd1/d11/d111/_frontmatter.yaml';
    expect(relative(actual)).toBe(expected);
  });

  test('findUp finds one up', async function () {
    const dir = join(fixtures, 'd1', 'd11', 'd112');
    const actual = await findUp(name, dir);
    const expected = 'd1/d11/_frontmatter.yaml';
    expect(relative(actual)).toBe(expected);
  });

  test('findUp finds two up', async function () {
    const dir = join(fixtures, 'd1', 'd12', 'd121');
    const actual = await findUp(name, dir);
    const expected = 'd1/_frontmatter.yaml';
    expect(relative(actual)).toBe(expected);
  });

  test('findUp stops', async function () {
    const dir = join(fixtures, 'd1', 'd12', 'd121');
    const stop = join(fixtures, 'd1', 'd12');
    const actual = await findUp(name, dir, stop);
    const expected = undefined;
    expect(relative(actual)).toBe(expected);
  });

  test('findUp detects incoherent start/stop', function () {
    const start = join(fixtures, 'd1', 'd11');
    const stop = join(fixtures, 'd1', 'd12');
    expect(findUp(name, start, stop)).rejects.toThrowError(
      /^'dir' must be a subdirectory of 'stop'$/
    );
  });

  test('findUpAll finds all files (top-down)', async function () {
    const dir = join(fixtures, 'd1', 'd11', 'd111');
    const stop = join(fixtures, 'd1');
    const actual = await findUpAll(name, dir, stop);
    const expected = [
      'd1/_frontmatter.yaml',
      'd1/d11/_frontmatter.yaml',
      'd1/d11/d111/_frontmatter.yaml',
    ];
    expect(relative(actual)).toEqual(expected);
  });
});
