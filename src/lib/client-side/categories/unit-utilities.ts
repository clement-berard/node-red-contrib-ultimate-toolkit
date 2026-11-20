import type { UtilityCategory } from '../../../types/UtilityList';
import { mdn } from '../../../utils/docs';
import { bytesFields, durationFields, speedFields, temperatureFields } from './unit-fields';

export const unitUtilities: UtilityCategory = {
  formatBytes: {
    description: "Formats a number of bytes: 1536 → '1.5 KB'",
    fields: bytesFields,
    docs: mdn('Intl/NumberFormat'),
  },
  formatDuration: {
    description: "Formats a duration in seconds or milliseconds: 3661 → '1h 1m 1s'",
    fields: durationFields,
  },
  parseDuration: {
    description: "Reads a duration text in seconds or milliseconds: '1h 30m' → 5400. Units: d, h, m, s, ms",
    fields: durationFields,
  },
  temperature: {
    description: 'Converts a temperature between °C, °F and K',
    fields: temperatureFields,
  },
  speed: {
    description: 'Converts a speed between m/s, km/h, mph and knots',
    fields: speedFields,
  },
};
