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

  it('gives each entry with revealClasses or configArgs both of them', () => {
    for (const [category, fns] of Object.entries(list)) {
      for (const [name, item] of Object.entries(fns)) {
        expect(!!item.configArgs, `${category}.${name}`).toBe(!!item.revealClasses?.length);
      }
    }
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

  it('getFunctionDetails returns docs and tolerates unknown entries', () => {
    expect(getFunctionDetails('array_utilities', 'chunk').nodeDocs).toContain('<br>');
    expect(getFunctionDetails('nope', 'nope').nodeDocs).toBe('<br><br>');
  });
});
