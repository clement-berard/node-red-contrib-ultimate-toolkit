import { median } from 'es-toolkit';
import { sum } from 'radash';

export const mathUtilities = {
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  ceil: Math.ceil,
  cos: Math.cos,
  exp: Math.exp,
  floor: Math.floor,
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
  sum: (inputArr: number[]) => {
    return sum(inputArr);
  },
  tan: Math.tan,
  trunc: Math.trunc,
};
