import { describe, expect, it } from 'vitest';
import { utilityFunctions } from '../utility-functions';

describe('utilityFunctions', () => {
  it('toInteger and toFinite', () => {
    expect(utilityFunctions.toInteger('3.7')).toBe(3);
    expect(utilityFunctions.toFinite(Number.NaN)).toBe(0);
  });

  it('toArray and castArray', () => {
    expect(utilityFunctions.toArray('ab')).toEqual(['a', 'b']);
    expect(utilityFunctions.castArray(1)).toEqual([1]);
    expect(utilityFunctions.castArray([1])).toEqual([1]);
  });

  describe('defaultTo', () => {
    it('replaces nil and NaN with the parsed fallback', () => {
      expect(utilityFunctions.defaultTo(null, '5')).toBe(5);
      expect(utilityFunctions.defaultTo(undefined, 'abc')).toBe('abc');
      expect(utilityFunctions.defaultTo(Number.NaN, '{"a":1}')).toEqual({ a: 1 });
    });

    it('keeps a set value', () => {
      expect(utilityFunctions.defaultTo(0, '5')).toBe(0);
    });
  });

  describe('uid', () => {
    it('defaults to 8 characters', () => {
      expect(utilityFunctions.uid(null, '')).toHaveLength(8);
    });

    it('uses the given length', () => {
      expect(utilityFunctions.uid(null, '12')).toHaveLength(12);
    });

    it('throws on invalid length', () => {
      expect(() => utilityFunctions.uid(null, '0')).toThrow('Length must be an integer greater than 0');
    });
  });
});
