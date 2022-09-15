import { describe, expect, test } from 'vitest';
import { isHeading } from './index';

describe('remark-astro', function () {
  test('type guard', function () {
    const input = { type: 'heading' };
    expect(isHeading(input)).toBe(true);
  });
});
