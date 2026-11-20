import { describe, expect, it } from 'vitest';
import { objectUtilities } from '../object-utilities';

describe('objectUtilities', () => {
  it('invert swaps keys and values', () => {
    expect(objectUtilities.invert({ a: 'x' })).toEqual({ x: 'a' });
  });

  it('flattenObject and construct are inverse', () => {
    const flat = objectUtilities.flattenObject({ a: { b: 1 } });
    expect(flat).toEqual({ 'a.b': 1 });
    expect(objectUtilities.construct(flat)).toEqual({ a: { b: 1 } });
  });

  it('shake removes undefined values', () => {
    expect(objectUtilities.shake({ a: 1, b: undefined })).toEqual({ a: 1 });
  });

  it('cloneDeep returns an independent copy', () => {
    const src = { a: { b: 1 } };
    const copy = objectUtilities.cloneDeep(src);
    expect(copy).toEqual(src);
    expect(copy.a).not.toBe(src.a);
  });

  it('sortKeys sorts keys alphabetically', () => {
    expect(Object.keys(objectUtilities.sortKeys({ b: 1, a: 2 }))).toEqual(['a', 'b']);
  });

  it('listify returns key/value pairs', () => {
    expect(objectUtilities.listify({ a: 1 })).toEqual([{ key: 'a', value: 1 }]);
  });

  it('converts key casing', () => {
    expect(objectUtilities.toCamelCaseKeys({ foo_bar: 1 })).toEqual({ fooBar: 1 });
    expect(objectUtilities.toSnakeCaseKeys({ fooBar: 1 })).toEqual({ foo_bar: 1 });
    expect(objectUtilities.toKebabCaseKeys({ fooBar: 1 })).toEqual({ 'foo-bar': 1 });
    expect(objectUtilities.toPascalCaseKeys({ foo_bar: 1 })).toEqual({ FooBar: 1 });
    expect(objectUtilities.toConstantCaseKeys({ fooBar: 1 })).toEqual({ FOO_BAR: 1 });
    expect(objectUtilities.lowerize({ AB: 1 })).toEqual({ ab: 1 });
    expect(objectUtilities.upperize({ ab: 1 })).toEqual({ AB: 1 });
  });

  it('pick and omit take comma separated keys', () => {
    const src = { a: 1, b: 2, c: 3 };
    expect(objectUtilities.pick(src, 'a, c')).toEqual({ a: 1, c: 3 });
    expect(objectUtilities.omit(src, 'a, c')).toEqual({ b: 2 });
  });

  it('get reads a path and returns null when missing', () => {
    expect(objectUtilities.get({ a: { b: [{ c: 5 }] } }, 'a.b[0].c')).toBe(5);
    expect(objectUtilities.get({ a: 1 }, 'x.y')).toBeNull();
  });

  it('findKey finds the key of a value', () => {
    expect(objectUtilities.findKey({ a: 1, b: 2 }, '2')).toBe('b');
    expect(objectUtilities.findKey({ a: 1 }, '9')).toBeNull();
  });
});

describe('objectUtilities merge and set', () => {
  it('merge deep merges the other object into a new object', () => {
    const input = { a: { x: 1, y: 2 }, b: 1 };
    expect(objectUtilities.merge(input, { other: { a: { y: 3, z: 4 }, c: 5 } } as any)).toEqual({
      a: { x: 1, y: 3, z: 4 },
      b: 1,
      c: 5,
    });
    expect(input).toEqual({ a: { x: 1, y: 2 }, b: 1 });
  });

  it('merge requires an object on both sides', () => {
    expect(() => objectUtilities.merge({ a: 1 }, { other: [1] } as any)).toThrow('Other object must be an object');
    expect(() => objectUtilities.merge([] as any, { other: {} } as any)).toThrow('Input must be an object');
  });

  it('set writes at a path without mutating the input', () => {
    const input = { a: { b: 1 } };
    expect(objectUtilities.set(input, { path: 'a.c[1]', value: 'x' } as any)).toEqual({
      a: { b: 1, c: [undefined, 'x'] },
    });
    expect(input).toEqual({ a: { b: 1 } });
  });

  it('set requires a path', () => {
    expect(() => objectUtilities.set({}, { path: ' ', value: 1 } as any)).toThrow('Path is required');
  });
});
