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

type Params = Record<string, string | string[]>;

// A repeated key becomes an array
const paramsToObject = (params: URLSearchParams) => {
  const result: Params = {};
  for (const [key, value] of params) {
    const current = result[key];
    result[key] = current === undefined ? value : Array.isArray(current) ? [...current, value] : [current, value];
  }
  return result;
};

// An array repeats the key, null and undefined are skipped
const objectToParams = (input: Record<string, unknown>) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item === undefined || item === null) {
        continue;
      }
      if (typeof item === 'object') {
        throw new Error(`"${key}" must be a primitive or an array of primitives`);
      }
      params.append(key, String(item));
    }
  }
  return params;
};

const asRecord = (input: unknown) => {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    throw new Error('Input must be a string or an object');
  }
  return input as Record<string, unknown>;
};

const parseUrl = (input: string) => {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw new Error('Input is not a valid URL');
  }
  return {
    href: url.href,
    origin: url.origin,
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    query: paramsToObject(url.searchParams),
  };
};

const stringifyUrl = (input: Record<string, unknown>) => {
  if (!input.hostname) {
    throw new Error('hostname is required');
  }
  const protocol = String(input.protocol ?? 'https:').replace(/:?$/, ':');
  const url = new URL(`${protocol}//${String(input.hostname)}`);
  if (input.port) url.port = String(input.port);
  if (input.username) url.username = String(input.username);
  if (input.password) url.password = String(input.password);
  if (input.pathname) url.pathname = String(input.pathname);
  if (input.hash) url.hash = String(input.hash);
  // an object `query` wins over a `search` string
  if (typeof input.query === 'object' && input.query !== null) {
    url.search = objectToParams(input.query as Record<string, unknown>).toString();
  } else if (input.search) {
    url.search = String(input.search);
  }
  return url.href;
};

// auto: a string is parsed, anything else is stringified
const isParsing = (input: unknown, action: string | undefined) =>
  action === 'parse' || (action !== 'stringify' && typeof input === 'string');

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
  queryString: (input: unknown, options: ParsersConfig) => {
    if (isParsing(input, options?.action)) {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }
      return paramsToObject(new URLSearchParams(input.trim().replace(/^\?/, '')));
    }
    return objectToParams(asRecord(input)).toString();
  },

  url: (input: unknown, options: ParsersConfig) => {
    if (isParsing(input, options?.action)) {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }
      return parseUrl(input);
    }
    return stringifyUrl(asRecord(input));
  },
};
