import { describe, expect, it } from 'vitest';
import { unitUtilities } from '../unit-utilities';

const options = (values: Record<string, unknown> = {}) => values as any;

describe('unitUtilities', () => {
  describe('formatBytes', () => {
    it('scales with base 1024 by default', () => {
      expect(unitUtilities.formatBytes(0, options())).toBe('0 B');
      expect(unitUtilities.formatBytes(512, options())).toBe('512 B');
      expect(unitUtilities.formatBytes(1536, options())).toBe('1.5 KB');
      expect(unitUtilities.formatBytes(1024 ** 3, options())).toBe('1 GB');
    });

    it('supports base 1000, decimals, negatives and large values', () => {
      expect(unitUtilities.formatBytes(1500, options({ base: '1000' }))).toBe('1.5 KB');
      expect(unitUtilities.formatBytes(1234567, options({ decimals: '3' }))).toBe('1.177 MB');
      expect(unitUtilities.formatBytes(-2048, options())).toBe('-2 KB');
      expect(unitUtilities.formatBytes(1024 ** 6, options())).toBe('1024 PB');
    });

    it('rejects a non number and invalid decimals', () => {
      expect(() => unitUtilities.formatBytes('abc', options())).toThrow('Input must be a number');
      expect(() => unitUtilities.formatBytes('', options())).toThrow('Input must be a number');
      expect(() => unitUtilities.formatBytes(1, options({ decimals: '-1' }))).toThrow('Decimals must be an integer');
    });
  });

  describe('formatDuration', () => {
    it('formats seconds', () => {
      expect(unitUtilities.formatDuration(3661, options())).toBe('1h 1m 1s');
      expect(unitUtilities.formatDuration(90000, options())).toBe('1d 1h');
      expect(unitUtilities.formatDuration(0, options())).toBe('0s');
      expect(unitUtilities.formatDuration(-61, options())).toBe('-1m 1s');
      expect(unitUtilities.formatDuration(1.5, options())).toBe('1s 500ms');
    });

    it('formats milliseconds', () => {
      expect(unitUtilities.formatDuration(61250, options({ durationUnit: 'milliseconds' }))).toBe('1m 1s 250ms');
    });
  });

  describe('parseDuration', () => {
    it('reads seconds or milliseconds', () => {
      expect(unitUtilities.parseDuration('1h 30m', options())).toBe(5400);
      expect(unitUtilities.parseDuration('1d2h3m4s', options())).toBe(93784);
      expect(unitUtilities.parseDuration('1.5s', options())).toBe(1.5);
      expect(unitUtilities.parseDuration('250ms', options())).toBe(0.25);
      expect(unitUtilities.parseDuration('1m', options({ durationUnit: 'milliseconds' }))).toBe(60000);
      expect(unitUtilities.parseDuration('-1m', options())).toBe(-60);
    });

    it('round trips with formatDuration', () => {
      expect(unitUtilities.parseDuration(unitUtilities.formatDuration(93784, options()), options())).toBe(93784);
    });

    it('rejects what is not a duration', () => {
      expect(() => unitUtilities.parseDuration('soon', options())).toThrow('Input is not a valid duration');
      expect(() => unitUtilities.parseDuration('1h later', options())).toThrow('Input is not a valid duration');
      expect(() => unitUtilities.parseDuration('', options())).toThrow('Input is not a valid duration');
      expect(() => unitUtilities.parseDuration(5, options())).toThrow('Input must be a string');
    });
  });

  describe('temperature', () => {
    const convert = (value: number, temperatureFrom: string, temperatureTo: string, decimals = '1') =>
      unitUtilities.temperature(value, options({ temperatureFrom, temperatureTo, decimals }));

    it('converts between the three scales', () => {
      expect(convert(100, '°C', '°F')).toBe(212);
      expect(convert(32, '°F', '°C')).toBe(0);
      expect(convert(0, '°C', 'K', '2')).toBe(273.15);
      expect(convert(-40, '°C', '°F')).toBe(-40);
      expect(convert(20, '°C', '°C')).toBe(20);
      expect(convert(36.6, '°C', '°F', '2')).toBe(97.88);
    });

    it('rejects an unknown unit and a non number', () => {
      expect(() => convert(1, '°C', 'X')).toThrow('Unknown unit "X"');
      expect(() => unitUtilities.temperature('x', options({ temperatureFrom: '°C', temperatureTo: 'K' }))).toThrow(
        'Input must be a number',
      );
    });
  });

  describe('speed', () => {
    const convert = (value: number, speedFrom: string, speedTo: string, decimals = '1') =>
      unitUtilities.speed(value, options({ speedFrom, speedTo, decimals }));

    it('converts between the units', () => {
      expect(convert(36, 'km/h', 'm/s')).toBe(10);
      expect(convert(100, 'km/h', 'mph')).toBe(62.1);
      expect(convert(10, 'kn', 'km/h')).toBe(18.5);
      expect(convert(10, 'm/s', 'm/s')).toBe(10);
    });

    it('rejects an unknown unit', () => {
      expect(() => convert(1, 'km/h', 'x')).toThrow('Unknown unit "x"');
    });
  });
});
