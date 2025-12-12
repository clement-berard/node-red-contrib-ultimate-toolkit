import type { UtilityList } from '../../types/UtilityList';
import * as docsHelper from '../../utils/docs';

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
    getRandomItem: {
      docs: 'Get a random item from input array',
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
    sum: {
      docs: docsHelper.docsFromEsToolkit('math/sum'),
    },
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
  tools: {
    cyclicCounter: {
      description:
        "A customizable cyclic counter node for Node-RED that iterates through a defined sequence of numbers and can reset after a set timeout. It allows flexible control over the counter's behavior, making it useful in a variety of automation scenarios.",
      revealClasses: ['tools_cyclicCounter'],
      configArgs: 'tools',
      addNodeIdToConfigArgs: true,
    },
  },
};
