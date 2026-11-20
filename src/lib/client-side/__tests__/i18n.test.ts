import { describe, expect, it } from 'vitest';
import enUS from '../../../nodes/main/locales/en-US.json';
import fr from '../../../nodes/main/locales/fr.json';
import { fieldRows, i18nKey } from '../../../utils/fields';
import { list } from '../list';

// Every text a declared field shows, as keys derived from the field
const fieldKeys = Object.values(list)
  .flatMap((category) => Object.values(category))
  .flatMap((item) => fieldRows(item.fields ?? {}))
  .flatMap((row) => [
    row.label,
    ...row.fields.flatMap(({ key, field }) => {
      const base = i18nKey(key, field);
      return [
        ...(field.kind === 'checkbox' ? [base] : []),
        ...(field.kind === 'select' && !field.rawOptions ? field.options.map((option) => `${base}_${option}`) : []),
        ...(field.hint ? [`${base}_hint`] : []),
      ];
    }),
  ]);

describe.each([
  ['en-US', enUS],
  ['fr', fr],
])('%s locale', (_, locale) => {
  it('translates every field key', () => {
    const missing = [...new Set(fieldKeys)].filter((key) => !(key in locale));
    expect(missing).toEqual([]);
  });
});
