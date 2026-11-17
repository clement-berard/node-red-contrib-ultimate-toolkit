import { describe, expect, it } from 'vitest';
import { parsers } from '../parsers';

describe('parsers', () => {
  describe('json', () => {
    describe('auto', () => {
      it('parses a string', () => {
        expect(parsers.json('{"a":1}', { action: 'auto' })).toEqual({ a: 1 });
      });

      it('stringifies anything else', () => {
        expect(parsers.json({ a: 1 }, { action: 'auto' })).toBe('{"a":1}');
        expect(parsers.json([1, 2], { action: 'auto' })).toBe('[1,2]');
      });

      it('is the default action', () => {
        expect(parsers.json('[1]', {})).toEqual([1]);
        expect(parsers.json({ a: 1 }, undefined as any)).toBe('{"a":1}');
      });

      it('throws on an invalid JSON string', () => {
        expect(() => parsers.json('{a', { action: 'auto' })).toThrow();
      });
    });

    describe('parse', () => {
      it('parses a string', () => {
        expect(parsers.json('{"a":[1,2]}', { action: 'parse' })).toEqual({ a: [1, 2] });
      });

      it('throws when the input is not a string', () => {
        expect(() => parsers.json({ a: 1 }, { action: 'parse' })).toThrow('Input must be a string');
      });

      it('throws on an invalid JSON string', () => {
        expect(() => parsers.json('nope', { action: 'parse' })).toThrow();
      });
    });

    describe('stringify', () => {
      it('stringifies objects and strings', () => {
        expect(parsers.json({ a: 1 }, { action: 'stringify' })).toBe('{"a":1}');
        expect(parsers.json('abc', { action: 'stringify' })).toBe('"abc"');
      });

      it('formats with 4 spaces when pretty', () => {
        expect(parsers.json({ a: 1 }, { action: 'stringify', pretty: true })).toBe('{\n    "a": 1\n}');
      });

      it('throws on a value that cannot be converted', () => {
        expect(() => parsers.json(undefined, { action: 'stringify' })).toThrow('Input cannot be converted to JSON');
      });
    });
  });
});
