import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { tools } from '../tools';

const params = (maxCount: string, nodeId: string, resetDelay = '') => ({
  'cyclicCounter-maxCount': maxCount,
  'cyclicCounter-resetDelay': resetDelay,
  nodeId,
});

describe('tools', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    tools.clearCounter();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('cyclicCounter', () => {
    it('cycles from 1 to maxCount then restarts', () => {
      const values = [1, 2, 3, 4].map(() => tools.cyclicCounter(0, params('3', 'a')));
      expect(values).toEqual([1, 2, 3, 1]);
    });

    it('keeps one counter per node', () => {
      tools.cyclicCounter(0, params('3', 'a'));
      expect(tools.cyclicCounter(0, params('3', 'b'))).toBe(1);
    });

    it('resets after resetDelay', () => {
      tools.cyclicCounter(0, params('5', 'a', '1000'));
      expect(tools.cyclicCounter(0, params('5', 'a', '1000'))).toBe(2);
      vi.advanceTimersByTime(1000);
      expect(tools.cyclicCounter(0, params('5', 'a', '1000'))).toBe(1);
    });
  });

  describe('clearCounter', () => {
    it('clears counters', () => {
      tools.cyclicCounter(0, params('5', 'a'));
      tools.clearCounter();
      expect(tools.cyclicCounter(0, params('5', 'a'))).toBe(1);
    });
  });
});
