import { format } from '@formkit/tempo';
import type { NodeMainProps } from '../../nodes/main/types';
function getCurrentTimezone() {
  const timezoneDefault = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // @ts-ignore
  return RED.settings.timezone || process.env.TZ || timezoneDefault;
}

export const dateUtilities = {
  now: (_: unknown, options: NodeMainProps['dateUtilities']) => {
    const date = new Date();
    console.log('options', options);

    if (options?.nowFormatToken.trim()) {
      return format(date, options.nowFormatToken.trim());
    }

    const matched = {
      timestamp: () => Date.now(),
      full: () => format(date, 'full'),
      long: () => format(date, 'long'),
      medium: () => format(date, 'medium'),
      short: () => format(date, 'short'),
    };

    return matched[options.nowFormat]();
  },
  currentTimezone: getCurrentTimezone,
};
