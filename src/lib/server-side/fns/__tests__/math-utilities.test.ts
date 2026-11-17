import { describe, expect, it } from 'vitest';
import { mathUtilities } from '../math-utilities';

describe('mathUtilities', () => {
  describe('clamp', () => {
    it('restricts the number between min and max', () => {
      expect(mathUtilities.clamp(15, { min: '0', max: '10' })).toBe(10);
      expect(mathUtilities.clamp(-5, { min: '0', max: '10' })).toBe(0);
      expect(mathUtilities.clamp(5, { min: '0', max: '10' })).toBe(5);
    });

    it('throws when a bound is missing', () => {
      expect(() => mathUtilities.clamp(5, { min: '0' })).toThrow('Max must be a number');
    });
  });

  describe('inRange', () => {
    it('includes min and excludes max', () => {
      expect(mathUtilities.inRange(0, { min: '0', max: '10' })).toBe(true);
      expect(mathUtilities.inRange(10, { min: '0', max: '10' })).toBe(false);
    });

    it('throws when a bound is invalid', () => {
      expect(() => mathUtilities.inRange(5, { min: 'x', max: '10' })).toThrow('Min must be a number');
    });
  });
});
