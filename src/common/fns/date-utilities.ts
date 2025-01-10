import { date, format } from '@formkit/tempo';
import type { NodeMainProps } from '../../types/NodeMainProps';
function getCurrentTimezone() {
  const timezoneDefault = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // @ts-ignore
  return RED.settings.timezone || process.env.TZ || timezoneDefault;
}

function formatDate(innerDate: Date | string, options: NodeMainProps['dateUtilities']) {
  const realDate = date(innerDate);

  if (options?.nowFormatToken.trim()) {
    return format(realDate, options.nowFormatToken.trim());
  }

  const matched = {
    timestamp: () => Date.now(),
    full: () => format(realDate, 'full'),
    long: () => format(realDate, 'long'),
    medium: () => format(realDate, 'medium'),
    short: () => format(realDate, 'short'),
    iso8601: () => realDate.toISOString(),
    utcString: () => realDate.toUTCString(),
  };

  return matched[options.nowFormat]();
}

export const dateUtilities = {
  now: (_: unknown, options: NodeMainProps['dateUtilities']) => {
    return formatDate(new Date(), options);
  },
  format: (payloadDate: string, options: NodeMainProps['dateUtilities']) => {
    if (!payloadDate) {
      throw new Error('payloadDate is required');
    }

    return formatDate(payloadDate, options);
  },
  timeRange: (payload: unknown, options: NodeMainProps['dateUtilities']) => {
    const currentTime = format(new Date(), 'HH:mm');

    if (!options?.rangeStartTime || !options?.rangeEndTime) {
      throw new Error('rangeStartTime and rangeEndTime are required');
    }

    if (options?.rangeStartTime > options?.rangeEndTime) {
      return currentTime >= options?.rangeStartTime || currentTime <= options?.rangeEndTime;
    }

    return currentTime >= options?.rangeStartTime && currentTime <= options?.rangeEndTime;
  },
  currentTimezone: getCurrentTimezone,
};
