import { isBoolean, isNil, isNotNil, isNull, isString, isUndefined } from 'es-toolkit/predicate';

export const predicates = {
  isNil: {
    fn: isNil,
  },
  isBoolean: {
    fn: isBoolean,
  },
  isNotNil: {
    fn: isNotNil,
  },
  isNull: {
    fn: isNull,
  },
  isUndefined: {
    fn: isUndefined,
  },
  isString: {
    fn: isString,
  },
  isNumber: {
    fn: (input: unknown) => !Number.isNaN(input),
  },
};
