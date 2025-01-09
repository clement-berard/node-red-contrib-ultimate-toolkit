// import { format } from '@formkit/tempo';

function getCurrentTimezone() {
  const timezoneDefault = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // @ts-ignore
  return RED.settings.timezone || process.env.TZ || timezoneDefault;
}

export const dateUtilities = {
  now: () => {
    // const date = new Date();
    // @ts-ignore
    // const timezone = getCurrentTimezone();
    // These are the same:
    return Date.now();
  },
  currentTimezone: getCurrentTimezone,
};
