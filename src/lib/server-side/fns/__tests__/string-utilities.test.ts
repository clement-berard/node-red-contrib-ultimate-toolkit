import { describe, expect, it } from 'vitest';
import { stringUtilities } from '../string-utilities';

describe('stringUtilities', () => {
  it('deburr removes accents', () => {
    expect(stringUtilities.deburr('crème brûlée')).toBe('creme brulee');
  });

  it('sentenceCase and title', () => {
    expect(stringUtilities.sentenceCase('fooBar')).toBe('Foo bar');
    expect(stringUtilities.title('hello world')).toBe('Hello World');
  });

  it('reverseString reverses characters', () => {
    expect(stringUtilities.reverseString('abc')).toBe('cba');
  });

  it('escapeRegExp escapes special characters', () => {
    expect(stringUtilities.escapeRegExp('a.b*c')).toBe('a\\.b\\*c');
  });

  it('dedent removes common indentation', () => {
    expect(stringUtilities.dedent('  a\n  b')).toBe('a\nb');
  });

  describe('pad', () => {
    it('centers the text', () => {
      expect(stringUtilities.pad('ab', '6')).toBe('  ab  ');
    });

    it('throws on invalid length', () => {
      expect(() => stringUtilities.pad('ab', 'x')).toThrow('Length must be a positive integer');
    });
  });
});
