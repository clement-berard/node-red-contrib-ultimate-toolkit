import type { UtilityCategory } from '../../../types/UtilityList';
import { es, radash } from '../../../utils/docs';
import { type ConfigOf, field } from '../../../utils/fields';
import { value } from './helpers';

const orderByFields = {
  property: field.text(),
  direction: field.select(['asc', 'desc'], { default: 'asc' }),
};

export type ArrayConfig = ConfigOf<typeof orderByFields>;

export const arrayUtilities: UtilityCategory = {
  toggle: {
    description: 'Adds the item if absent, removes it if present',
    docs: radash('array/toggle'),
  },
  shuffle: {
    description: 'Returns a randomly reordered copy of the array',
    docs: es('array/shuffle'),
  },
  groupBy: {
    description: 'Groups items into an object keyed by the property value',
    mainValue: value('Property'),
    docs: es('array/groupBy'),
  },
  keyBy: {
    description: 'Maps each item to an object keyed by the property value (last wins)',
    mainValue: value('Property'),
    docs: es('array/keyBy'),
  },
  unique: {
    description: 'Removes duplicates, by property value or by simple value if empty',
    mainValue: value('Property (optional)'),
    docs: radash('array/unique'),
  },
  take: {
    description: 'Returns the first N items',
    mainValue: value('Count'),
    docs: es('array/take'),
  },
  takeRight: {
    description: 'Returns the last N items',
    mainValue: value('Count'),
    docs: es('array/takeRight'),
  },
  getRandomItem: {
    description: 'Returns one random item, null if the array is empty',
    docs: es('array/sample'),
  },
  compact: {
    description: "Removes falsy values (0, '', null, undefined, false, NaN)",
    docs: es('array/compact'),
  },
  flatten: {
    description: 'Flattens the array by one level',
    docs: es('array/flatten'),
  },
  flattenDeep: {
    description: 'Flattens the array at every depth',
    docs: es('array/flattenDeep'),
  },
  head: {
    description: 'Returns the first item, null if empty',
    docs: es('array/head'),
  },
  last: {
    description: 'Returns the last item, null if empty',
    docs: es('array/last'),
  },
  tail: {
    description: 'Returns everything except the first item',
    docs: es('array/tail'),
  },
  initial: {
    description: 'Returns everything except the last item',
    docs: es('array/initial'),
  },
  unzip: {
    description: "Regroups tuples by position: [[1,'a'],[2,'b']] → [[1,2],['a','b']]",
    docs: es('array/unzip'),
  },
  chunk: {
    description: 'Splits the array into groups of the given size',
    mainValue: value('Size'),
    docs: es('array/chunk'),
  },
  drop: {
    description: 'Removes the first N items',
    mainValue: value('Count'),
    docs: es('array/drop'),
  },
  dropRight: {
    description: 'Removes the last N items',
    mainValue: value('Count'),
    docs: es('array/dropRight'),
  },
  sampleSize: {
    description: 'Returns N random items, without repeats',
    mainValue: value('Count'),
    docs: es('array/sampleSize'),
  },
  windowed: {
    description: 'Returns sliding windows of the given size: [1,2,3] with 2 → [[1,2],[2,3]]',
    mainValue: value('Size'),
    docs: es('array/windowed'),
  },
  sortBy: {
    description: 'Sorts objects by the property, ascending',
    mainValue: value('Property'),
    docs: es('array/sortBy'),
  },
  countBy: {
    description: 'Counts items per property value: {value: count}',
    mainValue: value('Property'),
    docs: es('array/countBy'),
  },
  partition: {
    description: 'Splits into [truthy, falsy] arrays based on the property',
    mainValue: value('Property'),
    docs: es('array/partition'),
  },
  minBy: {
    description: 'Returns the item with the lowest property value, null if empty',
    mainValue: value('Property'),
    docs: es('array/minBy'),
  },
  maxBy: {
    description: 'Returns the item with the highest property value, null if empty',
    mainValue: value('Property'),
    docs: es('array/maxBy'),
  },
  orderBy: {
    description: 'Sorts objects by the property, ascending or descending',
    fields: orderByFields,
    docs: es('array/orderBy'),
  },
};
