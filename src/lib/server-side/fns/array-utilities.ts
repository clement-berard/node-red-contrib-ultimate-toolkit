import {
  chunk,
  compact,
  countBy,
  drop,
  dropRight,
  flatten,
  flattenDeep,
  groupBy,
  head,
  initial,
  keyBy,
  last,
  maxBy,
  minBy,
  orderBy,
  partition,
  sampleSize,
  shuffle,
  sortBy,
  tail,
  take,
  takeRight,
  uniq,
  unzip,
  windowed,
} from 'es-toolkit';
import { random, toggle, unique } from 'radash';
import type { NodeMainProps } from '../../../types/NodeMainProps';

type Row = Record<string, unknown>;

const toProp = (input: unknown) => String(input ?? '').trim();

const toCount = (input: unknown) => {
  const count = Number(input);
  if (!Number.isInteger(count) || count < 0) {
    throw new Error('Count must be a positive integer');
  }
  return count;
};

const toSize = (input: unknown) => {
  const size = toCount(input);
  if (size < 1) {
    throw new Error('Size must be greater than 0');
  }
  return size;
};

export const arrayUtilities = {
  toggle: toggle,
  shuffle: shuffle,
  groupBy: (inputArr: Row[], inputProp: unknown) => groupBy(inputArr, (x) => x[toProp(inputProp)] as PropertyKey),
  keyBy: (inputArr: Row[], inputProp: unknown) => keyBy(inputArr, (x) => x[toProp(inputProp)] as PropertyKey),
  unique: (inputArr: unknown[], inputProp?: unknown) => {
    const realProp = toProp(inputProp);
    if (!realProp) {
      return uniq(inputArr);
    }
    return unique(inputArr as Row[], (x) => x[realProp] as PropertyKey);
  },
  take: (inputArr: unknown[], inputProp: unknown) => take(inputArr, toCount(inputProp)),
  takeRight: (inputArr: unknown[], inputProp: unknown) => takeRight(inputArr, toCount(inputProp)),
  getRandomItem: (inputArr: unknown[]) => {
    if (!inputArr.length) {
      return null;
    }
    const limit = inputArr.length - 1;

    return inputArr[random(0, limit)];
  },
  compact: (inputArr: unknown[]) => compact(inputArr),
  flatten: (inputArr: unknown[]) => flatten(inputArr),
  flattenDeep: (inputArr: unknown[]) => flattenDeep(inputArr),
  head: (inputArr: unknown[]) => head(inputArr) ?? null,
  last: (inputArr: unknown[]) => last(inputArr) ?? null,
  tail: (inputArr: unknown[]) => tail(inputArr),
  initial: (inputArr: unknown[]) => initial(inputArr),
  unzip: (inputArr: unknown[][]) => unzip(inputArr),
  chunk: (inputArr: unknown[], inputProp: unknown) => chunk(inputArr, toSize(inputProp)),
  drop: (inputArr: unknown[], inputProp: unknown) => drop(inputArr, toCount(inputProp)),
  dropRight: (inputArr: unknown[], inputProp: unknown) => dropRight(inputArr, toCount(inputProp)),
  sampleSize: (inputArr: unknown[], inputProp: unknown) => {
    const size = toCount(inputProp);
    if (size > inputArr.length) {
      throw new Error('Count must not exceed the array length');
    }
    return sampleSize(inputArr, size);
  },
  windowed: (inputArr: unknown[], inputProp: unknown) => windowed(inputArr, toSize(inputProp)),
  sortBy: (inputArr: Row[], inputProp: unknown) => sortBy(inputArr, [toProp(inputProp)]),
  orderBy: (inputArr: Row[], options: NodeMainProps['arrayUtilities']) => {
    const property = toProp(options?.property);
    if (!property) {
      throw new Error('Property is required');
    }
    return orderBy(inputArr, [property], [options?.direction === 'desc' ? 'desc' : 'asc']);
  },
  countBy: (inputArr: Row[], inputProp: unknown) => countBy(inputArr, (x) => x[toProp(inputProp)] as PropertyKey),
  partition: (inputArr: Row[], inputProp: unknown) => partition(inputArr, (x) => Boolean(x[toProp(inputProp)])),
  minBy: (inputArr: Row[], inputProp: unknown) => minBy(inputArr, (x) => x[toProp(inputProp)] as number) ?? null,
  maxBy: (inputArr: Row[], inputProp: unknown) => maxBy(inputArr, (x) => x[toProp(inputProp)] as number) ?? null,
};
