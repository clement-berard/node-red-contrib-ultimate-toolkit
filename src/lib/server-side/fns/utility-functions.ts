import {
  toString as _toString,
  castArray,
  defaultTo,
  eq,
  gt,
  gte,
  lt,
  lte,
  size,
  toArray,
  toFinite,
  toInteger,
  toNumber,
  toSafeInteger,
} from 'es-toolkit/compat';
import { uid } from 'radash';
import { parseJsonOrRaw } from '../../../utils/utils';
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
  size: size,
  toInteger: toInteger,
  toFinite: toFinite,
  toArray: (input: unknown) => toArray(input),
  castArray: (input: unknown) => castArray(input),
  defaultTo: (input: unknown, inputProp: unknown) => defaultTo(input, parseJsonOrRaw(inputProp)),
  uid: (_: unknown, inputProp: unknown) => {
    const raw = String(inputProp ?? '').trim();
    const length = raw ? Number(raw) : 8;
    if (!Number.isInteger(length) || length < 1) {
      throw new Error('Length must be an integer greater than 0');
    }
    return uid(length);
  },
};
