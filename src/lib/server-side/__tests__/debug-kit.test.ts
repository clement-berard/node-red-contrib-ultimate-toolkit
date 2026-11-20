import { describe, expect, it } from 'vitest';
import {
  buildSnapshot,
  type ContextLike,
  describePayload,
  parseExcludeKeys,
  readContext,
  safeClone,
} from '../debug-kit';

const context = (data: Record<string, unknown>): ContextLike => ({
  keys: () => Object.keys(data),
  get: (key) => data[key],
});

describe('safeClone', () => {
  it('keeps primitives and summarises bigint, functions, buffers, dates and errors', () => {
    function named() {}
    expect(safeClone(null, 5)).toBeNull();
    expect(safeClone(undefined, 5)).toBeUndefined();
    expect(safeClone(12, 5)).toBe(12);
    expect(safeClone(10n, 5)).toBe('10n');
    expect(safeClone(named, 5)).toBe('[Function named]');
    expect(safeClone(() => {}, 5)).toBe('[Function anonymous]');
    expect(safeClone(Buffer.from('abc'), 5)).toBe('[Buffer 3 bytes]');
    expect(safeClone(new Date('2026-01-02T03:04:05.000Z'), 5)).toBe('2026-01-02T03:04:05.000Z');
    expect(safeClone(new Date('nope'), 5)).toBe('Invalid Date');
    expect(safeClone(new Error('boom'), 5)).toEqual({ name: 'Error', message: 'boom' });
  });

  it('converts Map and Set', () => {
    expect(safeClone(new Map([['a', 1]]), 5)).toEqual({ a: 1 });
    expect(safeClone(new Set([1, 2]), 5)).toEqual([1, 2]);
  });

  it('flags circular references but not repeated ones', () => {
    const circular: Record<string, unknown> = { name: 'loop' };
    circular.self = circular;
    expect(safeClone(circular, 5)).toEqual({ name: 'loop', self: '[Circular]' });

    const shared = { v: 1 };
    expect(safeClone({ a: shared, b: shared }, 5)).toEqual({ a: { v: 1 }, b: { v: 1 } });
  });

  it('stops at the max depth', () => {
    expect(safeClone({ a: { b: { c: 1 } }, list: [1, 2] }, 1)).toEqual({ a: '[Object]', list: '[Array(2)]' });
  });

  it('drops excluded keys at any level', () => {
    expect(safeClone({ req: 1, keep: { res: 2, ok: 3 } }, 5, ['req', 'res'])).toEqual({ keep: { ok: 3 } });
  });
});

describe('readContext', () => {
  it('reads every key', () => {
    expect(readContext(context({ a: 1, b: 'x' }))).toEqual({ a: 1, b: 'x' });
  });
});

describe('describePayload', () => {
  it('gives the type and size', () => {
    expect(describePayload(null)).toEqual({ type: 'null' });
    expect(describePayload(Buffer.from('ab'))).toEqual({ type: 'buffer', size: 2 });
    expect(describePayload([1, 2, 3])).toEqual({ type: 'array', size: 3 });
    expect(describePayload('abcd')).toEqual({ type: 'string', size: 4 });
    expect(describePayload({ a: 1 })).toEqual({ type: 'object', size: 1 });
    expect(describePayload(5)).toEqual({ type: 'number' });
  });
});

describe('parseExcludeKeys', () => {
  it('splits, trims and drops empty entries', () => {
    expect(parseExcludeKeys(' req, res ,, _session')).toEqual(['req', 'res', '_session']);
    expect(parseExcludeKeys(undefined)).toEqual([]);
  });
});

describe('buildSnapshot', () => {
  const sources = (overrides = {}) => ({
    msg: { _msgid: 'm1', payload: 'hello', req: 'big' },
    flow: context({ f: 1 }),
    global: context({ g: 2 }),
    node: context({ n: 3 }),
    env: { HOME: '/home' },
    meta: { nodeId: 'n1', nodeName: '', flowId: 'z1', now: 2000, previousAt: 1500 },
    ...overrides,
  });

  it('collects every requested section', () => {
    const snapshot = buildSnapshot(sources(), {
      sections: ['meta', 'msg', 'flow', 'global', 'node', 'env'],
      excludeKeys: ['req'],
      maxDepth: 5,
    });
    expect(snapshot).toEqual({
      meta: {
        nodeId: 'n1',
        nodeName: undefined,
        flowId: 'z1',
        msgId: 'm1',
        at: '1970-01-01T00:00:02.000Z',
        sinceLastMs: 500,
        payload: { type: 'string', size: 5 },
      },
      msg: { _msgid: 'm1', payload: 'hello' },
      flow: { f: 1 },
      global: { g: 2 },
      node: { n: 3 },
      env: { HOME: '/home' },
    });
  });

  it('only returns the checked sections', () => {
    const snapshot = buildSnapshot(sources({ meta: { nodeId: 'n1', now: 1000 } }), {
      sections: ['meta', 'flow'],
      excludeKeys: [],
      maxDepth: 5,
    });
    expect(Object.keys(snapshot)).toEqual(['meta', 'flow']);
    expect((snapshot.meta as any).sinceLastMs).toBeUndefined();
  });
});
