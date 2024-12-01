import { isNaN as _isNan, toString as _toString, gt, gte, toNumber, toSafeInteger } from 'es-toolkit/compat';

export const utilityFunctions = {
  toNumber: toNumber,
  toNumberNonStrict: (input: unknown) => {
    return _isNan(toNumber(input)) ? input : toNumber(input);
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
};
