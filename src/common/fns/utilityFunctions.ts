import { toString as _toString, eq, gt, gte, lt, lte, size, toNumber, toSafeInteger } from 'es-toolkit/compat';
import { _isNaN } from './predicates';

export const utilityFunctions = {
  toNumber: toNumber,
  toNumberNonStrict: (input: unknown) => {
    return _isNaN(toNumber(input)) ? input : toNumber(input);
  },
  toString: _toString,
  toSafeInteger: toSafeInteger,
  toBoolean: (input: unknown) => {
    return !!input;
  },
  toBooleanNumber: (input: unknown) => {
    return !input ? 1 : 0;
  },
  gt: (...args: unknown[]) => {
    const [a, b] = args.map(toNumber);

    return gt(a, b);
  },
  gte: (...args: unknown[]) => {
    const [a, b] = args.map(toNumber);

    return gte(a, b);
  },
  lt: (...args: unknown[]) => {
    const [a, b] = args.map(toNumber);

    return lt(a, b);
  },
  lte: (...args: unknown[]) => {
    const [a, b] = args.map(toNumber);

    return lte(a, b);
  },
  eq: eq,
  now: Date.now,
  size: size,
};
