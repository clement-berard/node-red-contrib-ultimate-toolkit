import { alphabetical } from 'radash';
import { objectUtilities } from './categories/object-utilities';
import { predicates } from './categories/predicates';
import { stringUtilities } from './categories/string-utilities';
import { utilityFunctions } from './categories/utility-functions';

export const structure = {
  utility_functions: utilityFunctions,
  string_utilities: stringUtilities,
  predicates: predicates,
  object_utilities: objectUtilities,
};

export const categories = alphabetical(Object.keys(structure), (v) => v);

export function getFunctionsFromCategory(category: (typeof categories)[number]) {
  const all = Object.keys(structure[category]).map((v) => {
    return {
      key: v,
      label: structure[category][v].label || v,
    };
  });

  return alphabetical(all, (f) => f.label);
}

export function getFunctionDetails(category: (typeof categories)[number], fn: string) {
  return structure[category][fn];
}
