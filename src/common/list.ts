import { alphabetical } from 'radash';
import { docsFromEsToolkit, docsFromRadash } from './docs';

export const list = {
  utility_functions: {
    toNumber: {},
    toNumberNonStrict: {
      label: 'toNumber (non-strict)',
    },
    toString: {},
    toSafeInteger: {},
    toBoolean: {},
    toBooleanNumber: {},
    gt: {
      mainValue: {},
    },
    gte: {
      mainValue: {},
    },
  },
  string_utilities: {
    camelCase: {},
    capitalize: {},
    constantCase: {},
    escape: {},
    kebabCase: {},
    lowerCase: {},
    lowerFirst: {},
    pascalCase: {},
    snakeCase: {},
    startCase: {},
    trim: {},
    trimEnd: {},
    trimStart: {},
    unescape: {},
    upperCase: {},
    upperFirst: {},
    words: {},
  },
  predicates: {
    isBoolean: {},
    isNil: {},
    isNotNil: {},
    isNull: {},
    isNumber: {},
    isString: {},
    isUndefined: {},
    isIp: {},
  },
  object_utilities: {
    getKeys: {
      docs: docsFromRadash('object/keys'),
    },
  },
  array_utilities: {
    toggle: {
      docs: docsFromRadash('array/toggle'),
    },
    groupBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsFromEsToolkit('array/groupBy'),
    },
    keyBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsFromEsToolkit('array/keyBy'),
    },
    sum: {
      mainValue: {
        label: 'Property',
      },
      docs: docsFromRadash('array/sum'),
    },
    unique: {
      mainValue: {
        label: 'Property',
      },
      docs: docsFromRadash('array/unique'),
    },
  },
  network_utilities: {
    ipInformation: {
      docs: 'By default is your current IP address',
    },
  },
};

export const getCategories = alphabetical(Object.keys(list), (f) => f);
export const getDocsFromFunction = (category: string, fn: string) => {
  return list?.[category]?.[fn]?.docs;
};
export function getFunctionsFromCategory(category: string) {
  const all = Object.keys(list[category]).map((v) => {
    return {
      key: v,
      label: list[category][v].label || v,
    };
  });

  return alphabetical(all, (f) => f.label);
}

export function getFunctionDetails(category: string, fn: string) {
  return list?.[category]?.[fn];
}
