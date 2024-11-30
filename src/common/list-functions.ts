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
import { isNaN as _isNan, toString as _toString, toNumber, toSafeInteger } from 'es-toolkit/compat';
import { isBoolean, isNil, isNotNil, isNull, isString, isUndefined } from 'es-toolkit/predicate';
import { keys, toggle } from 'radash';

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
    isBoolean: isBoolean,
    isNil: isNil,
    isNotNil: isNotNil,
    isNull: isNull,
    isNumber: (input: unknown) => !Number.isNaN(input),
    isString: isString,
    isUndefined: isUndefined,
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
  },
  network_utilities: {
    ipInformation: async (input: string) => {
      return (await fetch(`http://ip-api.com/json/${input || ''}`)).json();
    },
  },
};
