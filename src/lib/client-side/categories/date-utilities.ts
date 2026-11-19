import type { UtilityCategory } from '../../../types/UtilityList';

export const dateUtilities: UtilityCategory = {
  now: {
    description: 'Returns the current date with lot of formatting options',
    docs: 'If token is provided, <code>Format</code> will not be used',
    revealClasses: ['dateUtilities_now'],
    configArgs: 'dateUtilities',
  },
  format: {
    description: 'Return formatted date from a date',
    docs: 'If token is provided, <code>Format</code> will not be used',
    revealClasses: ['dateUtilities_now'],
    configArgs: 'dateUtilities',
  },
  timeRange: {
    description: 'Routes messages depending on the time',
    docs: 'Time range checker that validates if current time is<br>between given start and end times (HH:mm format), on the checked days. A range crossing midnight belongs to the day it started.',
    revealClasses: ['dateUtilities_timeRange'],
    configArgs: 'dateUtilities',
    forceSplitBooleanOutputs: true,
  },
  currentTimezone: {
    description: 'Returns the current timezone',
  },
  add: {
    description: 'Adds a duration to the date (negative amount to subtract), returns an ISO 8601 date',
    revealClasses: ['dateUtilities_add'],
    configArgs: 'dateUtilities',
  },
  diff: {
    description: 'Returns the whole units between the date and the reference date (negative if the date is before)',
    docs: 'Empty reference date means now',
    revealClasses: ['dateUtilities_diff', 'dateUtilities_reference'],
    configArgs: 'dateUtilities',
  },
  startOf: {
    description: 'Returns the start of the minute, hour, day, week (Monday), month or year, as an ISO 8601 date',
    revealClasses: ['dateUtilities_boundary'],
    configArgs: 'dateUtilities',
  },
  endOf: {
    description: 'Returns the end of the minute, hour, day, week (Sunday), month or year, as an ISO 8601 date',
    revealClasses: ['dateUtilities_boundary'],
    configArgs: 'dateUtilities',
  },
  isPast: {
    description: 'True if the date is in the past',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isFuture: {
    description: 'True if the date is in the future',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isBefore: {
    description: 'True if the date is before the reference date',
    docs: 'Empty reference date means now',
    revealClasses: ['dateUtilities_reference'],
    configArgs: 'dateUtilities',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isAfter: {
    description: 'True if the date is after the reference date',
    docs: 'Empty reference date means now',
    revealClasses: ['dateUtilities_reference'],
    configArgs: 'dateUtilities',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  sameDay: {
    description: 'True if the date is on the same day as the reference date',
    docs: 'Empty reference date means now',
    revealClasses: ['dateUtilities_reference'],
    configArgs: 'dateUtilities',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isWeekend: {
    description: 'True if the date is a Saturday or a Sunday',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  dayOfYear: {
    description: 'Returns the day number in the year (1 to 366)',
  },
  monthDays: {
    description: 'Returns the number of days in the month of the date',
  },
};
