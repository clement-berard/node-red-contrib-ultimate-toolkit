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

  describe('conversions', () => {
    it('toNumber, toString and toSafeInteger', () => {
      expect(utilityFunctions.toNumber('42')).toBe(42);
      expect(utilityFunctions.toString(42)).toBe('42');
      expect(utilityFunctions.toSafeInteger('3.9')).toBe(3);
    });

    it('toNumberNonStrict keeps non numeric input', () => {
      expect(utilityFunctions.toNumberNonStrict('42')).toBe(42);
      expect(utilityFunctions.toNumberNonStrict('abc')).toBe('abc');
    });

    it('toBoolean and toBooleanNumber', () => {
      expect(utilityFunctions.toBoolean('a')).toBe(true);
      expect(utilityFunctions.toBoolean('')).toBe(false);
      expect(utilityFunctions.toBooleanNumber('a')).toBe(0);
      expect(utilityFunctions.toBooleanNumber('')).toBe(1);
    });
  });

  describe('comparisons', () => {
    it('gt, gte, lt, lte coerce to number', () => {
      expect(utilityFunctions.gt('5', '3')).toBe(true);
      expect(utilityFunctions.gte('3', '3')).toBe(true);
      expect(utilityFunctions.lt('2', '3')).toBe(true);
      expect(utilityFunctions.lte('4', '3')).toBe(false);
    });

    it('eq and size', () => {
      expect(utilityFunctions.eq(1, 1)).toBe(true);
      expect(utilityFunctions.eq(1, 2)).toBe(false);
      expect(utilityFunctions.size([1, 2, 3])).toBe(3);
    });
  });
});
