import { arrayUtilities } from './fns/array-utilities';
import { asyncUtilities } from './fns/async-utilities';
import { cryptoUtilities } from './fns/crypto-utilities';
import { dateUtilities } from './fns/date-utilities';
import { mathUtilities } from './fns/math-utilities';
import { networkUtilities } from './fns/network-utilities';
import { objectUtilities } from './fns/object-utilities';
import { parsers } from './fns/parsers';
import { predicates } from './fns/predicates';
import { stringUtilities } from './fns/string-utilities';
import { tools } from './fns/tools';
import { unitUtilities } from './fns/unit-utilities';
import { utilityFunctions } from './fns/utility-functions';

export const listFunctions = {
  array_utilities: arrayUtilities,
  async_utilities: asyncUtilities,
  crypto_utilities: cryptoUtilities,
  date_utilities: dateUtilities,
  math_utilities: mathUtilities,
  network_utilities: networkUtilities,
  object_utilities: objectUtilities,
  parsers,
  predicates,
  string_utilities: stringUtilities,
  utility_functions: utilityFunctions,
  tools,
  unit_utilities: unitUtilities,
};
