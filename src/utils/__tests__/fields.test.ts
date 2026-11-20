import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  applyDefaults,
  type ConfigOf,
  field,
  fieldDefaults,
  fieldRows,
  i18nKey,
  inputAttrs,
  storageKey,
} from '../fields';

const fields = {
  amount: field.number({ default: '1', step: 'any' }),
  unit: field.select(['day', 'week'], { default: 'day', i18n: 'unit' }),
  note: field.text({ placeholder: 'free' }),
  rangeDay1: field.checkbox({ default: true, group: 'activeDays', i18n: 'weekday_1' }),
  rangeDay2: field.checkbox({ default: true, group: 'activeDays', i18n: 'weekday_2' }),
};

describe('storageKey', () => {
  it('camel-cases the category', () => {
    expect(storageKey('date_utilities')).toBe('dateUtilities');
    expect(storageKey('tools')).toBe('tools');
  });
});

describe('i18nKey', () => {
  it('derives the key from the field key unless overridden', () => {
    expect(i18nKey('amount', fields.amount)).toBe('field_amount');
    expect(i18nKey('unit', fields.unit)).toBe('unit');
  });
});

describe('fieldDefaults', () => {
  it('keeps only the fields that declare a default', () => {
    expect(fieldDefaults(fields)).toEqual({ amount: '1', unit: 'day', rangeDay1: true, rangeDay2: true });
  });
});

describe('applyDefaults', () => {
  it('fills the missing keys and keeps the saved values, false included', () => {
    const config: Record<string, unknown> = { amount: '5', rangeDay1: false };
    applyDefaults(config, fields);
    expect(config).toEqual({ amount: '5', unit: 'day', rangeDay1: false, rangeDay2: true });
  });
});

describe('inputAttrs', () => {
  it('gives min and step to the number fields only', () => {
    expect(inputAttrs(field.number({ min: 0, step: 'any' }))).toEqual({
      type: 'number',
      placeholder: undefined,
      min: 0,
      step: 'any',
    });
    expect(inputAttrs(field.text({ placeholder: 'free' }))).toEqual({ type: 'text', placeholder: 'free' });
  });
});

describe('fieldRows', () => {
  it('merges consecutive fields of a group in one row', () => {
    const rows = fieldRows(fields);
    expect(rows.map((row) => [row.label, row.fields.map(({ key }) => key)])).toEqual([
      ['field_amount', ['amount']],
      ['unit', ['unit']],
      ['field_note', ['note']],
      ['activeDays', ['rangeDay1', 'rangeDay2']],
    ]);
  });
});

describe('ConfigOf', () => {
  it('types each key from its field', () => {
    expectTypeOf<ConfigOf<typeof fields>>().toEqualTypeOf<{
      amount?: string;
      unit?: 'day' | 'week';
      note?: string;
      rangeDay1?: boolean;
      rangeDay2?: boolean;
    }>();
  });
});
