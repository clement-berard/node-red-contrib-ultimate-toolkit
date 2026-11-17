import { describe, expect, it } from 'vitest';
import { arrayUtilities } from '../array-utilities';

const rows = [
  { name: 'b', age: 30, ok: true },
  { name: 'a', age: 20, ok: false },
  { name: 'c', age: 40, ok: true },
];

describe('arrayUtilities', () => {
  describe('without argument', () => {
    it('compact removes falsy values', () => {
      expect(arrayUtilities.compact([0, 1, '', 'a', null])).toEqual([1, 'a']);
    });

    it('flatten and flattenDeep', () => {
      expect(arrayUtilities.flatten([1, [2, [3]]])).toEqual([1, 2, [3]]);
      expect(arrayUtilities.flattenDeep([1, [2, [3]]])).toEqual([1, 2, 3]);
    });

    it('unique dedupes simple values without property', () => {
      expect(arrayUtilities.unique([1, 1, 2], '')).toEqual([1, 2]);
    });

    it('unique dedupes by property', () => {
      expect(arrayUtilities.unique([{ a: 1 }, { a: 1 }, { a: 2 }], 'a')).toEqual([{ a: 1 }, { a: 2 }]);
    });

    it('head, last, tail, initial', () => {
      expect(arrayUtilities.head([1, 2, 3])).toBe(1);
      expect(arrayUtilities.last([1, 2, 3])).toBe(3);
      expect(arrayUtilities.tail([1, 2, 3])).toEqual([2, 3]);
      expect(arrayUtilities.initial([1, 2, 3])).toEqual([1, 2]);
    });

    it('head and last return null on empty array', () => {
      expect(arrayUtilities.head([])).toBeNull();
      expect(arrayUtilities.last([])).toBeNull();
    });

    it('unzip regroups tuples', () => {
      expect(
        arrayUtilities.unzip([
          [1, 'a'],
          [2, 'b'],
        ]),
      ).toEqual([
        [1, 2],
        ['a', 'b'],
      ]);
    });
  });

  describe('with a numeric value', () => {
    it('chunk splits by size', () => {
      expect(arrayUtilities.chunk([1, 2, 3], '2')).toEqual([[1, 2], [3]]);
    });

    it('chunk throws on invalid size', () => {
      expect(() => arrayUtilities.chunk([1], '0')).toThrow('Size must be greater than 0');
      expect(() => arrayUtilities.chunk([1], 'x')).toThrow('Count must be a positive integer');
    });

    it('drop and dropRight', () => {
      expect(arrayUtilities.drop([1, 2, 3], '1')).toEqual([2, 3]);
      expect(arrayUtilities.dropRight([1, 2, 3], '1')).toEqual([1, 2]);
    });

    it('sampleSize returns the requested count', () => {
      expect(arrayUtilities.sampleSize([1, 2, 3], '2')).toHaveLength(2);
    });

    it('sampleSize throws when count exceeds length', () => {
      expect(() => arrayUtilities.sampleSize([1], '2')).toThrow('Count must not exceed the array length');
    });

    it('windowed builds sliding windows', () => {
      expect(arrayUtilities.windowed([1, 2, 3], '2')).toEqual([
        [1, 2],
        [2, 3],
      ]);
    });
  });

  describe('with a property', () => {
    it('sortBy sorts ascending', () => {
      expect(arrayUtilities.sortBy(rows, 'age').map((r) => r.name)).toEqual(['a', 'b', 'c']);
    });

    it('orderBy honours the direction', () => {
      expect(arrayUtilities.orderBy(rows, { property: 'age', direction: 'desc' }).map((r) => r.name)).toEqual([
        'c',
        'b',
        'a',
      ]);
    });

    it('orderBy throws without property', () => {
      expect(() => arrayUtilities.orderBy(rows, {})).toThrow('Property is required');
    });

    it('countBy counts per value', () => {
      expect(arrayUtilities.countBy(rows, 'ok')).toEqual({ true: 2, false: 1 });
    });

    it('partition splits on truthiness', () => {
      const [yes, no] = arrayUtilities.partition(rows, 'ok');
      expect(yes).toHaveLength(2);
      expect(no).toHaveLength(1);
    });

    it('minBy and maxBy return the item', () => {
      expect(arrayUtilities.minBy(rows, 'age')?.name).toBe('a');
      expect(arrayUtilities.maxBy(rows, 'age')?.name).toBe('c');
    });
  });

  describe('legacy', () => {
    it('toggle adds or removes an item', () => {
      expect(arrayUtilities.toggle([1, 2], 3)).toEqual([1, 2, 3]);
      expect(arrayUtilities.toggle([1, 2, 3], 3)).toEqual([1, 2]);
    });

    it('shuffle keeps the same items', () => {
      expect(arrayUtilities.shuffle([1, 2, 3]).sort()).toEqual([1, 2, 3]);
    });

    it('groupBy and keyBy use the trimmed property', () => {
      expect(Object.keys(arrayUtilities.groupBy(rows, ' ok '))).toEqual(['true', 'false']);
      expect(Object.keys(arrayUtilities.keyBy(rows, 'name'))).toEqual(['b', 'a', 'c']);
    });

    it('take and takeRight', () => {
      expect(arrayUtilities.take([1, 2, 3] as any, 2)).toEqual([1, 2]);
      expect(arrayUtilities.takeRight([1, 2, 3] as any, 2)).toEqual([2, 3]);
    });

    it('getRandomItem returns null on empty array and an item otherwise', () => {
      expect(arrayUtilities.getRandomItem([])).toBeNull();
      expect([1, 2, 3]).toContain(arrayUtilities.getRandomItem([1, 2, 3]));
    });
  });

  describe('validation', () => {
    it('drop throws on a negative count', () => {
      expect(() => arrayUtilities.drop([1], -1)).toThrow('Count must be a positive integer');
    });

    it('windowed throws on a size of 0', () => {
      expect(() => arrayUtilities.windowed([1], 0)).toThrow('Size must be greater than 0');
    });

    it('minBy and maxBy return null on empty array', () => {
      expect(arrayUtilities.minBy([], 'age')).toBeNull();
      expect(arrayUtilities.maxBy([], 'age')).toBeNull();
    });
  });
});
