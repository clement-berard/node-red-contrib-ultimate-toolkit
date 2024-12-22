import { alphabetical } from 'radash';
import { docsFromEsToolkit, docsFromRadash } from './docs';

export const list = {
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
  utility_functions: {
    toNumber: {},
    toNumberNonStrict: {
      label: 'toNumber (non-strict)',
      docs: 'If the value is not a number, it will return the original value',
    },
    toString: {},
    toSafeInteger: {},
    toBoolean: {},
    toBooleanNumber: {},
    gt: {
      mainValue: {},
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    gte: {
      mainValue: {},
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    lt: {
      mainValue: {},
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    lte: {
      mainValue: {},
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    eq: {
      mainValue: {},
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    now: {
      docs: 'Returns the number of milliseconds elapsed since the epoch',
    },
  },
  predicates: {
    isBoolean: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isNaN: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isNil: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isNull: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isNumber: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isString: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isUndefined: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isIp: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isUrl: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
  },
  object_utilities: {
    getKeys: {
      docs: docsFromRadash('object/keys'),
    },
  },
  network_utilities: {
    ipInformation: {
      docs: 'By default is your current IP address',
    },
    ipVersion: {
      docs: '4 or 6. 0 if invalid',
    },
    networkInterfaces: {},
  },
  math_utilities: {
    abs: {},
    acos: {},
    asin: {},
    atan: {},
    ceil: {},
    cos: {},
    exp: {},
    floor: {},
    log: {},
    mean: {},
    median: {},
    random: {},
    round: {},
    sin: {},
    sum: {},
    tan: {},
    trunc: {},
  },
};

export const getCategories = alphabetical(Object.keys(list), (f) => f);

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
