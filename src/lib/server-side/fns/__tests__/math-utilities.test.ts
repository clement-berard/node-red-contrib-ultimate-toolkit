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

  describe('Math wrappers', () => {
    it('applies the basic functions', () => {
      expect(mathUtilities.abs(-2)).toBe(2);
      expect(mathUtilities.ceil(1.2)).toBe(2);
      expect(mathUtilities.floor(1.8)).toBe(1);
      expect(mathUtilities.round(1.5)).toBe(2);
      expect(mathUtilities.trunc(-1.8)).toBe(-1);
      expect(mathUtilities.exp(0)).toBe(1);
      expect(mathUtilities.log(1)).toBe(0);
    });

    it('applies the trigonometric functions', () => {
      expect(mathUtilities.cos(0)).toBe(1);
      expect(mathUtilities.sin(0)).toBe(0);
      expect(mathUtilities.tan(0)).toBe(0);
      expect(mathUtilities.acos(1)).toBe(0);
      expect(mathUtilities.asin(0)).toBe(0);
      expect(mathUtilities.atan(0)).toBe(0);
    });

    it('random stays in [0, 1)', () => {
      const value = mathUtilities.random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });
  });

  describe('aggregates', () => {
    it('computes min, max, sum, mean and median', () => {
      expect(mathUtilities.min([3, 1, 2])).toBe(1);
      expect(mathUtilities.max([3, 1, 2])).toBe(3);
      expect(mathUtilities.sum([1, 2, 3])).toBe(6);
      expect(mathUtilities.mean([1, 2, 3])).toBe(2);
      expect(mathUtilities.median([1, 3, 2])).toBe(2);
    });
  });
});
