import { arrayUtilities } from './fns/array-utilities';
import { asyncUtilities } from './fns/async-utilities';
import { dateUtilities } from './fns/date-utilities';
import { mathUtilities } from './fns/math-utilities';
import { networkUtilities } from './fns/network-utilities';
import { objectUtilities } from './fns/object-utilities';
import { predicates } from './fns/predicates';
import { stringUtilities } from './fns/string-utilities';
import { utilityFunctions } from './fns/utility-functions';

export const listFunctions = {
  array_utilities: arrayUtilities,
  async_utilities: asyncUtilities,
  date_utilities: dateUtilities,
  math_utilities: mathUtilities,
  network_utilities: networkUtilities,
  object_utilities: objectUtilities,
  predicates,
  string_utilities: stringUtilities,
  utility_functions: utilityFunctions,
};
