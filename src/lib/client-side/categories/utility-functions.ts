import type { UtilityCategory } from '../../../types/UtilityList';
import { es, radash } from '../../../utils/docs';
import { value } from './helpers';

export const utilityFunctions: UtilityCategory = {
  toNumber: {
    description: 'Converts the value to a number (NaN if not convertible)',
    docs: es('compat/util/toNumber'),
  },
  toNumberNonStrict: {
    label: 'toNumber (non-strict)',
    description: 'Converts to a number, returns the original value if not convertible',
  },
  toString: {
    description: 'Converts the value to a string (null and undefined become an empty string)',
    docs: es('compat/util/toString'),
  },
  toSafeInteger: {
    description: 'Converts to an integer clamped to the safe integer range',
    docs: es('compat/util/toSafeInteger'),
  },
  toBoolean: {
    description: 'Converts to true or false based on truthiness',
  },
  toBooleanNumber: {
    description: 'Returns 1 if the value is falsy, 0 if truthy',
  },
  gt: {
    description: 'True if the payload is greater than the value',
    mainValue: value('Value'),
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('compat/util/gt'),
  },
  gte: {
    description: 'True if the payload is greater than or equal to the value',
    mainValue: value('Value'),
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('compat/util/gte'),
  },
  lt: {
    description: 'True if the payload is lower than the value',
    mainValue: value('Value'),
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('compat/util/lt'),
  },
  lte: {
    description: 'True if the payload is lower than or equal to the value',
    mainValue: value('Value'),
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('compat/util/lte'),
  },
  eq: {
    description: 'True if the payload equals the value (SameValueZero, so NaN equals NaN)',
    mainValue: value('Value'),
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('compat/util/eq'),
  },
  size: {
    description: 'Returns the length of an array or string, or the key count of an object',
    docs: es('compat/array/size'),
  },
  toInteger: {
    description: 'Converts to an integer, truncating decimals',
    docs: es('compat/util/toInteger'),
  },
  toFinite: {
    description: 'Converts to a finite number: Infinity becomes the max number, NaN becomes 0',
    docs: es('compat/util/toFinite'),
  },
  toArray: {
    description: 'Converts a value, string or object to an array',
    docs: es('compat/util/toArray'),
  },
  castArray: {
    description: 'Wraps the value in an array unless it already is one',
    docs: es('compat/array/castArray'),
  },
  defaultTo: {
    description:
      'Returns the value if set, otherwise the fallback (null, undefined and NaN are replaced). Fallback is read as JSON or text',
    mainValue: value('Fallback'),
    docs: es('compat/util/defaultTo'),
  },
  uid: {
    description: 'Generates a random id, the payload is ignored',
    mainValue: value('Length (optional, default 8)'),
    docs: radash('random/uid'),
  },
};
