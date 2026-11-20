import { type ConfigOf, field } from '../../../utils/fields';

const TEMPERATURES = ['°C', '°F', 'K'] as const;
const SPEEDS = ['m/s', 'km/h', 'mph', 'kn'] as const;

const decimals = field.number({ default: '1', min: 0, i18n: 'decimals' });

export const bytesFields = {
  base: field.select(['1024', '1000'], { default: '1024', rawOptions: true }),
  decimals,
};

export const durationFields = {
  durationUnit: field.select(['seconds', 'milliseconds'], { default: 'seconds' }),
};

export const temperatureFields = {
  temperatureFrom: field.select(TEMPERATURES, { default: '°C', i18n: 'from', rawOptions: true }),
  temperatureTo: field.select(TEMPERATURES, { default: '°F', i18n: 'to', rawOptions: true }),
  decimals,
};

export const speedFields = {
  speedFrom: field.select(SPEEDS, { default: 'km/h', i18n: 'from', rawOptions: true }),
  speedTo: field.select(SPEEDS, { default: 'mph', i18n: 'to', rawOptions: true }),
  decimals,
};

// Everything saved under `unitUtilities`, for the typed options of the functions
export type UnitConfig = ConfigOf<
  typeof bytesFields & typeof durationFields & typeof temperatureFields & typeof speedFields
>;
