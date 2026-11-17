import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dateUtilities } from '../date-utilities';

describe('dateUtilities', () => {
  describe('format', () => {
    it('formats as iso8601', () => {
      const result = dateUtilities.format('2026-07-25T08:00:00.000Z', {
        nowFormat: 'iso8601',
        nowFormatToken: '',
      } as any);
      expect(result).toBe('2026-07-25T08:00:00.000Z');
    });

    it('uses custom token when provided', () => {
      const result = dateUtilities.format('2026-07-25T08:00:00.000Z', {
        nowFormat: 'short',
        nowFormatToken: 'YYYY-MM-DD',
      } as any);
      expect(result).toBe('2026-07-25');
    });

    it('throws when payloadDate is empty', () => {
      expect(() => dateUtilities.format('', {} as any)).toThrow('payloadDate is required');
    });
  });

  describe('timeRange', () => {
    beforeEach(() => vi.useRealTimers());

    it('handles normal range (start < end)', () => {
      vi.setSystemTime(new Date('2026-07-25T14:00:00'));
      const result = dateUtilities.timeRange(null, { rangeStartTime: '09:00', rangeEndTime: '18:00' } as any);
      expect(result).toBe(true);
      vi.useRealTimers();
    });

    it('handles range crossing midnight (start > end)', () => {
      vi.setSystemTime(new Date('2026-07-25T23:30:00'));
      const result = dateUtilities.timeRange(null, { rangeStartTime: '22:00', rangeEndTime: '06:00' } as any);
      expect(result).toBe(true);
      vi.useRealTimers();
    });

    it('throws when rangeStartTime is missing', () => {
      expect(() => dateUtilities.timeRange(null, { rangeEndTime: '18:00' } as any)).toThrow();
    });
  });

  describe('now', () => {
    const base = { nowFormatToken: '' } as any;

    it.each(['full', 'long', 'medium', 'short', 'iso8601', 'utcString'])('supports the %s format', (nowFormat) => {
      expect(dateUtilities.now(null, { ...base, nowFormat })).toBeTruthy();
    });

    it('returns a timestamp', () => {
      expect(typeof dateUtilities.now(null, { ...base, nowFormat: 'timestamp' })).toBe('number');
    });

    it('uses the custom token first', () => {
      expect(dateUtilities.now(null, { nowFormat: 'iso8601', nowFormatToken: 'YYYY' })).toMatch(/^\d{4}$/);
    });
  });

  describe('currentTimezone', () => {
    it('returns the RED setting when defined', () => {
      (globalThis as any).RED = { settings: { timezone: 'Europe/Paris' } };
      expect(dateUtilities.currentTimezone()).toBe('Europe/Paris');
      delete (globalThis as any).RED;
    });
  });
});
