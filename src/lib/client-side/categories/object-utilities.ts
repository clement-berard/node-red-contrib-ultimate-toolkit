import type { UtilityCategory } from '../../../types/UtilityList';
import { es, radash } from '../../../utils/docs';
import { value } from './helpers';

export const objectUtilities: UtilityCategory = {
  getKeys: {
    description: 'Returns the keys of the object as an array',
    docs: radash('object/keys'),
  },
  invert: {
    description: "Swaps keys and values: {a:'x'} → {x:'a'}",
    docs: es('object/invert'),
  },
  flattenObject: {
    description: "Flattens nested keys to dot paths: {a:{b:1}} → {'a.b':1}",
    docs: es('object/flattenObject'),
  },
  construct: {
    description: "Rebuilds nesting from dot paths: {'a.b':1} → {a:{b:1}}",
    docs: radash('object/construct'),
  },
  shake: {
    description: 'Removes keys whose value is undefined',
    docs: radash('object/shake'),
  },
  cloneDeep: {
    description: 'Returns a deep copy, independent from the original',
    docs: es('object/cloneDeep'),
  },
  sortKeys: {
    description: 'Returns the object with keys sorted alphabetically',
    docs: es('object/sortKeys'),
  },
  listify: {
    description: 'Converts the object to an array of {key, value}',
    docs: radash('object/listify'),
  },
  toCamelCaseKeys: {
    description: 'Converts keys to camelCase, deeply',
    docs: es('object/toCamelCaseKeys'),
  },
  toSnakeCaseKeys: {
    description: 'Converts keys to snake_case, deeply',
    docs: es('object/toSnakeCaseKeys'),
  },
  toKebabCaseKeys: {
    description: 'Converts keys to kebab-case, deeply',
    docs: es('object/toKebabCaseKeys'),
  },
  toPascalCaseKeys: {
    description: 'Converts keys to PascalCase, deeply',
    docs: es('object/toPascalCaseKeys'),
  },
  toConstantCaseKeys: {
    description: 'Converts keys to CONSTANT_CASE, deeply',
    docs: es('object/toConstantCaseKeys'),
  },
  lowerize: {
    description: 'Converts keys to lower case',
    docs: radash('object/lowerize'),
  },
  upperize: {
    description: 'Converts keys to upper case',
    docs: radash('object/upperize'),
  },
  pick: {
    description: 'Keeps only the listed keys (comma separated)',
    mainValue: value('Keys'),
    docs: es('object/pick'),
  },
  omit: {
    description: 'Removes the listed keys (comma separated)',
    mainValue: value('Keys'),
    docs: es('object/omit'),
  },
  get: {
    description: 'Reads a value by path like <code>a.b[0].c</code>, null if missing',
    mainValue: value('Path'),
    docs: radash('object/get'),
  },
  findKey: {
    description: 'Returns the first key holding this value, null if none',
    mainValue: value('Value'),
    docs: es('object/findKey'),
  },
};
