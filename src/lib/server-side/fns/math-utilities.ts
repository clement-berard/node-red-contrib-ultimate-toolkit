import { clamp, inRange, median, sum } from 'es-toolkit';
import type { MathConfig } from '../../client-side/categories/math-utilities';

const toBound = (input: unknown, name: string) => {
  const value = Number(input);
  if (input === undefined || input === '' || Number.isNaN(value)) {
    throw new Error(`${name} must be a number`);
  }
  return value;
};

export const mathUtilities = {
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  ceil: Math.ceil,
  clamp: (input: number, options: MathConfig) =>
    clamp(Number(input), toBound(options?.min, 'Min'), toBound(options?.max, 'Max')),
  cos: Math.cos,
  exp: Math.exp,
  floor: Math.floor,
  inRange: (input: number, options: MathConfig) =>
    inRange(Number(input), toBound(options?.min, 'Min'), toBound(options?.max, 'Max')),
  log: Math.log,
  // reduce instead of spread: Math.max(...arr) overflows the call stack on very large arrays
  max: (inputArr: number[]) => inputArr.reduce((acc, v) => Math.max(acc, v), Number.NEGATIVE_INFINITY),
  mean: (inputArr: number[]) => {
    return sum(inputArr) / inputArr.length;
  },
  median: median,
  min: (inputArr: number[]) => inputArr.reduce((acc, v) => Math.min(acc, v), Number.POSITIVE_INFINITY),
  random: Math.random,
  round: Math.round,
  sin: Math.sin,
  sum,
  tan: Math.tan,
  trunc: Math.trunc,
};
