import { groupBy, keyBy, shuffle, take, takeRight } from 'es-toolkit';
import { random, toggle, unique } from 'radash';

export const arrayUtilities = {
  toggle: toggle,
  shuffle: shuffle,
  groupBy: (inputArr: Record<string, unknown>[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return groupBy(inputArr, (x) => x[realProp.trim()] as PropertyKey);
  },
  keyBy: (inputArr: Record<string, unknown>[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return keyBy(inputArr, (x) => x[realProp.trim()] as PropertyKey);
  },
  unique: (inputArr: Record<string, unknown>[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return unique(inputArr, (x) => x[realProp.trim()] as PropertyKey);
  },
  take: (inputArr: object[], inputProp: unknown) => {
    const realProp = inputProp as number;
    return take(inputArr, realProp);
  },
  takeRight: (inputArr: object[], inputProp: unknown) => {
    const realProp = inputProp as number;
    return takeRight(inputArr, realProp);
  },
  getRandomItem: (inputArr: unknown[]) => {
    if (!inputArr.length) {
      return null;
    }
    const limit = inputArr.length - 1;

    return inputArr[random(0, limit)];
  },
};
