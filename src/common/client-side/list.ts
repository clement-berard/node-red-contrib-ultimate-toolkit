import { alphabetical, title } from 'radash';
import type { UtilityList } from '../../types/UtilityList';
import * as docsHelper from '../docs';

export const list: UtilityList = {
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
    format: {
      description: 'Return formatted date from a date',
      docs: 'If token is provided, <code>Format</code> will not be used',
      revealClasses: ['dateUtilities_now'],
      configArgs: 'dateUtilities',
    },
    timeRange: {
      description: 'Routes messages depending on the time',
      docs: 'Time range checker that validates if current time is<br>between given start and end times (HH:mm format).',
      revealClasses: ['dateUtilities_timeRange'],
      configArgs: 'dateUtilities',
      forceSplitBooleanOutputs: true,
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
      description: 'Fetches detailed information about an IP address',
      docs: 'By default is your current IP address',
    },
    ipVersion: {
      description: 'Returns IP version (4, 6, or 0 if invalid) for a given IP address string',
    },
    networkInterfaces: {
      description: 'Lists all network interfaces of the current machine (ethernet, wifi, etc.)',
    },
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
  const all = Object.keys(list[category])
    .map((v) => {
      const fn = list[category][v];
      return {
        key: v,
        label: fn.label || title(v),
        enabled: fn?.enabled ?? true,
      };
    })
    .filter((v) => v.enabled);

  return alphabetical(all, (f) => f.label);
}

export function getFunctionDetails(category: string, fn: string) {
  const foundFn = list?.[category]?.[fn];
  return {
    ...foundFn,
    nodeDocs: `
    ${foundFn?.description || ''}
    <br><br>
    ${foundFn?.docs || ''}
    `.trim(),
  };
}
