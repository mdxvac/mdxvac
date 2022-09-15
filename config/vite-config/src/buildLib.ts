/// <reference types="vitest" />
import { resolve } from 'path';
import type { UserConfigExport } from 'vite';
import { nodeBuiltins } from './nodeBuiltins';
import { capitalize, lastSegment, toCamelCase } from './utils';

/**
 * Generate a base build configuration for libraries including vitest setup
 * @param name of the CommonJS module
 * @param entry entry-point to generate module, defaults to src/index.ts
 * @returns
 */
export function buildLib(name: string, dirname: string, entry = 'src/index.ts'): UserConfigExport {
  return {
    build: {
      lib: {
        entry: resolve(dirname, entry),
        name: capitalize(toCamelCase(lastSegment(name))),
        fileName: 'index',
      },
      rollupOptions: {
        external: nodeBuiltins,
      },
    },
    test: {
      globals: true,
    },
  };
}
