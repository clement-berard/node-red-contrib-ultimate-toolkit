import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

  describe('unknown format', () => {
    it('throws a readable error', () => {
      expect(() => dateUtilities.now(null, { nowFormat: 'nope', nowFormatToken: '' } as any)).toThrow(
        'Unknown format "nope"',
      );
    });
  });

  describe('currentTimezone', () => {
    it('returns the RED setting when defined', () => {
      (globalThis as any).RED = { settings: { timezone: 'Europe/Paris' } };
      expect(dateUtilities.currentTimezone()).toBe('Europe/Paris');
      delete (globalThis as any).RED;
    });
  });

  describe('timeRange days', () => {
    afterEach(() => vi.useRealTimers());
    const range = { rangeStartTime: '09:00', rangeEndTime: '18:00' };

    it('keeps every day when no day is set (nodes saved before the option)', () => {
      vi.setSystemTime(new Date('2026-07-26T14:00:00')); // Sunday
      expect(dateUtilities.timeRange(null, range as any)).toBe(true);
    });

    it('refuses an unchecked day', () => {
      vi.setSystemTime(new Date('2026-07-26T14:00:00')); // Sunday
      expect(dateUtilities.timeRange(null, { ...range, rangeDay0: false } as any)).toBe(false);
    });

    it('accepts a checked day', () => {
      vi.setSystemTime(new Date('2026-07-27T14:00:00')); // Monday
      expect(dateUtilities.timeRange(null, { ...range, rangeDay0: false, rangeDay1: true } as any)).toBe(true);
    });

    it('gives the part after midnight of a range to the day it started', () => {
      const overnight = { rangeStartTime: '22:00', rangeEndTime: '06:00', rangeDay5: true, rangeDay6: false };
      vi.setSystemTime(new Date('2026-07-25T02:00:00')); // Saturday 02:00, started Friday
      expect(dateUtilities.timeRange(null, overnight as any)).toBe(true);
      vi.setSystemTime(new Date('2026-07-25T23:00:00')); // Saturday 23:00, started Saturday
      expect(dateUtilities.timeRange(null, overnight as any)).toBe(false);
    });
  });

  describe('add', () => {
    it.each([
      ['year', 1, '2027-07-25T10:00:00.000Z'],
      ['month', 1, '2026-08-25T10:00:00.000Z'],
      ['week', 1, '2026-08-01T10:00:00.000Z'],
      ['day', -1, '2026-07-24T10:00:00.000Z'],
      ['hour', 2, '2026-07-25T12:00:00.000Z'],
      ['minute', 30, '2026-07-25T10:30:00.000Z'],
      ['second', 10, '2026-07-25T10:00:10.000Z'],
      ['millisecond', 5, '2026-07-25T10:00:00.005Z'],
    ])('adds %s', (addUnit, addAmount, expected) => {
      expect(dateUtilities.add('2026-07-25T10:00:00.000Z', { addAmount: String(addAmount), addUnit } as any)).toBe(
        expected,
      );
    });

    it('accepts a timestamp', () => {
      const ts = Date.UTC(2026, 6, 25, 10);
      expect(dateUtilities.add(ts, { addAmount: '1', addUnit: 'hour' } as any)).toBe('2026-07-25T11:00:00.000Z');
    });

    it('throws on a missing amount, an unknown unit and a bad date', () => {
      expect(() => dateUtilities.add('2026-07-25', { addUnit: 'day' } as any)).toThrow('Amount must be a number');
      expect(() => dateUtilities.add('2026-07-25', { addAmount: '1', addUnit: 'x' } as any)).toThrow(
        'Unknown unit "x"',
      );
      expect(() => dateUtilities.add('nope', { addAmount: '1', addUnit: 'day' } as any)).toThrow(
        'payloadDate is not a valid date',
      );
      expect(() => dateUtilities.add('', { addAmount: '1', addUnit: 'day' } as any)).toThrow('payloadDate is required');
    });
  });

  describe('diff', () => {
    it('returns the whole units between the date and the reference', () => {
      const options = { diffUnit: 'hour', reference: '2026-07-25T10:00:00.000Z' } as any;
      expect(dateUtilities.diff('2026-07-25T12:30:00.000Z', options)).toBe(2);
      expect(dateUtilities.diff('2026-07-25T08:00:00.000Z', options)).toBe(-2);
    });

    it.each([
      ['year', 1],
      ['month', 12],
      ['week', 52],
      ['day', 365],
    ])('supports %s', (diffUnit, expected) => {
      expect(
        dateUtilities.diff('2027-07-25T10:00:00.000Z', { diffUnit, reference: '2026-07-25T10:00:00.000Z' } as any),
      ).toBe(expected);
    });

    it('uses now when the reference is empty', () => {
      vi.setSystemTime(new Date('2026-07-25T10:00:00.000Z'));
      expect(dateUtilities.diff('2026-07-25T10:05:00.000Z', { diffUnit: 'minute', reference: ' ' } as any)).toBe(5);
      vi.useRealTimers();
    });

    it('throws on an unknown unit or an invalid reference', () => {
      expect(() => dateUtilities.diff('2026-07-25', { diffUnit: 'x' } as any)).toThrow('Unknown unit "x"');
      expect(() => dateUtilities.diff('2026-07-25', { diffUnit: 'day', reference: 'nope' } as any)).toThrow(
        'reference is not a valid date',
      );
    });
  });

  describe('startOf and endOf', () => {
    const at = (iso: string) => new Date(iso).toISOString();
    const date = '2026-07-25T10:20:30'; // Saturday, local time

    it.each([
      ['minute', '2026-07-25T10:20:00', '2026-07-25T10:20:59.999'],
      ['hour', '2026-07-25T10:00:00', '2026-07-25T10:59:59.999'],
      ['day', '2026-07-25T00:00:00', '2026-07-25T23:59:59.999'],
      ['week', '2026-07-20T00:00:00', '2026-07-26T23:59:59.999'],
      ['month', '2026-07-01T00:00:00', '2026-07-31T23:59:59.999'],
      ['year', '2026-01-01T00:00:00', '2026-12-31T23:59:59.999'],
    ])('%s', (boundaryUnit, start, end) => {
      expect(dateUtilities.startOf(date, { boundaryUnit } as any)).toBe(at(start));
      expect(dateUtilities.endOf(date, { boundaryUnit } as any)).toBe(at(end));
    });

    it('throws on an unknown unit', () => {
      expect(() => dateUtilities.startOf(date, { boundaryUnit: 'x' } as any)).toThrow('Unknown unit "x"');
    });
  });

  describe('comparisons', () => {
    afterEach(() => vi.useRealTimers());

    it('isPast and isFuture', () => {
      vi.setSystemTime(new Date('2026-07-25T10:00:00.000Z'));
      expect(dateUtilities.isPast('2026-07-24T10:00:00.000Z')).toBe(true);
      expect(dateUtilities.isPast('2026-07-26T10:00:00.000Z')).toBe(false);
      expect(dateUtilities.isFuture('2026-07-26T10:00:00.000Z')).toBe(true);
      expect(dateUtilities.isFuture('2026-07-24T10:00:00.000Z')).toBe(false);
    });

    it('isBefore and isAfter compare with the reference, or now when empty', () => {
      const options = { reference: '2026-07-25T10:00:00.000Z' } as any;
      expect(dateUtilities.isBefore('2026-07-25T09:00:00.000Z', options)).toBe(true);
      expect(dateUtilities.isBefore('2026-07-25T11:00:00.000Z', options)).toBe(false);
      expect(dateUtilities.isAfter('2026-07-25T11:00:00.000Z', options)).toBe(true);
      expect(dateUtilities.isAfter('2026-07-25T09:00:00.000Z', options)).toBe(false);
      vi.setSystemTime(new Date('2026-07-25T10:00:00.000Z'));
      expect(dateUtilities.isBefore('2026-07-25T09:00:00.000Z', {} as any)).toBe(true);
    });

    it('accepts a timestamp or a Date as the reference, as given by a typed input', () => {
      const timestamp = Date.parse('2026-07-25T10:00:00.000Z');
      expect(dateUtilities.isBefore('2026-07-25T09:00:00.000Z', { reference: timestamp } as any)).toBe(true);
      expect(dateUtilities.isAfter('2026-07-25T09:00:00.000Z', { reference: new Date(timestamp) } as any)).toBe(false);
      expect(dateUtilities.isAfter('2026-07-25T09:00:00.000Z', { reference: null } as any)).toBe(false);
    });

    it('sameDay', () => {
      const options = { reference: '2026-07-25T20:00:00' } as any;
      expect(dateUtilities.sameDay('2026-07-25T01:00:00', options)).toBe(true);
      expect(dateUtilities.sameDay('2026-07-26T01:00:00', options)).toBe(false);
    });

    it('isWeekend', () => {
      expect(dateUtilities.isWeekend('2026-07-25T12:00:00')).toBe(true); // Saturday
      expect(dateUtilities.isWeekend('2026-07-26T12:00:00')).toBe(true); // Sunday
      expect(dateUtilities.isWeekend('2026-07-27T12:00:00')).toBe(false); // Monday
    });
  });

  describe('dayOfYear and monthDays', () => {
    it('returns the day number in the year', () => {
      expect(dateUtilities.dayOfYear('2026-02-01T12:00:00')).toBe(32);
    });

    it('returns the number of days in the month', () => {
      expect(dateUtilities.monthDays('2026-02-10T12:00:00')).toBe(28);
      expect(dateUtilities.monthDays('2028-02-10T12:00:00')).toBe(29);
    });
  });
});

describe('dateUtilities relative and age', () => {
  const options = (extra: Record<string, unknown> = {}) =>
    ({ reference: '2026-07-25T12:00:00.000Z', locale: 'en', ...extra }) as any;

  it('formatRelative picks the unit and the direction', () => {
    const format = (date: string, extra?: Record<string, unknown>) =>
      dateUtilities.formatRelative(date, options(extra));
    expect(format('2026-07-25T12:00:00.000Z')).toBe('now');
    expect(format('2026-07-25T11:59:30.000Z')).toBe('30 seconds ago');
    expect(format('2026-07-25T15:00:00.000Z')).toBe('in 3 hours');
    expect(format('2026-07-24T12:00:00.000Z')).toBe('yesterday');
    expect(format('2026-07-20T12:00:00.000Z')).toBe('5 days ago');
    expect(format('2026-05-25T12:00:00.000Z')).toBe('2 months ago');
    expect(format('2028-07-25T12:00:00.000Z')).toBe('in 2 years');
  });

  it('formatRelative follows the locale and uses now without reference', () => {
    expect(dateUtilities.formatRelative('2026-07-24T12:00:00.000Z', options({ locale: 'fr' }))).toBe('hier');
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-25T12:00:00.000Z'));
    expect(dateUtilities.formatRelative('2026-07-25T09:00:00.000Z', { locale: 'en' } as any)).toBe('3 hours ago');
    vi.useRealTimers();
  });

  it('age counts the whole years', () => {
    expect(dateUtilities.age('1990-07-26T00:00:00.000Z', options())).toBe(35);
    expect(dateUtilities.age('1990-07-25T00:00:00.000Z', options())).toBe(36);
    expect(() => dateUtilities.age('nope', options())).toThrow('payloadDate is not a valid date');
  });
});
