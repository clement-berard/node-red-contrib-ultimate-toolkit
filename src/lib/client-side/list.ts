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
    camelCase: {
      description: 'Converts to camelCase: foo bar → fooBar',
      docs: docsHelper.docsFromEsToolkit('string/camelCase'),
    },
    capitalize: {
      description: 'Uppercases the first letter, lowercases the rest',
      docs: docsHelper.docsFromEsToolkit('string/capitalize'),
    },
    constantCase: {
      description: 'Converts to CONSTANT_CASE: foo bar → FOO_BAR',
      docs: docsHelper.docsFromEsToolkit('string/constantCase'),
    },
    deburr: {
      description: 'Removes accents: crème brûlée → creme brulee',
      docs: docsHelper.docsFromEsToolkit('string/deburr'),
    },
    dedent: {
      description: 'Removes the common leading indentation of every line',
      docs: docsHelper.docsFromEsToolkit('string/dedent'),
    },
    escape: {
      description: 'Escapes HTML characters (&, <, >, quotes)',
      docs: docsHelper.docsFromEsToolkit('string/escape'),
    },
    escapeRegExp: {
      description: 'Escapes regex special characters so the text can be used literally in a RegExp',
      docs: docsHelper.docsFromEsToolkit('string/escapeRegExp'),
    },
    kebabCase: {
      description: 'Converts to kebab-case: foo bar → foo-bar',
      docs: docsHelper.docsFromEsToolkit('string/kebabCase'),
    },
    lowerCase: {
      description: 'Converts to lower case words separated by spaces: fooBar → foo bar',
      docs: docsHelper.docsFromEsToolkit('string/lowerCase'),
    },
    lowerFirst: {
      description: 'Lowercases the first letter only',
      docs: docsHelper.docsFromEsToolkit('string/lowerFirst'),
    },
    pad: {
      description: 'Centers the text with spaces up to the given length',
      mainValue: {
        label: 'Length',
      },
      docs: docsHelper.docsFromEsToolkit('string/pad'),
    },
    pascalCase: {
      description: 'Converts to PascalCase: foo bar → FooBar',
      docs: docsHelper.docsFromEsToolkit('string/pascalCase'),
    },
    reverseString: {
      description: 'Reverses the characters of the text',
      docs: docsHelper.docsFromEsToolkit('string/reverseString'),
    },
    sentenceCase: {
      description: 'Converts to a sentence: fooBar → Foo bar',
      docs: docsHelper.docsFromEsToolkit('string/sentenceCase'),
    },
    snakeCase: {
      description: 'Converts to snake_case: foo bar → foo_bar',
      docs: docsHelper.docsFromEsToolkit('string/snakeCase'),
    },
    startCase: {
      description: 'Converts to Start Case: fooBar → Foo Bar',
      docs: docsHelper.docsFromEsToolkit('string/startCase'),
    },
    title: {
      description: 'Capitalizes each word: hello world → Hello World',
      docs: docsHelper.docsFromRadash('string/title'),
    },
    trim: {
      description: 'Removes whitespace at both ends',
      docs: docsHelper.docsFromEsToolkit('string/trim'),
    },
    trimEnd: {
      description: 'Removes whitespace at the end',
      docs: docsHelper.docsFromEsToolkit('string/trimEnd'),
    },
    trimStart: {
      description: 'Removes whitespace at the start',
      docs: docsHelper.docsFromEsToolkit('string/trimStart'),
    },
    unescape: {
      description: 'Reverses escape: &amp; → &',
      docs: docsHelper.docsFromEsToolkit('string/unescape'),
    },
    upperCase: {
      description: 'Converts to UPPER CASE words separated by spaces: fooBar → FOO BAR',
      docs: docsHelper.docsFromEsToolkit('string/upperCase'),
    },
    upperFirst: {
      description: 'Uppercases the first letter only',
      docs: docsHelper.docsFromEsToolkit('string/upperFirst'),
    },
    words: {
      description: 'Splits the text into an array of words',
      docs: docsHelper.docsFromEsToolkit('string/words'),
    },
  },
  utility_functions: {
    toNumber: {
      description: 'Converts the value to a number (NaN if not convertible)',
      docs: docsHelper.docsFromEsToolkit('compat/util/toNumber'),
    },
    toNumberNonStrict: {
      label: 'toNumber (non-strict)',
      description: 'Converts to a number, returns the original value if not convertible',
    },
    toString: {
      description: 'Converts the value to a string (null and undefined become an empty string)',
      docs: docsHelper.docsFromEsToolkit('compat/util/toString'),
    },
    toSafeInteger: {
      description: 'Converts to an integer clamped to the safe integer range',
      docs: docsHelper.docsFromEsToolkit('compat/util/toSafeInteger'),
    },
    toBoolean: {
      description: 'Converts to true or false based on truthiness',
    },
    toBooleanNumber: {
      description: 'Returns 1 if the value is falsy, 0 if truthy',
    },
    gt: {
      description: 'True if the payload is greater than the value',
      mainValue: {
        label: 'Value',
      },
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('compat/util/gt'),
    },
    gte: {
      description: 'True if the payload is greater than or equal to the value',
      mainValue: {
        label: 'Value',
      },
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('compat/util/gte'),
    },
    lt: {
      description: 'True if the payload is lower than the value',
      mainValue: {
        label: 'Value',
      },
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('compat/util/lt'),
    },
    lte: {
      description: 'True if the payload is lower than or equal to the value',
      mainValue: {
        label: 'Value',
      },
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('compat/util/lte'),
    },
    eq: {
      description: 'True if the payload equals the value (SameValueZero, so NaN equals NaN)',
      mainValue: {
        label: 'Value',
      },
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('compat/util/eq'),
    },
    size: {
      description: 'Returns the length of an array or string, or the key count of an object',
      docs: docsHelper.docsFromEsToolkit('compat/array/size'),
    },
    toInteger: {
      description: 'Converts to an integer, truncating decimals',
      docs: docsHelper.docsFromEsToolkit('compat/util/toInteger'),
    },
    toFinite: {
      description: 'Converts to a finite number: Infinity becomes the max number, NaN becomes 0',
      docs: docsHelper.docsFromEsToolkit('compat/util/toFinite'),
    },
    toArray: {
      description: 'Converts a value, string or object to an array',
      docs: docsHelper.docsFromEsToolkit('compat/util/toArray'),
    },
    castArray: {
      description: 'Wraps the value in an array unless it already is one',
      docs: docsHelper.docsFromEsToolkit('compat/array/castArray'),
    },
    defaultTo: {
      description:
        'Returns the value if set, otherwise the fallback (null, undefined and NaN are replaced). Fallback is read as JSON or text',
      mainValue: {
        label: 'Fallback',
      },
      docs: docsHelper.docsFromEsToolkit('compat/util/defaultTo'),
    },
    uid: {
      description: 'Generates a random id, the payload is ignored',
      mainValue: {
        label: 'Length (optional, default 8)',
      },
      docs: docsHelper.docsFromRadash('random/uid'),
    },
  },
  predicates: {
    isBoolean: {
      description: 'True if the value is a boolean',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isBoolean'),
    },
    isBuffer: {
      description: 'True if the value is a Buffer',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isBuffer'),
    },
    isNaN: {
      label: 'Is NaN',
      description: 'True if the value is NaN',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isNil: {
      description: 'True if the value is null or undefined',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isNil'),
    },
    isNull: {
      description: 'True if the value is null',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isNull'),
    },
    isNumber: {
      description: 'True if the value is a number',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isNumber'),
    },
    isString: {
      description: 'True if the value is a string',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isString'),
    },
    isUndefined: {
      description: 'True if the value is undefined',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isUndefined'),
    },
    isIp: {
      description: 'True if the value is a valid IPv4 or IPv6 address',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isUrl: {
      description: 'True if the value is a valid URL',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
    },
    isArray: {
      description: 'True if the value is an array',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromRadash('typed/isArray'),
    },
    isDate: {
      description: 'True if the value is a Date object',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isDate'),
    },
    isPlainObject: {
      description: 'True if the value is a plain object ({}), not an array or class instance',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isPlainObject'),
    },
    isEmptyObject: {
      description: 'True if the value is an object without any key',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isEmptyObject'),
    },
    isEmpty: {
      description: 'True if the value is an empty string, array, object, or zero-like value',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromRadash('typed/isEmpty'),
    },
    isNotNil: {
      description: 'True if the value is neither null nor undefined',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isNotNil'),
    },
    isJSON: {
      label: 'Is JSON',
      description: 'True if the value is a string holding valid JSON',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isJSON'),
    },
    isInt: {
      description: 'True if the value is an integer',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromRadash('typed/isInt'),
    },
    isFloat: {
      description: 'True if the value is a non-integer number',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromRadash('typed/isFloat'),
    },
    isError: {
      description: 'True if the value is an Error object',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isError'),
    },
    isPrimitive: {
      description: 'True if the value is a primitive (string, number, boolean, null, undefined, symbol, bigint)',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isPrimitive'),
    },
    isEqual: {
      description: 'Deep comparison with a value, parsed as JSON or kept as text if not valid JSON',
      mainValue: {
        label: 'Value',
      },
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('predicate/isEqual'),
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
    clamp: {
      description: 'Restricts the number between Min and Max',
      revealClasses: ['mathUtilities_range'],
      configArgs: 'mathUtilities',
      docs: docsHelper.docsFromEsToolkit('math/clamp'),
    },
    cos: {},
    exp: {},
    floor: {},
    inRange: {
      description: 'True if the number is greater than or equal to Min and lower than Max',
      revealClasses: ['mathUtilities_range'],
      configArgs: 'mathUtilities',
      canSplitBooleanOutputs: true,
      inverseReturnValue: true,
      docs: docsHelper.docsFromEsToolkit('math/inRange'),
    },
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
