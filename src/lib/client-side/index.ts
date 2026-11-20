import { alphabetical, title } from 'radash';
import { storageKey } from '../../utils/fields';
import { getValueOrEmptyString } from '../../utils/utils';
import { list } from './list';

export const getCategories = alphabetical(Object.keys(list), (f) => f);

export function getFunctionsFromCategory(category: string) {
  // a node saved with a category this version does not know (rollback, removed category) must still open
  const all = Object.keys(list[category] ?? {}).map((v) => {
    const fn = list[category][v];
    return {
      key: v,
      label: fn.label || title(v),
    };
  });

  return alphabetical(all, (f) => f.label);
}

export function getFunctionDetails(category: string, fn: string) {
  const foundFn = list?.[category]?.[fn];

  const nodeDocs = `
    ${getValueOrEmptyString(foundFn?.description)}
    <br><br>
    ${getValueOrEmptyString(foundFn?.docs)}
    `.trim();

  return {
    ...foundFn,
    // the saved object of a function declaring `fields` is named after its category
    configKey: foundFn?.fields ? storageKey(category) : undefined,
    nodeDocs,
  };
}
