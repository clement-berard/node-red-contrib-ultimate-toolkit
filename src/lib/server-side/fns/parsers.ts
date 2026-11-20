import type { ParsersConfig } from '../../client-side/categories/parsers';

// Same indentation as the native Node-RED json node
const PRETTY_INDENT = 4;

const parseJson = (input: unknown) => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  return JSON.parse(input);
};

const stringifyJson = (input: unknown, pretty: boolean) => {
  const result = JSON.stringify(input, null, pretty ? PRETTY_INDENT : 0);
  if (result === undefined) {
    throw new Error('Input cannot be converted to JSON');
  }
  return result;
};

export const parsers = {
  json: (input: unknown, options: ParsersConfig) => {
    const action = options?.action;
    const pretty = options?.pretty === true;

    if (action === 'parse') {
      return parseJson(input);
    }
    if (action === 'stringify') {
      return stringifyJson(input, pretty);
    }
    // auto: a string is parsed, anything else is stringified
    return typeof input === 'string' ? parseJson(input) : stringifyJson(input, pretty);
  },
};
