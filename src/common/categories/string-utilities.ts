import {
  escape as _escape,
  unescape as _unescape,
  camelCase,
  capitalize,
  constantCase,
  kebabCase,
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

export const stringUtilities = {
  startCase: {
    fn: startCase,
  },
  camelCase: {
    fn: camelCase,
  },
  capitalize: {
    fn: capitalize,
  },
  constantCase: {
    fn: constantCase,
  },
  escape: {
    fn: _escape,
  },
  kebabCase: {
    fn: kebabCase,
  },
  lowerCase: {
    fn: lowerCase,
  },
  lowerFirst: {
    fn: lowerFirst,
  },
  pascalCase: {
    fn: pascalCase,
  },
  snakeCase: {
    fn: snakeCase,
  },
  unescape: {
    fn: _unescape,
  },
  upperCase: {
    fn: upperCase,
  },
  upperFirst: {
    fn: upperFirst,
  },
  words: {
    fn: words,
  },
  trim: {
    fn: trim,
  },
  trimEnd: {
    fn: trimEnd,
  },
  trimStart: {
    fn: trimStart,
  },
};
