import type { UtilityCategory } from '../../../types/UtilityList';
import { mdn } from '../../../utils/docs';
import { type ConfigOf, field } from '../../../utils/fields';

const jsonFields = {
  action: field.select(['auto', 'stringify', 'parse'], { default: 'auto' }),
  pretty: field.checkbox({ i18n: 'formatJsonText', group: 'format' }),
};

// Same values as the json action, with texts that do not talk about JSON
const textAction = {
  action: field.select(['auto', 'stringify', 'parse'], { default: 'auto', i18n: 'field_parseAction' }),
};

export type ParsersConfig = ConfigOf<typeof jsonFields & typeof textAction>;

export const parsers: UtilityCategory = {
  json: {
    label: 'JSON',
    description: 'Converts between a JSON string and an object, like the native json node',
    fields: jsonFields,
    docs: mdn('JSON/parse'),
  },
  queryString: {
    description: "Converts between a query string and an object: 'a=1&b=2&b=3' ⇄ {a: '1', b: ['2', '3']}",
    fields: textAction,
    docs: mdn('URLSearchParams'),
  },
  url: {
    label: 'URL',
    description: 'Converts between a URL string and an object (protocol, hostname, port, pathname, query, hash...)',
    fields: textAction,
    docs: mdn('URL'),
  },
};
