import { isIP } from 'node:net';
import { URL } from 'node:url';
import { isBuffer } from 'es-toolkit';

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
};
