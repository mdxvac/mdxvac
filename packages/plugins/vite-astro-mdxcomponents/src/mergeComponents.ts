const EXISTING_EXPORT = /export\s+const\s+components\s+=\s+{/;

/**
 * Merge all exported `components` mappings.
 *
 * If the `files` array is undefined or empty, the `src` is returned untouched.
 *
 * @param src Generated source code for MDX file
 * @param files Source files with default mappings from lowest to highest precedence
 * @returns
 */
export function mergeComponents(src: string, files: string[]) {
  if (!files || files.length === 0) return src;

  const found = src.match(EXISTING_EXPORT);
  if (!found) {
    if (files.length === 1) {
      return `
export { components } from '${files[0]}';
${src}`;
    } else {
      return `
${files.map((f, i) => `import { components as _injected_components_${i} } from '${f}';`).join('\n')}
export const components = {
${files.map((_, i) => `  ..._injected_components_${i}`).join(',\n')}
}
${src}`;
    }
  } else {
    const start = found.index!;
    const length = found[0].length;
    if (files.length === 1) {
      return `
${src.slice(0, start)}
import { components as _injected_components } from '${files[0]}';
export const components = {
  ..._injected_components,${src.slice(start + length)}`;
    } else {
      return `
${src.slice(0, start)}
${files.map((f, i) => `import { components as _injected_components_${i} } from '${f}';`).join('\n')}
export const components = {
${files.map((_, i) => `  ..._injected_components_${i}`).join(',\n')},${src.slice(start + length)}`;
    }
  }
}
