import { describe, expect, it } from 'vitest';
import { listFunctions } from '../../server-side';
import { getCategories, getFunctionDetails, getFunctionsFromCategory } from '../index';
import { list } from '../list';

describe('client/server registry consistency', () => {
  it('has the same categories on both sides', () => {
    expect(Object.keys(list).sort()).toEqual(Object.keys(listFunctions).sort());
  });

  it.each(Object.keys(list))('%s: every UI entry has a runtime function', (category) => {
    const runtime = Object.keys((listFunctions as Record<string, object>)[category]);
    expect(runtime).toEqual(expect.arrayContaining(Object.keys(list[category])));
  });
});

describe('fields', () => {
  const entries = Object.entries(list).flatMap(([category, fns]) =>
    Object.entries(fns).flatMap(([name, item]) => (item.fields ? [[`${category}.${name}`, item.fields] as const] : [])),
  );

  it.each(entries)('%s: a select default is one of its options', (_, fields) => {
    for (const [key, f] of Object.entries(fields)) {
      if (f.kind === 'select') expect(f.options, key).toContain(f.default);
    }
  });

  it('are saved under the camel-cased category', () => {
    expect(getFunctionDetails('tools', 'cyclicCounter').configKey).toBe('tools');
    expect(getFunctionDetails('date_utilities', 'add').configKey).toBe('dateUtilities');
    expect(getFunctionDetails('date_utilities', 'isPast').configKey).toBeUndefined();
  });
});

describe('client-side helpers', () => {
  it('getCategories is sorted', () => {
    expect(getCategories).toEqual([...getCategories].sort());
  });

  it('getFunctionsFromCategory returns labelled entries sorted by label', () => {
    const items = getFunctionsFromCategory('predicates');
    expect(items.find((i) => i.key === 'isJSON')?.label).toBe('Is JSON');
    const labels = items.map((i) => i.label);
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
  });

  it('getFunctionsFromCategory tolerates an unknown category', () => {
    expect(getFunctionsFromCategory('nope')).toEqual([]);
  });

  it('getFunctionDetails returns docs and tolerates unknown entries', () => {
    expect(getFunctionDetails('array_utilities', 'chunk').nodeDocs).toContain('<br>');
    expect(getFunctionDetails('nope', 'nope').nodeDocs).toBe('<br><br>');
  });
});
