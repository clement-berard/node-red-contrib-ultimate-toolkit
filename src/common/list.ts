import { alphabetical, title } from 'radash';
import * as docsHelper from './docs';

export const list = {
  array_utilities: {
    toggle: {
      docs: docsHelper.docsFromRadash('array/toggle'),
    },
    shuffle: {
      docs: docsHelper.docsFromEsToolkit('array/shuffle'),
    },
    groupBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/groupBy'),
    },
    keyBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/keyBy'),
    },
    sum: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromRadash('array/sum'),
    },
    unique: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromRadash('array/unique'),
    },
    take: {
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/take'),
    },
    takeRight: {
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/takeRight'),
    },
  },
  date_utilities: {
    now: {
      description: 'Returns the current date with lot of formatting options',
      docs: 'If token is provided, <code>Format</code> will not be used',
      revealClasses: ['dateUtilities_now'],
      configArgs: 'dateUtilities',
    },
    range: {
      description: 'Routes messages depending on the time',
      revealClasses: ['dateUtilities_range'],
      configArgs: 'dateUtilities',
    },
    currentTimezone: {
      description: 'Returns the current timezone',
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
    size: {
      docs: 'Returns the size of an array, string, or object.',
    },
  },
  predicates: {
    isBoolean: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isNaN: {
      label: 'Is NaN',
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
    isBuffer: {
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
  },
  object_utilities: {
    getKeys: {
      docs: docsHelper.docsFromRadash('object/keys'),
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
    max: {},
    mean: {},
    min: {},
    median: {},
    random: {},
    round: {},
    sin: {},
    sum: {},
    tan: {},
    trunc: {},
  },
  async_utilities: {
    delay: {
      description: 'Delays the message by the specified amount of time',
      mainValue: {
        label: 'Milliseconds',
      },
    },
  },
};

export const getCategories = alphabetical(Object.keys(list), (f) => f);

export function getFunctionsFromCategory(category: string) {
  const all = Object.keys(list[category]).map((v) => {
    return {
      key: v,
      label: list[category][v].label || title(v),
    };
  });

  return alphabetical(all, (f) => f.label);
}

export function getFunctionDetails(category: string, fn: string) {
  return list?.[category]?.[fn];
}
