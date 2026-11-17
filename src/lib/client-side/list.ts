import type { UtilityList } from '../../types/UtilityList';
import * as docsHelper from '../../utils/docs';

export const list: UtilityList = {
  array_utilities: {
    toggle: {
      description: 'Adds the item if absent, removes it if present',
      docs: docsHelper.docsFromRadash('array/toggle'),
    },
    shuffle: {
      description: 'Returns a randomly reordered copy of the array',
      docs: docsHelper.docsFromEsToolkit('array/shuffle'),
    },
    groupBy: {
      description: 'Groups items into an object keyed by the property value',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/groupBy'),
    },
    keyBy: {
      description: 'Maps each item to an object keyed by the property value (last wins)',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/keyBy'),
    },
    unique: {
      description: 'Removes duplicates, by property value or by simple value if empty',
      mainValue: {
        label: 'Property (optional)',
      },
      docs: docsHelper.docsFromRadash('array/unique'),
    },
    take: {
      description: 'Returns the first N items',
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/take'),
    },
    takeRight: {
      description: 'Returns the last N items',
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/takeRight'),
    },
    getRandomItem: {
      description: 'Returns one random item, null if the array is empty',
      docs: 'Get a random item from input array',
    },
    compact: {
      description: "Removes falsy values (0, '', null, undefined, false, NaN)",
      docs: docsHelper.docsFromEsToolkit('array/compact'),
    },
    flatten: {
      description: 'Flattens the array by one level',
      docs: docsHelper.docsFromEsToolkit('array/flatten'),
    },
    flattenDeep: {
      description: 'Flattens the array at every depth',
      docs: docsHelper.docsFromEsToolkit('array/flattenDeep'),
    },
    head: {
      description: 'Returns the first item, null if empty',
      docs: docsHelper.docsFromEsToolkit('array/head'),
    },
    last: {
      description: 'Returns the last item, null if empty',
      docs: docsHelper.docsFromEsToolkit('array/last'),
    },
    tail: {
      description: 'Returns everything except the first item',
      docs: docsHelper.docsFromEsToolkit('array/tail'),
    },
    initial: {
      description: 'Returns everything except the last item',
      docs: docsHelper.docsFromEsToolkit('array/initial'),
    },
    unzip: {
      description: "Regroups tuples by position: [[1,'a'],[2,'b']] → [[1,2],['a','b']]",
      docs: docsHelper.docsFromEsToolkit('array/unzip'),
    },
    chunk: {
      description: 'Splits the array into groups of the given size',
      mainValue: {
        label: 'Size',
      },
      docs: docsHelper.docsFromEsToolkit('array/chunk'),
    },
    drop: {
      description: 'Removes the first N items',
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/drop'),
    },
    dropRight: {
      description: 'Removes the last N items',
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/dropRight'),
    },
    sampleSize: {
      description: 'Returns N random items, without repeats',
      mainValue: {
        label: 'Count',
      },
      docs: docsHelper.docsFromEsToolkit('array/sampleSize'),
    },
    windowed: {
      description: 'Returns sliding windows of the given size: [1,2,3] with 2 → [[1,2],[2,3]]',
      mainValue: {
        label: 'Size',
      },
      docs: docsHelper.docsFromEsToolkit('array/windowed'),
    },
    sortBy: {
      description: 'Sorts objects by the property, ascending',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/sortBy'),
    },
    countBy: {
      description: 'Counts items per property value: {value: count}',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/countBy'),
    },
    partition: {
      description: 'Splits into [truthy, falsy] arrays based on the property',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/partition'),
    },
    minBy: {
      description: 'Returns the item with the lowest property value, null if empty',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/minBy'),
    },
    maxBy: {
      description: 'Returns the item with the highest property value, null if empty',
      mainValue: {
        label: 'Property',
      },
      docs: docsHelper.docsFromEsToolkit('array/maxBy'),
    },
    orderBy: {
      description: 'Sorts objects by the property, ascending or descending',
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
      description: 'Returns the keys of the object as an array',
      docs: docsHelper.docsFromRadash('object/keys'),
    },
    invert: {
      description: "Swaps keys and values: {a:'x'} → {x:'a'}",
      docs: docsHelper.docsFromEsToolkit('object/invert'),
    },
    flattenObject: {
      description: "Flattens nested keys to dot paths: {a:{b:1}} → {'a.b':1}",
      docs: docsHelper.docsFromEsToolkit('object/flattenObject'),
    },
    construct: {
      description: "Rebuilds nesting from dot paths: {'a.b':1} → {a:{b:1}}",
      docs: docsHelper.docsFromRadash('object/construct'),
    },
    shake: {
      description: 'Removes keys whose value is undefined',
      docs: docsHelper.docsFromRadash('object/shake'),
    },
    cloneDeep: {
      description: 'Returns a deep copy, independent from the original',
      docs: docsHelper.docsFromEsToolkit('object/cloneDeep'),
    },
    sortKeys: {
      description: 'Returns the object with keys sorted alphabetically',
      docs: docsHelper.docsFromEsToolkit('object/sortKeys'),
    },
    listify: {
      description: 'Converts the object to an array of {key, value}',
      docs: docsHelper.docsFromRadash('object/listify'),
    },
    toCamelCaseKeys: {
      description: 'Converts keys to camelCase, deeply',
      docs: docsHelper.docsFromEsToolkit('object/toCamelCaseKeys'),
    },
    toSnakeCaseKeys: {
      description: 'Converts keys to snake_case, deeply',
      docs: docsHelper.docsFromEsToolkit('object/toSnakeCaseKeys'),
    },
    toKebabCaseKeys: {
      description: 'Converts keys to kebab-case, deeply',
      docs: docsHelper.docsFromEsToolkit('object/toKebabCaseKeys'),
    },
    toPascalCaseKeys: {
      description: 'Converts keys to PascalCase, deeply',
      docs: docsHelper.docsFromEsToolkit('object/toPascalCaseKeys'),
    },
    toConstantCaseKeys: {
      description: 'Converts keys to CONSTANT_CASE, deeply',
      docs: docsHelper.docsFromEsToolkit('object/toConstantCaseKeys'),
    },
    lowerize: {
      description: 'Converts keys to lower case',
      docs: docsHelper.docsFromRadash('object/lowerize'),
    },
    upperize: {
      description: 'Converts keys to upper case',
      docs: docsHelper.docsFromRadash('object/upperize'),
    },
    pick: {
      description: 'Keeps only the listed keys (comma separated)',
      mainValue: {
        label: 'Keys',
      },
      docs: docsHelper.docsFromEsToolkit('object/pick'),
    },
    omit: {
      description: 'Removes the listed keys (comma separated)',
      mainValue: {
        label: 'Keys',
      },
      docs: docsHelper.docsFromEsToolkit('object/omit'),
    },
    get: {
      description: 'Reads a value by path like <code>a.b[0].c</code>, null if missing',
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
