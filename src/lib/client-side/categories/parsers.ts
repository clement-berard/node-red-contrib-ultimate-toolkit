import type { UtilityCategory } from '../../../types/UtilityList';
import { mdn } from '../../../utils/docs';

export const parsers: UtilityCategory = {
  json: {
    label: 'JSON',
    description: 'Converts between a JSON string and an object, like the native json node',
    revealClasses: ['parsers_json'],
    configArgs: 'parsers',
    docs: mdn('JSON/parse'),
  },
};
