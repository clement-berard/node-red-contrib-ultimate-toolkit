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
      description: 'Without property, dedupes simple values',
      mainValue: {
        label: 'Property (optional)',
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
    compact: {
      docs: docsHelper.docsFromEsToolkit('array/compact'),
    },
    flatten: {
      docs: docsHelper.docsFromEsToolkit('array/flatten'),
    },
    flattenDeep: {
      docs: docsHelper.docsFromEsToolkit('array/flattenDeep'),
    },
    head: {
      docs: docsHelper.docsFromEsToolkit('array/head'),
    },
    last: {
      docs: docsHelper.docsFromEsToolkit('array/last'),
    },
    tail: {
      docs: docsHelper.docsFromEsToolkit('array/tail'),
    },
    initial: {
      docs: docsHelper.docsFromEsToolkit('array/initial'),
    },
    unzip: {
      docs: docsHelper.docsFromEsToolkit('array/unzip'),
    },
    chunk: {
      mainValue: {
        label: 'Size',
      },
      docs: docsHelper.docsFromEsToolkit('array/chunk'),
    },
    drop: {
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/drop'),
    },
    dropRight: {
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/dropRight'),
    },
    sampleSize: {
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/sampleSize'),
    },
    windowed: {
      mainValue: {
        label: 'Size',
      },
      docs: docsHelper.docsFromEsToolkit('array/windowed'),
    },
    sortBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/sortBy'),
    },
    countBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/countBy'),
    },
    partition: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/partition'),
    },
    minBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/minBy'),
    },
    maxBy: {
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/maxBy'),
    },
    orderBy: {
      revealClasses: ['arrayUtilities_orderBy'],
      configArgs: 'arrayUtilities',
      docs: docsHelper.docsFromEsToolkit('array/orderBy'),
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
    invert: {
      docs: docsHelper.docsFromEsToolkit('object/invert'),
    },
    flattenObject: {
      docs: docsHelper.docsFromEsToolkit('object/flattenObject'),
    },
    construct: {
      docs: docsHelper.docsFromRadash('object/construct'),
    },
    shake: {
      docs: docsHelper.docsFromRadash('object/shake'),
    },
    cloneDeep: {
      docs: docsHelper.docsFromEsToolkit('object/cloneDeep'),
    },
    sortKeys: {
      docs: docsHelper.docsFromEsToolkit('object/sortKeys'),
    },
    listify: {
      docs: docsHelper.docsFromRadash('object/listify'),
    },
    toCamelCaseKeys: {
      docs: docsHelper.docsFromEsToolkit('object/toCamelCaseKeys'),
    },
    toSnakeCaseKeys: {
      docs: docsHelper.docsFromEsToolkit('object/toSnakeCaseKeys'),
    },
    toKebabCaseKeys: {
      docs: docsHelper.docsFromEsToolkit('object/toKebabCaseKeys'),
    },
    toPascalCaseKeys: {
      docs: docsHelper.docsFromEsToolkit('object/toPascalCaseKeys'),
    },
    toConstantCaseKeys: {
      docs: docsHelper.docsFromEsToolkit('object/toConstantCaseKeys'),
    },
    lowerize: {
      docs: docsHelper.docsFromRadash('object/lowerize'),
    },
    upperize: {
      docs: docsHelper.docsFromRadash('object/upperize'),
    },
    pick: {
      description: 'Comma separated keys',
      mainValue: {
        label: 'Keys',
      },
      docs: docsHelper.docsFromEsToolkit('object/pick'),
    },
    omit: {
      description: 'Comma separated keys',
      mainValue: {
        label: 'Keys',
      },
      docs: docsHelper.docsFromEsToolkit('object/omit'),
    },
    get: {
      description: 'Path like <code>a.b[0].c</code>, null if missing',
      mainValue: {
        label: 'Path',
      },
      docs: docsHelper.docsFromRadash('object/get'),
    },
    findKey: {
      description: 'Returns the first key holding this value, null if none',
      mainValue: {
        label: 'Value',
      },
      docs: docsHelper.docsFromEsToolkit('object/findKey'),
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
      revealClasses: ['asyncUtilities_delay'],
      configArgs: 'asyncUtilities',
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
