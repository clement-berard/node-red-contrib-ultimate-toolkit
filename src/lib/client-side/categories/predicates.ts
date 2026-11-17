import type { UtilityCategory } from '../../../types/UtilityList';
import { es, radash } from '../../../utils/docs';
import { value } from './helpers';

export const predicates: UtilityCategory = {
  isBoolean: {
    description: 'True if the value is a boolean',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isBoolean'),
  },
  isBuffer: {
    description: 'True if the value is a Buffer',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isBuffer'),
  },
  isNaN: {
    label: 'Is NaN',
    description: 'True if the value is NaN',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isNil: {
    description: 'True if the value is null or undefined',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isNil'),
  },
  isNull: {
    description: 'True if the value is null',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isNull'),
  },
  isNumber: {
    description: 'True if the value is a number',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isNumber'),
  },
  isString: {
    description: 'True if the value is a string',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isString'),
  },
  isUndefined: {
    description: 'True if the value is undefined',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isUndefined'),
  },
  isIp: {
    description: 'True if the value is a valid IPv4 or IPv6 address',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isUrl: {
    description: 'True if the value is a valid URL',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
  },
  isArray: {
    description: 'True if the value is an array',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: radash('typed/isArray'),
  },
  isDate: {
    description: 'True if the value is a Date object',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isDate'),
  },
  isPlainObject: {
    description: 'True if the value is a plain object ({}), not an array or class instance',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isPlainObject'),
  },
  isEmptyObject: {
    description: 'True if the value is an object without any key',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isEmptyObject'),
  },
  isEmpty: {
    description: 'True if the value is an empty string, array, object, or zero-like value',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: radash('typed/isEmpty'),
  },
  isNotNil: {
    description: 'True if the value is neither null nor undefined',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isNotNil'),
  },
  isJSON: {
    label: 'Is JSON',
    description: 'True if the value is a string holding valid JSON',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isJSON'),
  },
  isInt: {
    description: 'True if the value is an integer',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: radash('typed/isInt'),
  },
  isFloat: {
    description: 'True if the value is a non-integer number',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: radash('typed/isFloat'),
  },
  isError: {
    description: 'True if the value is an Error object',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isError'),
  },
  isPrimitive: {
    description: 'True if the value is a primitive (string, number, boolean, null, undefined, symbol, bigint)',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isPrimitive'),
  },
  isEqual: {
    description: 'Deep comparison with a value, parsed as JSON or kept as text if not valid JSON',
    mainValue: value('Value'),
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('predicate/isEqual'),
  },
};
