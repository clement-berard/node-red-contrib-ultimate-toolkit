import { isIP } from 'node:net';
import { URL } from 'node:url';
import {
  isBuffer,
  isDate,
  isEmptyObject,
  isEqual,
  isError,
  isJSON,
  isNotNil,
  isPlainObject,
  isPrimitive,
} from 'es-toolkit';
import { isArray, isEmpty, isFloat, isInt } from 'radash';
import { parseJsonOrRaw } from '../../../utils/utils';

export const _isNaN = (input: unknown) => Number.isNaN(input);

export const predicates = {
  isBoolean: (input: unknown) => typeof input === 'boolean',
  isBuffer: isBuffer,
  isNaN: _isNaN,
  isNil: (input: unknown) => input == null,
  isNull: (input: unknown) => input === null,
  isNumber: (input: unknown) => typeof input === 'number',
  isString: (input: unknown) => typeof input === 'string',
  isUndefined: (input: unknown) => input === undefined,
  isIp: (input: string) => !!isIP(input),
  isUrl: (input: string) => {
    try {
      new URL(input);
      return true;
    } catch (_e) {
      return false;
    }
  },
  isArray: (input: unknown) => isArray(input),
  isDate: (input: unknown) => isDate(input),
  isPlainObject: (input: unknown) => isPlainObject(input),
  isEmptyObject: (input: unknown) => isEmptyObject(input),
  isEmpty: (input: unknown) => isEmpty(input),
  isNotNil: (input: unknown) => isNotNil(input),
  isJSON: (input: unknown) => isJSON(input),
  isInt: (input: unknown) => isInt(input),
  isFloat: (input: unknown) => isFloat(input),
  isError: (input: unknown) => isError(input),
  isPrimitive: (input: unknown) => isPrimitive(input),
  isEqual: (input: unknown, inputProp: unknown) => isEqual(input, parseJsonOrRaw(inputProp)),
};
