import { camel } from 'radash';

// Declarative editor fields of a utility function. One declaration drives the saved defaults, the form,
// the type of the options received by the function and the i18n keys.

type Base<V> = {
  default?: V;
  // base of the i18n keys: label `<i18n>`, hint `<i18n>_hint`, option `<i18n>_<option>` (default `field_<key>`)
  i18n?: string;
  icon?: string;
  placeholder?: string;
  // shows the `<i18n>_hint` text under the field
  hint?: boolean;
  // fields sharing a group are rendered in one row, labelled by the group (an i18n key)
  group?: string;
};

// Values are typed as the editor saves them: the inputs (number included) give strings
export type TextField = Base<string> & { kind: 'text' };
export type NumberField = Base<string> & { kind: 'number'; min?: number; step?: number | 'any' };
export type TimeField = Base<string> & { kind: 'time' };
// A Node-RED typedInput: the value is saved under the key of the field, its type under `<key>Type`
export type TypedField = Base<string> & { kind: 'typed'; types: readonly string[]; defaultType: string };
export type CheckboxField = Base<boolean> & { kind: 'checkbox'; group: string };
export type SelectField<O extends string = string> = Base<O> & {
  kind: 'select';
  options: readonly O[];
  // a Select saves its first option when untouched: the default says it explicitly
  default: O;
  // technical values shown as they are, without `<i18n>_<option>` translations
  rawOptions?: boolean;
};

export type Field = TextField | NumberField | TimeField | TypedField | CheckboxField | SelectField;
export type Fields = Record<string, Field>;

type Opts<T extends Field> = Omit<T, 'kind'>;

export const field = {
  text: (opts: Opts<TextField> = {}): TextField => ({ kind: 'text', ...opts }),
  number: (opts: Opts<NumberField> = {}): NumberField => ({ kind: 'number', ...opts }),
  time: (opts: Opts<TimeField> = {}): TimeField => ({ kind: 'time', ...opts }),
  typed: (opts: Opts<TypedField>): TypedField => ({ kind: 'typed', ...opts }),
  checkbox: (opts: Opts<CheckboxField>): CheckboxField => ({ kind: 'checkbox', ...opts }),
  select: <const O extends string>(
    options: readonly O[],
    opts: Omit<Opts<SelectField<O>>, 'options'>,
  ): SelectField<O> => ({
    kind: 'select',
    options,
    ...opts,
  }),
};

type ValueOf<F extends Field> = F extends { kind: 'select'; options: readonly (infer O)[] }
  ? O
  : F extends { kind: 'checkbox' }
    ? boolean
    : F extends { kind: 'typed' }
      ? unknown
      : string;

// Options received by the function: every key is optional, nodes saved before a field existed do not have it.
// A typed field is received already evaluated against the message (see `resolveTypedFields`)
export type ConfigOf<F extends Fields> = { [K in keyof F]?: ValueOf<F[K]> };

// Key of the saved object holding the fields of a category: `date_utilities` -> `dateUtilities`
export const storageKey = (category: string) => camel(category);

export const i18nKey = (key: string, f: Field) => f.i18n ?? `field_${key}`;

export function fieldDefaults(fields: Fields) {
  return Object.fromEntries(
    Object.entries(fields).flatMap(([key, f]) => [
      ...(f.default === undefined ? [] : [[key, f.default]]),
      ...(f.kind === 'typed' ? [[`${key}Type`, f.defaultType]] : []),
    ]),
  );
}

// Fills the missing keys only: a value the user changed, `false` included, is never overwritten
export function applyDefaults(config: Record<string, unknown>, fields: Fields) {
  for (const [key, value] of Object.entries(fieldDefaults(fields))) config[key] ??= value;
}

type Evaluate = (type: string, value: string) => Promise<unknown>;

// Evaluates the typed fields against the message: the function receives values, never types. An empty value stays
// empty whatever the type, nodes saved before the field was typed have no type and hold a plain string
export async function resolveTypedFields(fields: Fields, config: Record<string, unknown>, evaluate: Evaluate) {
  const resolved = { ...config };
  for (const [key, f] of Object.entries(fields)) {
    if (f.kind !== 'typed') continue;
    const raw = config[key];
    const type = (config[`${key}Type`] as string | undefined) ?? f.defaultType;
    delete resolved[`${key}Type`];
    resolved[key] = raw === undefined || raw === '' ? raw : await evaluate(type, raw as string);
  }
  return resolved;
}

// Attributes of the <Input> of a text, number or time field
export function inputAttrs(f: TextField | NumberField | TimeField) {
  return { type: f.kind, placeholder: f.placeholder, ...(f.kind === 'number' ? { min: f.min, step: f.step } : {}) };
}

export type FieldRow = { label: string; icon?: string; fields: { key: string; field: Field }[] };

// One row per field, consecutive fields of the same group sharing a row
export function fieldRows(fields: Fields): FieldRow[] {
  const rows: FieldRow[] = [];
  for (const [key, f] of Object.entries(fields)) {
    const label = f.group ?? i18nKey(key, f);
    const last = rows.at(-1);
    if (f.group && last?.label === label) last.fields.push({ key, field: f });
    else rows.push({ label, icon: f.icon, fields: [{ key, field: f }] });
  }
  return rows;
}
