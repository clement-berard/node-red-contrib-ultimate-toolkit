import {
  addDay,
  addHour,
  addMillisecond,
  addMinute,
  addMonth,
  addSecond,
  addYear,
  date,
  dayEnd,
  dayOfYear,
  dayStart,
  diffDays,
  diffHours,
  diffMilliseconds,
  diffMinutes,
  diffMonths,
  diffSeconds,
  diffWeeks,
  diffYears,
  format,
  hourEnd,
  hourStart,
  isFuture,
  isPast,
  minuteEnd,
  minuteStart,
  monthDays,
  monthEnd,
  monthStart,
  sameDay,
  weekEnd,
  weekStart,
  yearEnd,
  yearStart,
} from '@formkit/tempo';
import type { DateConfig } from '../../client-side/categories/date-fields';

function getCurrentTimezone() {
  const timezoneDefault = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // @ts-expect-error
  return RED.settings.timezone || process.env.TZ || timezoneDefault;
}

function formatDate(innerDate: Date | string, options: DateConfig) {
  const realDate = date(innerDate);

  if (options?.nowFormatToken?.trim()) {
    return format(realDate, options.nowFormatToken.trim());
  }

  const matched: Record<string, () => string | number> = {
    timestamp: () => Date.now(),
    full: () => format(realDate, 'full'),
    long: () => format(realDate, 'long'),
    medium: () => format(realDate, 'medium'),
    short: () => format(realDate, 'short'),
    iso8601: () => realDate.toISOString(),
    utcString: () => realDate.toUTCString(),
  };

  const formatter = matched[options?.nowFormat ?? ''];
  if (!formatter) {
    throw new Error(`Unknown format "${options?.nowFormat}"`);
  }
  return formatter();
}

type DateOptions = DateConfig;

// Weeks start on Monday
const MONDAY = 1;

const ADD_UNITS: Record<string, (input: Date, amount: number) => Date> = {
  year: addYear,
  month: addMonth,
  week: (input, amount) => addDay(input, amount * 7),
  day: addDay,
  hour: addHour,
  minute: addMinute,
  second: addSecond,
  millisecond: addMillisecond,
};

const DIFF_UNITS: Record<string, (a: Date, b: Date) => number> = {
  year: diffYears,
  month: diffMonths,
  week: diffWeeks,
  day: diffDays,
  hour: diffHours,
  minute: diffMinutes,
  second: diffSeconds,
  millisecond: diffMilliseconds,
};

const BOUNDARIES: Record<string, { start: (input: Date) => Date; end: (input: Date) => Date }> = {
  year: { start: yearStart, end: yearEnd },
  // monthEnd keeps the time of day, unlike the other ends
  month: { start: monthStart, end: (input) => dayEnd(monthEnd(input)) },
  week: { start: (input) => weekStart(input, MONDAY), end: (input) => weekEnd(input, MONDAY) },
  day: { start: dayStart, end: dayEnd },
  hour: { start: hourStart, end: hourEnd },
  minute: { start: minuteStart, end: minuteEnd },
};

function pickUnit<T>(units: Record<string, T>, unit: string | undefined): T {
  const found = unit ? units[unit] : undefined;
  if (!found) {
    throw new Error(`Unknown unit "${unit}"`);
  }
  return found;
}

// Accepts a Date, a timestamp in ms or a date string
function toDate(input: unknown, name = 'payloadDate') {
  if (input === undefined || input === null || input === '') {
    throw new Error(`${name} is required`);
  }
  let parsed: Date | undefined;
  try {
    parsed = typeof input === 'string' ? date(input) : new Date(input as number | Date);
  } catch {
    // tempo throws on a string it cannot read
  }
  if (!parsed || Number.isNaN(parsed.getTime())) {
    throw new Error(`${name} is not a valid date`);
  }
  return parsed;
}

// Empty reference date means "now"; it is a string, a timestamp or a Date, already evaluated by the controller
function toReference(options: DateOptions) {
  const reference = typeof options?.reference === 'string' ? options.reference.trim() : options?.reference;
  return reference === undefined || reference === null || reference === ''
    ? new Date()
    : toDate(reference, 'reference');
}

const SECOND = 1000;
// Units of the relative format, the first one whose limit is not reached wins
const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number, number][] = [
  ['second', SECOND, 60],
  ['minute', 60 * SECOND, 60],
  ['hour', 60 * 60 * SECOND, 24],
  ['day', 24 * 60 * 60 * SECOND, 30],
  ['month', 30 * 24 * 60 * 60 * SECOND, 12],
  ['year', 365 * 24 * 60 * 60 * SECOND, Number.POSITIVE_INFINITY],
];

function formatRelative(target: Date, reference: Date, locale: string | undefined) {
  const diff = target.getTime() - reference.getTime();
  const [unit, size] = RELATIVE_UNITS.find(
    ([, unitSize, limit]) => Math.abs(diff) < unitSize * limit,
  ) as (typeof RELATIVE_UNITS)[number];
  return new Intl.RelativeTimeFormat(locale || undefined, { numeric: 'auto' }).format(Math.round(diff / size), unit);
}

export const dateUtilities = {
  now: (_: unknown, options: DateConfig) => {
    return formatDate(new Date(), options);
  },
  format: (payloadDate: string, options: DateConfig) => {
    if (!payloadDate) {
      throw new Error('payloadDate is required');
    }

    return formatDate(payloadDate, options);
  },
  timeRange: (_payload: unknown, options: DateConfig) => {
    const now = new Date();
    const currentTime = format(now, 'HH:mm');

    if (!options?.rangeStartTime || !options?.rangeEndTime) {
      throw new Error('rangeStartTime and rangeEndTime are required');
    }

    const crossesMidnight = options.rangeStartTime > options.rangeEndTime;
    const inRange = crossesMidnight
      ? currentTime >= options.rangeStartTime || currentTime <= options.rangeEndTime
      : currentTime >= options.rangeStartTime && currentTime <= options.rangeEndTime;

    // `rangeDay<0-6>` (0 = Sunday): a day is allowed unless explicitly unchecked, so older nodes keep every day.
    // After midnight, a range crossing midnight still belongs to the day it started.
    const startedYesterday = crossesMidnight && currentTime < options.rangeStartTime;
    const day = (now.getDay() - (startedYesterday ? 1 : 0) + 7) % 7;

    return inRange && (options as Record<string, unknown>)[`rangeDay${day}`] !== false;
  },
  currentTimezone: getCurrentTimezone,
  add: (payloadDate: unknown, options: DateOptions) => {
    const amount = Number(options?.addAmount);
    if (options?.addAmount === undefined || options?.addAmount === '' || !Number.isFinite(amount)) {
      throw new Error('Amount must be a number');
    }
    return pickUnit(ADD_UNITS, options?.addUnit)(toDate(payloadDate), amount).toISOString();
  },
  // payload minus reference, whole units, negative when the payload is before the reference
  diff: (payloadDate: unknown, options: DateOptions) =>
    pickUnit(DIFF_UNITS, options?.diffUnit)(toDate(payloadDate), toReference(options)),
  startOf: (payloadDate: unknown, options: DateOptions) =>
    pickUnit(BOUNDARIES, options?.boundaryUnit).start(toDate(payloadDate)).toISOString(),
  endOf: (payloadDate: unknown, options: DateOptions) =>
    pickUnit(BOUNDARIES, options?.boundaryUnit).end(toDate(payloadDate)).toISOString(),
  isPast: (payloadDate: unknown) => isPast(toDate(payloadDate)),
  isFuture: (payloadDate: unknown) => isFuture(toDate(payloadDate)),
  isBefore: (payloadDate: unknown, options: DateOptions) => toDate(payloadDate) < toReference(options),
  isAfter: (payloadDate: unknown, options: DateOptions) => toDate(payloadDate) > toReference(options),
  sameDay: (payloadDate: unknown, options: DateOptions) => sameDay(toDate(payloadDate), toReference(options)),
  isWeekend: (payloadDate: unknown) => [0, 6].includes(toDate(payloadDate).getDay()),
  dayOfYear: (payloadDate: unknown) => dayOfYear(toDate(payloadDate)),
  monthDays: (payloadDate: unknown) => monthDays(toDate(payloadDate)),
  formatRelative: (payloadDate: unknown, options: DateOptions) =>
    formatRelative(toDate(payloadDate), toReference(options), options?.locale?.trim()),
  // the reference minus the birth date, whole years
  age: (payloadDate: unknown, options: DateOptions) => diffYears(toReference(options), toDate(payloadDate)),
};
