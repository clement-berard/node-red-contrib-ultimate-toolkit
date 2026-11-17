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
    docs: 'Time range checker that validates if current time is<br>between given start and end times (HH:mm format).',
    revealClasses: ['dateUtilities_timeRange'],
    configArgs: 'dateUtilities',
    forceSplitBooleanOutputs: true,
  },
  currentTimezone: {
    description: 'Returns the current timezone',
  },
};
