import { groupBy, keyBy } from 'es-toolkit';
import { sum, toggle, unique } from 'radash';

export const arrayUtilities = {
  toggle: toggle,
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
};
