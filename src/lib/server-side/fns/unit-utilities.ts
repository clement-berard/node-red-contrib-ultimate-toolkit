import { round } from 'es-toolkit';
import type { UnitConfig } from '../../client-side/categories/unit-fields';

const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

// Factors to meters per second
const SPEEDS: Record<string, number> = { 'm/s': 1, 'km/h': 1 / 3.6, mph: 0.44704, kn: 1852 / 3600 };

const DURATION_UNITS: [string, number][] = [
  ['d', 86_400_000],
  ['h', 3_600_000],
  ['m', 60_000],
  ['s', 1000],
  ['ms', 1],
];

const toNumber = (input: unknown, name = 'Input') => {
  const value = Number(input);
  if (input === '' || input === null || input === undefined || !Number.isFinite(value)) {
    throw new Error(`${name} must be a number`);
  }
  return value;
};

const toDecimals = (options: UnitConfig) => {
  const decimals = Number(options?.decimals ?? 1);
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 100) {
    throw new Error('Decimals must be an integer between 0 and 100');
  }
  return decimals;
};

const pickUnit = <T>(units: Record<string, T>, unit: string | undefined, name: string) => {
  const found = unit === undefined ? undefined : units[unit];
  if (found === undefined) {
    throw new Error(`Unknown ${name} "${unit}"`);
  }
  return found;
};

// Milliseconds in one unit of the duration input / output
const durationFactor = (options: UnitConfig) => (options?.durationUnit === 'milliseconds' ? 1 : 1000);

const toKelvin: Record<string, (value: number) => number> = {
  '°C': (value) => value + 273.15,
  '°F': (value) => ((value - 32) * 5) / 9 + 273.15,
  K: (value) => value,
};

const fromKelvin: Record<string, (value: number) => number> = {
  '°C': (value) => value - 273.15,
  '°F': (value) => ((value - 273.15) * 9) / 5 + 32,
  K: (value) => value,
};

export const unitUtilities = {
  formatBytes: (input: unknown, options: UnitConfig) => {
    const bytes = toNumber(input);
    const base = options?.base === '1000' ? 1000 : 1024;
    const decimals = toDecimals(options);
    const index = Math.min(Math.floor(Math.log(Math.abs(bytes) || 1) / Math.log(base)), BYTE_UNITS.length - 1);
    // below 1 byte there is nothing to scale
    const scaled = bytes / base ** Math.max(index, 0);
    return `${round(scaled, decimals)} ${BYTE_UNITS[Math.max(index, 0)]}`;
  },

  formatDuration: (input: unknown, options: UnitConfig) => {
    const total = Math.round(toNumber(input) * durationFactor(options));
    let rest = Math.abs(total);
    const parts: string[] = [];
    for (const [label, size] of DURATION_UNITS) {
      const count = Math.floor(rest / size);
      rest -= count * size;
      if (count > 0) parts.push(`${count}${label}`);
    }
    return `${total < 0 ? '-' : ''}${parts.join(' ') || '0s'}`;
  },

  parseDuration: (input: unknown, options: UnitConfig) => {
    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }
    const pattern = /(\d+(?:\.\d+)?)\s*(ms|d|h|m|s)/gi;
    const text = input.trim();
    const sign = text.startsWith('-') ? -1 : 1;
    const body = text.replace(/^-/, '');
    // the whole text must be made of value + unit pairs
    const leftover = body.replace(pattern, '').trim();
    if (!body.trim() || leftover) {
      throw new Error('Input is not a valid duration');
    }
    const factors = Object.fromEntries(DURATION_UNITS);
    let milliseconds = 0;
    for (const [, value, unit] of body.matchAll(pattern)) {
      milliseconds += Number(value) * (factors[unit.toLowerCase()] as number);
    }
    return round((sign * milliseconds) / durationFactor(options), 3);
  },

  temperature: (input: unknown, options: UnitConfig) =>
    round(
      pickUnit(
        fromKelvin,
        options?.temperatureTo,
        'unit',
      )(pickUnit(toKelvin, options?.temperatureFrom, 'unit')(toNumber(input))),
      toDecimals(options),
    ),

  speed: (input: unknown, options: UnitConfig) =>
    round(
      (toNumber(input) * pickUnit(SPEEDS, options?.speedFrom, 'unit')) / pickUnit(SPEEDS, options?.speedTo, 'unit'),
      toDecimals(options),
    ),
};
