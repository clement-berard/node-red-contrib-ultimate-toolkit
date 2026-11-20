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

describe('parsers queryString', () => {
  it('parses a query string, a repeated key becomes an array', () => {
    expect(parsers.queryString('?a=1&b=2&b=3&c=x%20y', { action: 'auto' })).toEqual({
      a: '1',
      b: ['2', '3'],
      c: 'x y',
    });
  });

  it('stringifies an object, skipping null and undefined', () => {
    expect(parsers.queryString({ a: 1, b: [2, 3], c: 'x y', d: null, e: undefined }, { action: 'auto' })).toBe(
      'a=1&b=2&b=3&c=x+y',
    );
  });

  it('follows the forced action', () => {
    expect(parsers.queryString('a=1', { action: 'parse' })).toEqual({ a: '1' });
    expect(() => parsers.queryString({ a: 1 }, { action: 'parse' })).toThrow('Input must be a string');
    expect(parsers.queryString({ a: 1 }, { action: 'stringify' })).toBe('a=1');
  });

  it('rejects nested values and non object inputs', () => {
    expect(() => parsers.queryString({ a: { b: 1 } }, { action: 'auto' })).toThrow('"a" must be a primitive');
    expect(() => parsers.queryString(42, { action: 'auto' })).toThrow('Input must be a string or an object');
  });
});

describe('parsers url', () => {
  it('parses a URL', () => {
    expect(parsers.url('https://user:pw@example.com:8080/a/b?x=1&x=2#top', { action: 'auto' })).toEqual({
      href: 'https://user:pw@example.com:8080/a/b?x=1&x=2#top',
      origin: 'https://example.com:8080',
      protocol: 'https:',
      username: 'user',
      password: 'pw',
      host: 'example.com:8080',
      hostname: 'example.com',
      port: '8080',
      pathname: '/a/b',
      search: '?x=1&x=2',
      hash: '#top',
      query: { x: ['1', '2'] },
    });
  });

  it('builds a URL from an object, the query object wins over search', () => {
    expect(
      parsers.url(
        {
          protocol: 'http',
          hostname: 'example.com',
          port: 81,
          pathname: '/p',
          query: { a: [1, 2] },
          search: '?z=9',
          hash: 'h',
        },
        { action: 'auto' },
      ),
    ).toBe('http://example.com:81/p?a=1&a=2#h');
    expect(parsers.url({ hostname: 'example.com', search: '?z=9' }, { action: 'auto' })).toBe(
      'https://example.com/?z=9',
    );
  });

  it('round trips', () => {
    const url = 'https://example.com/a?x=1#h';
    expect(parsers.url(parsers.url(url, { action: 'parse' }) as any, { action: 'stringify' })).toBe(url);
  });

  it('rejects an invalid URL, a missing hostname and a non string forced parse', () => {
    expect(() => parsers.url('nope', { action: 'auto' })).toThrow('Input is not a valid URL');
    expect(() => parsers.url({ protocol: 'https' }, { action: 'auto' })).toThrow('hostname is required');
    expect(() => parsers.url({ hostname: 'a' }, { action: 'parse' })).toThrow('Input must be a string');
  });
});
