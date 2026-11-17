import type { UtilityCategory } from '../../../types/UtilityList';
import { es, radash } from '../../../utils/docs';
import { value } from './helpers';

export const stringUtilities: UtilityCategory = {
  camelCase: {
    description: 'Converts to camelCase: foo bar → fooBar',
    docs: es('string/camelCase'),
  },
  capitalize: {
    description: 'Uppercases the first letter, lowercases the rest',
    docs: es('string/capitalize'),
  },
  constantCase: {
    description: 'Converts to CONSTANT_CASE: foo bar → FOO_BAR',
    docs: es('string/constantCase'),
  },
  deburr: {
    description: 'Removes accents: crème brûlée → creme brulee',
    docs: es('string/deburr'),
  },
  dedent: {
    description: 'Removes the common leading indentation of every line',
    docs: es('string/dedent'),
  },
  escape: {
    description: 'Escapes HTML characters (&, <, >, quotes)',
    docs: es('string/escape'),
  },
  escapeRegExp: {
    description: 'Escapes regex special characters so the text can be used literally in a RegExp',
    docs: es('string/escapeRegExp'),
  },
  kebabCase: {
    description: 'Converts to kebab-case: foo bar → foo-bar',
    docs: es('string/kebabCase'),
  },
  lowerCase: {
    description: 'Converts to lower case words separated by spaces: fooBar → foo bar',
    docs: es('string/lowerCase'),
  },
  lowerFirst: {
    description: 'Lowercases the first letter only',
    docs: es('string/lowerFirst'),
  },
  pad: {
    description: 'Centers the text with spaces up to the given length',
    mainValue: value('Length'),
    docs: es('string/pad'),
  },
  pascalCase: {
    description: 'Converts to PascalCase: foo bar → FooBar',
    docs: es('string/pascalCase'),
  },
  reverseString: {
    description: 'Reverses the characters of the text',
    docs: es('string/reverseString'),
  },
  sentenceCase: {
    description: 'Converts to a sentence: fooBar → Foo bar',
    docs: es('string/sentenceCase'),
  },
  snakeCase: {
    description: 'Converts to snake_case: foo bar → foo_bar',
    docs: es('string/snakeCase'),
  },
  startCase: {
    description: 'Converts to Start Case: fooBar → Foo Bar',
    docs: es('string/startCase'),
  },
  title: {
    description: 'Capitalizes each word: hello world → Hello World',
    docs: radash('string/title'),
  },
  trim: {
    description: 'Removes whitespace at both ends',
    docs: es('string/trim'),
  },
  trimEnd: {
    description: 'Removes whitespace at the end',
    docs: es('string/trimEnd'),
  },
  trimStart: {
    description: 'Removes whitespace at the start',
    docs: es('string/trimStart'),
  },
  unescape: {
    description: 'Reverses escape: &amp; → &',
    docs: es('string/unescape'),
  },
  upperCase: {
    description: 'Converts to UPPER CASE words separated by spaces: fooBar → FOO BAR',
    docs: es('string/upperCase'),
  },
  upperFirst: {
    description: 'Uppercases the first letter only',
    docs: es('string/upperFirst'),
  },
  words: {
    description: 'Splits the text into an array of words',
    docs: es('string/words'),
  },
};
