import { isNaN as _isNan, toString as _toString, toNumber, toSafeInteger } from 'es-toolkit/compat';

export const utilityFunctions = {
  toNumber: {
    fn: toNumber,
  },
  toNumberNonStrict: {
    label: 'toNumber (non-strict)',
    fn: (input: unknown) => {
      return _isNan(toNumber(input)) ? input : toNumber(input);
    },
  },
  toString: {
    fn: _toString,
  },
  toSafeInteger: {
    fn: toSafeInteger,
  },
  toBoolean: {
    fn: (input: unknown) => {
      return !!input;
    },
  },
  toBooleanNumber: {
    label: 'toBoolean (0/1)',
    fn: (input: unknown) => {
      return !input ? 1 : 0;
    },
  },
};
