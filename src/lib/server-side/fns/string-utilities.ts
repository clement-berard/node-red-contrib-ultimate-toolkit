import {
  escape as _escape,
  unescape as _unescape,
  camelCase,
  capitalize,
  constantCase,
  deburr,
  dedent,
  escapeRegExp,
  kebabCase,
  lowerCase,
  lowerFirst,
  pad,
  pascalCase,
  reverseString,
  sentenceCase,
  snakeCase,
  startCase,
  trim,
  trimEnd,
  trimStart,
  upperCase,
  upperFirst,
  words,
} from 'es-toolkit';
import { title } from 'radash';

export const stringUtilities = {
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
  deburr: deburr,
  dedent: (input: string) => dedent(input),
  escapeRegExp: escapeRegExp,
  pad: (input: string, inputProp: unknown) => {
    const length = Number(inputProp);
    if (!Number.isInteger(length) || length < 0) {
      throw new Error('Length must be a positive integer');
    }
    return pad(input, length);
  },
  reverseString: reverseString,
  sentenceCase: sentenceCase,
  title: title,
};
