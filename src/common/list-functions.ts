import { isIP } from 'node:net';
import { URL } from 'node:url';
import {
  escape as _escape,
  unescape as _unescape,
  camelCase,
  capitalize,
  constantCase,
  groupBy,
  kebabCase,
  keyBy,
  lowerCase,
  lowerFirst,
  pascalCase,
  snakeCase,
  startCase,
  trim,
  trimEnd,
  trimStart,
  upperCase,
  upperFirst,
  words,
} from 'es-toolkit';
import { isNaN as _isNan, toString as _toString, gt, gte, toNumber, toSafeInteger } from 'es-toolkit/compat';
import { keys, sum, toggle, unique } from 'radash';
import { networkUtilities } from './fns/network-utilities';

export const listFunctions = {
  utility_functions: {
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
    gt: gt,
    gte: gte,
  },
  string_utilities: {
    camelCase: camelCase,
    capitalize: capitalize,
    constantCase: constantCase,
    escape: _escape,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    pascalCase: pascalCase,
    snakeCase: snakeCase,
    startCase: startCase,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    unescape: _unescape,
    upperCase: upperCase,
    upperFirst: upperFirst,
    words: words,
  },
  predicates: {
    isBoolean: (input: unknown) => typeof input === 'boolean',
    isNil: (input: unknown) => input == null,
    isNotNil: (input: unknown) => input != null,
    isNull: (input: unknown) => input === null,
    isNumber: (input: unknown) => typeof input === 'number',
    isString: (input: unknown) => typeof input === 'string',
    isUndefined: (input: unknown) => input === undefined,
    isIp: (input: string) => !!isIP(input),
    isUrl: (input: string) => {
      try {
        new URL(input);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  object_utilities: {
    getKeys: keys,
  },
  array_utilities: {
    toggle: toggle,
    groupBy: (inputArr: unknown[], inputProp: unknown) => {
      const realProp = inputProp as string;
      return groupBy(inputArr, (x) => x[realProp.trim()]);
    },
    keyBy: (inputArr: unknown[], inputProp: unknown) => {
      const realProp = inputProp as string;
      return keyBy(inputArr, (x) => x[realProp.trim()]);
    },
    sum: (inputArr: object[], inputProp: unknown) => {
      const realProp = inputProp as string;
      return sum(inputArr, (x) => x[realProp.trim()]);
    },
    unique: (inputArr: object[], inputProp: unknown) => {
      const realProp = inputProp as string;
      return unique(inputArr, (x) => x[realProp.trim()]);
    },
  },
  network_utilities: networkUtilities,
};
