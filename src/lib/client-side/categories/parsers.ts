import type { UtilityCategory } from '../../../types/UtilityList';
import { mdn } from '../../../utils/docs';
import { type ConfigOf, field } from '../../../utils/fields';

const jsonFields = {
  action: field.select(['auto', 'stringify', 'parse'], { default: 'auto' }),
  pretty: field.checkbox({ i18n: 'formatJsonText', group: 'format' }),
};

export type ParsersConfig = ConfigOf<typeof jsonFields>;

export const parsers: UtilityCategory = {
  json: {
    label: 'JSON',
    description: 'Converts between a JSON string and an object, like the native json node',
    fields: jsonFields,
    docs: mdn('JSON/parse'),
  },
};
