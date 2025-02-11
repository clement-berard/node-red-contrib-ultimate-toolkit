import { groupBy, keyBy, shuffle, take, takeRight } from 'es-toolkit';
import { random, sum, toggle, unique } from 'radash';

export const arrayUtilities = {
  toggle: toggle,
  shuffle: shuffle,
  groupBy: (inputArr: unknown[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return groupBy(inputArr, (x) => x[realProp.trim()]);
  },
  keyBy: (inputArr: unknown[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return keyBy(inputArr, (x) => x[realProp.trim()]);
  },
  sum: (inputArr: object[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return sum(inputArr, (x) => x[realProp.trim()]);
  },
  unique: (inputArr: object[], inputProp: unknown) => {
    const realProp = inputProp as string;
    return unique(inputArr, (x) => x[realProp.trim()]);
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
