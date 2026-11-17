import { afterEach, describe, expect, it, vi } from 'vitest';
import { asyncUtilities } from '../async-utilities';

describe('asyncUtilities', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('delay', () => {
    it.each(['abc', '-5'])('throws on invalid milliseconds %j', (milliseconds) => {
      expect(() => asyncUtilities.delay(null, { milliseconds } as any)).toThrow(
        'Milliseconds must be a positive number',
      );
    });

    it('resolves after the given milliseconds', async () => {
      vi.useFakeTimers();
      let done = false;
      const promise = asyncUtilities.delay(null, { milliseconds: 500 } as any).then(() => {
        done = true;
      });
      await vi.advanceTimersByTimeAsync(499);
      expect(done).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      await promise;
      expect(done).toBe(true);
    });
  });
});
