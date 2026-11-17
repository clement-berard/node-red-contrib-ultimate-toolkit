import { describe, expect, it } from 'vitest';
import { predicates } from '../predicates';

describe('predicates', () => {
  it('detects types', () => {
    expect(predicates.isArray([])).toBe(true);
    expect(predicates.isArray({})).toBe(false);
    expect(predicates.isDate(new Date())).toBe(true);
    expect(predicates.isError(new Error('x'))).toBe(true);
    expect(predicates.isPrimitive('a')).toBe(true);
    expect(predicates.isPrimitive({})).toBe(false);
  });

  it('isPlainObject and isEmptyObject', () => {
    expect(predicates.isPlainObject({ a: 1 })).toBe(true);
    expect(predicates.isPlainObject([])).toBe(false);
    expect(predicates.isEmptyObject({})).toBe(true);
    expect(predicates.isEmptyObject({ a: 1 })).toBe(false);
  });

  it('isEmpty and isNotNil', () => {
    expect(predicates.isEmpty('')).toBe(true);
    expect(predicates.isEmpty([1])).toBe(false);
    expect(predicates.isNotNil(0)).toBe(true);
    expect(predicates.isNotNil(null)).toBe(false);
  });

  it('isJSON', () => {
    expect(predicates.isJSON('{"a":1}')).toBe(true);
    expect(predicates.isJSON('{a:1}')).toBe(false);
  });

  it('isInt and isFloat', () => {
    expect(predicates.isInt(1)).toBe(true);
    expect(predicates.isInt(1.5)).toBe(false);
    expect(predicates.isFloat(1.5)).toBe(true);
    expect(predicates.isFloat(1)).toBe(false);
  });

  describe('isEqual', () => {
    it('compares with a parsed JSON value', () => {
      expect(predicates.isEqual({ a: 1 }, '{"a":1}')).toBe(true);
      expect(predicates.isEqual(5, '5')).toBe(true);
      expect(predicates.isEqual(5, '6')).toBe(false);
    });

    it('falls back to the raw text when not JSON', () => {
      expect(predicates.isEqual('hello', 'hello')).toBe(true);
    });
  });

  describe('basic types', () => {
    it('detects primitives', () => {
      expect(predicates.isBoolean(true)).toBe(true);
      expect(predicates.isBoolean('true')).toBe(false);
      expect(predicates.isNumber(1)).toBe(true);
      expect(predicates.isNumber('1')).toBe(false);
      expect(predicates.isString('a')).toBe(true);
      expect(predicates.isString(1)).toBe(false);
      expect(predicates.isBuffer(Buffer.from('a'))).toBe(true);
    });

    it('detects nil values', () => {
      expect(predicates.isNil(null)).toBe(true);
      expect(predicates.isNil(undefined)).toBe(true);
      expect(predicates.isNil(0)).toBe(false);
      expect(predicates.isNull(null)).toBe(true);
      expect(predicates.isNull(undefined)).toBe(false);
      expect(predicates.isUndefined(undefined)).toBe(true);
      expect(predicates.isNotNil(0)).toBe(true);
      expect(predicates.isNaN(Number.NaN)).toBe(true);
      expect(predicates.isNaN('a')).toBe(false);
    });
  });

  describe('network and shape', () => {
    it('validates IPs and URLs', () => {
      expect(predicates.isIp('127.0.0.1')).toBe(true);
      expect(predicates.isIp('nope')).toBe(false);
      expect(predicates.isUrl('https://example.com')).toBe(true);
      expect(predicates.isUrl('not a url')).toBe(false);
    });

    it('validates objects, emptiness, JSON and numbers', () => {
      expect(predicates.isPlainObject({})).toBe(true);
      expect(predicates.isPlainObject([])).toBe(false);
      expect(predicates.isEmptyObject({})).toBe(true);
      expect(predicates.isEmptyObject({ a: 1 })).toBe(false);
      expect(predicates.isEmpty([])).toBe(true);
      expect(predicates.isEmpty([1])).toBe(false);
      expect(predicates.isJSON('{"a":1}')).toBe(true);
      expect(predicates.isJSON('{a')).toBe(false);
      expect(predicates.isInt(1)).toBe(true);
      expect(predicates.isInt(1.5)).toBe(false);
      expect(predicates.isFloat(1.5)).toBe(true);
      expect(predicates.isFloat(1)).toBe(false);
    });
  });
});
