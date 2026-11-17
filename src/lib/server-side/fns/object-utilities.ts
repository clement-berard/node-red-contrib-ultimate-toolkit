import {
  cloneDeep,
  findKey,
  flattenObject,
  invert,
  omit,
  pick,
  sortKeys,
  toCamelCaseKeys,
  toConstantCaseKeys,
  toKebabCaseKeys,
  toPascalCaseKeys,
  toSnakeCaseKeys,
} from 'es-toolkit';
import { construct, get, keys, listify, lowerize, shake, upperize } from 'radash';

type Obj = Record<string, any>;

const toKeys = (input: unknown) =>
  String(input ?? '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

export const objectUtilities = {
  getKeys: keys,
  invert: (inputObj: Obj) => invert(inputObj),
  flattenObject: (inputObj: Obj) => flattenObject(inputObj),
  construct: (inputObj: Obj) => construct(inputObj),
  shake: (inputObj: Obj) => shake(inputObj),
  cloneDeep: (inputObj: Obj) => cloneDeep(inputObj),
  sortKeys: (inputObj: Obj) => sortKeys(inputObj),
  listify: (inputObj: Obj) => listify(inputObj, (key, value) => ({ key, value })),
  toCamelCaseKeys: (inputObj: Obj) => toCamelCaseKeys(inputObj),
  toSnakeCaseKeys: (inputObj: Obj) => toSnakeCaseKeys(inputObj),
  toKebabCaseKeys: (inputObj: Obj) => toKebabCaseKeys(inputObj),
  toPascalCaseKeys: (inputObj: Obj) => toPascalCaseKeys(inputObj),
  toConstantCaseKeys: (inputObj: Obj) => toConstantCaseKeys(inputObj),
  lowerize: (inputObj: Obj) => lowerize(inputObj),
  upperize: (inputObj: Obj) => upperize(inputObj),
  pick: (inputObj: Obj, inputProp: unknown) => pick(inputObj, toKeys(inputProp)),
  omit: (inputObj: Obj, inputProp: unknown) => omit(inputObj, toKeys(inputProp)),
  get: (inputObj: Obj, inputProp: unknown) => get(inputObj, String(inputProp ?? '').trim()) ?? null,
  findKey: (inputObj: Obj, inputProp: unknown) => findKey(inputObj, (v) => String(v) === String(inputProp)) ?? null,
};
