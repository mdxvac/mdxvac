import { exists, findUp, findUpAll } from './uncached';
import {
  exists as cachedExists,
  findUp as cachedFindUp,
  findUpAll as cachedFindUpAll,
} from './cached';
import type { FsUtils } from './FsUtils';

export * from './uncached';
export const fsUtils: FsUtils & { cached: FsUtils } = {
  exists,
  findUp,
  findUpAll,
  cached: {
    exists: cachedExists,
    findUp: cachedFindUp,
    findUpAll: cachedFindUpAll,
  },
};
