import { clamp, inRange, median, sum } from 'es-toolkit';
import type { NodeMainProps } from '../../../types/NodeMainProps';

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
  clamp: (input: number, options: NodeMainProps['mathUtilities']) =>
    clamp(Number(input), toBound(options?.min, 'Min'), toBound(options?.max, 'Max')),
  cos: Math.cos,
  exp: Math.exp,
  floor: Math.floor,
  inRange: (input: number, options: NodeMainProps['mathUtilities']) =>
    inRange(Number(input), toBound(options?.min, 'Min'), toBound(options?.max, 'Max')),
  log: Math.log,
  max: (inputArr: number[]) => Math.max(...inputArr),
  mean: (inputArr: number[]) => {
    return sum(inputArr) / inputArr.length;
  },
  median: median,
  min: (inputArr: number[]) => Math.min(...inputArr),
  random: Math.random,
  round: Math.round,
  sin: Math.sin,
  sum,
  tan: Math.tan,
  trunc: Math.trunc,
};
