export type ObjectLike = Record<string, unknown>;

/**
 * Type guard for real objects (map like structures, no arrays, no dates)
 *
 * @param object
 * @returns if object is an Object, but not an Array and not a Date
 */
export function isObjectLike(object: unknown): object is ObjectLike {
  return (
    !!object && typeof object === 'object' && !Array.isArray(object) && !(object instanceof Date)
  );
}

function _merge(a: ObjectLike, b: ObjectLike) {
  const result = { ...a };
  Object.keys(b).forEach((key: string) => {
    const targetValue = a[key];
    const sourceValue = b[key];

    if (isObjectLike(targetValue) && isObjectLike(sourceValue)) {
      result[key] = _merge(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  });
  return result;
}

type Result<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/**
 * Merge objects deeply, values in later objects overwrite values in earlier objects, similar to a spread-copy
 * ```js
 * {...object1, ...object2, ...object3}
 * ```
 * where values in object3 would take highest precedence.
 *
 * @param objects
 * @returns a new object with the merged values
 */
export function deepMerge<O extends ObjectLike[]>(...objects: O): Result<O[number]> {
  if (!objects || objects.length < 2) {
    throw new Error('You must at least provide two objects to deepMerge');
  }
  objects.forEach((o, i) => {
    if (!isObjectLike(o)) {
      throw new Error(`objects[${i}] '${JSON.stringify(o)}' is not an object, but ${typeof o}`);
    }
  });
  const [object_0, ...sources] = objects;
  let target = object_0;
  for (const source of sources) {
    target = _merge(target, source);
  }
  return target as Result<O[number]>;
}
