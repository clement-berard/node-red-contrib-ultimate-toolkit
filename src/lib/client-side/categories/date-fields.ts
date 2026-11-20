import { type ConfigOf, field } from '../../../utils/fields';

const ADD_UNITS = ['day', 'week', 'month', 'year', 'hour', 'minute', 'second', 'millisecond'] as const;
const BOUNDARY_UNITS = ['day', 'week', 'month', 'year', 'hour', 'minute'] as const;

export const nowFields = {
  nowFormat: field.select(['timestamp', 'iso8601', 'utcString', 'full', 'long', 'medium', 'short'], {
    default: 'timestamp',
    i18n: 'format',
    rawOptions: true,
  }),
  nowFormatToken: field.text({ default: '', i18n: 'token', placeholder: 'YYYY-MM-DD' }),
};

// a day unchecked is saved as false, an absent key means allowed
const weekDay = (day: number) =>
  field.checkbox({ default: true, group: 'activeDays', i18n: `weekday_${day}`, icon: 'calendar' });

export const timeRangeFields = {
  rangeStartTime: field.time({ i18n: 'startTime', icon: 'clock-o' }),
  rangeEndTime: field.time({ i18n: 'endTime', icon: 'clock-o' }),
  // Monday first, 0 is Sunday
  rangeDay1: weekDay(1),
  rangeDay2: weekDay(2),
  rangeDay3: weekDay(3),
  rangeDay4: weekDay(4),
  rangeDay5: weekDay(5),
  rangeDay6: weekDay(6),
  rangeDay0: weekDay(0),
};

export const addFields = {
  addAmount: field.number({ default: '1', step: 'any', i18n: 'amount', icon: 'plus' }),
  addUnit: field.select(ADD_UNITS, { default: 'day', i18n: 'unit' }),
};

export const diffFields = { diffUnit: field.select(ADD_UNITS, { default: 'day', i18n: 'unit' }) };

export const boundaryFields = { boundaryUnit: field.select(BOUNDARY_UNITS, { default: 'day', i18n: 'unit' }) };

// Empty means now
export const referenceFields = {
  reference: field.typed({
    i18n: 'referenceDate',
    icon: 'calendar',
    hint: true,
    types: ['str', 'msg', 'flow', 'global', 'jsonata', 'env'],
    defaultType: 'str',
  }),
};

// Everything saved under `dateUtilities`, for the typed options of the functions
export type DateConfig = ConfigOf<
  typeof nowFields &
    typeof timeRangeFields &
    typeof addFields &
    typeof diffFields &
    typeof boundaryFields &
    typeof referenceFields
>;
