import { deepMerge, type ObjectLike } from '@mdxvac/deep-merge';
import { exists } from '@mdxvac/fs-utils';
import { MemCache } from '@mdxvac/mem-cache';
import { readFile } from 'fs/promises';
import YAML from 'js-yaml';
import { dirname, join, normalize } from 'path';

async function merge(up: ObjectLike | undefined, name: string, dir: string) {
  const file = join(dir, name);
  if (await exists(file)) {
    const yaml = await readFile(file, 'utf8');
    const frontmatter = YAML.load(yaml) as ObjectLike;
    if (up) {
      return deepMerge(up, frontmatter);
    } else {
      return frontmatter;
    }
  } else {
    return up;
  }
}

async function get(name: string, dir: string, stop: string): Promise<ObjectLike | undefined> {
  const up = dir !== stop ? await get(name, dirname(dir), stop) : undefined;
  return merge(up, name, dir);
}

const cache = new MemCache(async function provider(
  name: string,
  dir: string,
  stop: string
): Promise<ObjectLike | undefined> {
  const up = dir !== stop ? await cache.get(name, dirname(dir), stop) : undefined;
  return merge(up, name, dir);
});

export async function getFrontmatters(
  name: string,
  dir: string,
  stop: string,
  enableCache = false
): Promise<ObjectLike | undefined> {
  if (!name) {
    throw new Error("'name' must be a valid filename");
  }
  if (!dir) {
    throw new Error("'dir' must be a valid directory name");
  }
  if (!stop) {
    throw new Error("'stop' must be a valid directory name");
  }
  dir = normalize(dir);
  stop = normalize(stop);
  if (!dir.startsWith(stop)) {
    throw new Error('dir must be a subdirectory of stop');
  }

  if (enableCache) {
    return cache.get(name, dir, stop);
  } else {
    return get(name, dir, stop);
  }
}
