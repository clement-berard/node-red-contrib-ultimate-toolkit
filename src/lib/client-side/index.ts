import { alphabetical, title } from 'radash';
import { getValueOrEmptyString } from '../../utils/utils';
import { list } from './list';

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

  const nodeDocs = `
    ${getValueOrEmptyString(foundFn?.description)}
    <br><br>
    ${getValueOrEmptyString(foundFn?.docs)}
    `.trim();

  return {
    ...foundFn,
    nodeDocs,
  };
}
