import { type ConfigOf, field } from '../../../utils/fields';

// Secrets come from env, flow or global: never typed in the flow
const SECRET_TYPES = ['env', 'flow', 'global'];

export const hashFields = {
  algorithm: field.select(['sha256', 'sha384', 'sha512', 'sha1', 'md5'], { default: 'sha256', rawOptions: true }),
  encoding: field.select(['hex', 'base64', 'base64url'], { default: 'hex', rawOptions: true }),
};

export const keyFields = {
  key: field.typed({ icon: 'key', hint: true, types: SECRET_TYPES, defaultType: 'env' }),
};

export const hmacFields = { ...keyFields, ...hashFields };

export const randomBytesFields = {
  size: field.number({ default: '16', min: 1, icon: 'sort-numeric-asc' }),
  encoding: hashFields.encoding,
};

export const randomIntFields = {
  min: field.number({ default: '0', i18n: 'min' }),
  max: field.number({ default: '100', i18n: 'max' }),
};

export const base64Fields = {
  variant: field.select(['base64', 'base64url'], { default: 'base64', rawOptions: true }),
};

export const compareFields = {
  compare: field.typed({
    icon: 'exchange',
    types: ['str', 'msg', 'flow', 'global', 'jsonata', 'env'],
    defaultType: 'str',
  }),
};

// Everything saved under `cryptoUtilities`, for the typed options of the functions
export type CryptoConfig = ConfigOf<
  typeof hmacFields & typeof randomBytesFields & typeof randomIntFields & typeof base64Fields & typeof compareFields
>;
