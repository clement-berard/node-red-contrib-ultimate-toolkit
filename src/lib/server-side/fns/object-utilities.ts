import {
  cloneDeep,
  findKey,
  flattenObject,
  invert,
  isPlainObject,
  omit,
  pick,
  sortKeys,
  toCamelCaseKeys,
  toConstantCaseKeys,
  toKebabCaseKeys,
  toMerged,
  toPascalCaseKeys,
  toSnakeCaseKeys,
} from 'es-toolkit';
import { construct, get, keys, listify, lowerize, set, shake, upperize } from 'radash';
import type { ObjectConfig } from '../../client-side/categories/object-utilities';

type Obj = Record<string, any>;

const asObject = (input: unknown, name: string): Obj => {
  if (!isPlainObject(input)) {
    throw new Error(`${name} must be an object`);
  }
  return input as Obj;
};

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
  merge: (inputObj: Obj, options: ObjectConfig) =>
    toMerged(asObject(inputObj, 'Input'), asObject(options?.other, 'Other object')),
  set: (inputObj: Obj, options: ObjectConfig) => {
    const path = String(options?.path ?? '').trim();
    if (!path) {
      throw new Error('Path is required');
    }
    // radash `set` mutates its first argument
    return set(cloneDeep(asObject(inputObj, 'Input')), path, options?.value);
  },
};
