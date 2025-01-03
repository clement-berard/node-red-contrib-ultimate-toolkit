import { takeRight } from 'es-toolkit';
import { keys, sleep } from 'radash';
import { arrayUtilities } from './fns/array-utilities';
import { mathUtilities } from './fns/math-utilities';
import { networkUtilities } from './fns/network-utilities';
import { predicates } from './fns/predicates';
import { stringUtilities } from './fns/string-utilities';
import { utilityFunctions } from './fns/utilityFunctions';

export const listFunctions = {
  utility_functions: utilityFunctions,
  string_utilities: stringUtilities,
  predicates,
  object_utilities: {
    getKeys: keys,
  },
  array_utilities: arrayUtilities,
  network_utilities: networkUtilities,
  math_utilities: mathUtilities,
  async_utilities: {
    delay: (_, inputProp: unknown) => {
      const realProp = inputProp as number;
      return sleep(realProp);
    },
  },
};
