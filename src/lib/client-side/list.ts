import type { UtilityList } from '../../types/UtilityList';
import { arrayUtilities } from './categories/array-utilities';
import { asyncUtilities } from './categories/async-utilities';
import { dateUtilities } from './categories/date-utilities';
import { mathUtilities } from './categories/math-utilities';
import { networkUtilities } from './categories/network-utilities';
import { objectUtilities } from './categories/object-utilities';
import { predicates } from './categories/predicates';
import { stringUtilities } from './categories/string-utilities';
import { tools } from './categories/tools';
import { utilityFunctions } from './categories/utility-functions';

export const list: UtilityList = {
  array_utilities: arrayUtilities,
  date_utilities: dateUtilities,
  string_utilities: stringUtilities,
  utility_functions: utilityFunctions,
  predicates,
  object_utilities: objectUtilities,
  network_utilities: networkUtilities,
  math_utilities: mathUtilities,
  async_utilities: asyncUtilities,
  tools,
};
