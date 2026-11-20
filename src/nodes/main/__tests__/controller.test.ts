import { get, set } from 'es-toolkit/compat';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@keload/node-red-dxp/utils/controller', () => ({
  // msg-typed strings are read from the message, any other value is returned as is (entry values in these tests)
  evaluateNodeProperty: vi.fn(async ({ type, value, msg }: { type: string; value: unknown; msg: object }) => {
    if (type === 'fail') {
      return [new Error('cannot evaluate'), undefined];
    }
    return [undefined, type === 'msg' && typeof value === 'string' ? get(msg, value) : value];
  }),
  splitBooleanOutputs: vi.fn((value: boolean, msg: unknown) => (value ? [msg, null] : [null, msg])),
}));

import { tools } from '../../../lib/server-side/fns/tools';
import controller from '../controller';

type Handler = (msg: any, send?: unknown, done?: unknown) => Promise<void>;

const flowSet = vi.fn();
const globalSet = vi.fn();

function setup(config: Record<string, unknown>) {
  const handlers: Record<string, Handler> = {};
  const node = {
    id: 'node-1',
    on: vi.fn((event: string, handler: Handler) => {
      handlers[event] = handler;
    }),
    status: vi.fn(),
    context: () => ({ flow: { set: flowSet }, global: { set: globalSet } }),
  };
  const send = vi.fn();
  const done = vi.fn();
  (globalThis as any).RED = {
    nodes: { createNode: vi.fn() },
    // same contract as RED.util.setMessageProperty(msg, property, value, createMissing)
    util: { setMessageProperty: (msg: object, property: string, value: unknown) => set(msg, property, value) },
  };
  controller.call(node as any, config as any);
  const run = (msg: any) => handlers.input(msg, send, done);
  return { node, handlers, send, done, run };
}

describe('controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tools.clearCounter();
  });

  it('calls the function and sends the result with call metadata', async () => {
    const { node, send, run } = setup({
      category: 'array_utilities',
      function: 'chunk',
      entry: [1, 2, 3, 4],
      entryType: 'msg',
      mainValue: '2',
    });
    await run({ topic: 't' });
    expect(send).toHaveBeenCalledWith({
      topic: 't',
      payload: [
        [1, 2],
        [3, 4],
      ],
      nodeParams: { callWith: [[1, 2, 3, 4], '2'], callFunction: 'chunk' },
    });
    expect(node.status).toHaveBeenCalledWith({});
  });

  it('reports errors and sets the error status', async () => {
    const { node, send, done, run } = setup({
      category: 'array_utilities',
      function: 'chunk',
      entry: [1],
      entryType: 'msg',
      mainValue: '0',
    });
    await run({});
    expect(done).toHaveBeenCalledWith(expect.any(Error));
    expect(node.status).toHaveBeenCalledWith({ fill: 'red', shape: 'ring', text: 'Error' });
    expect(send).not.toHaveBeenCalled();
  });

  it('reports an unknown function instead of throwing', async () => {
    const { node, send, done, run } = setup({ category: 'nope', function: 'nope', entry: 1, entryType: 'msg' });
    await expect(run({})).resolves.toBeUndefined();
    expect(done).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unknown function "nope.nope"' }));
    expect(node.status).toHaveBeenCalledWith({ fill: 'red', shape: 'ring', text: 'Error' });
    expect(send).not.toHaveBeenCalled();
  });

  it('does not mutate the node configuration', async () => {
    const tools = { 'cyclicCounter-maxCount': '3' };
    const { run } = setup({ category: 'tools', function: 'cyclicCounter', entry: 0, entryType: 'msg', tools });
    await run({});
    expect(tools).toEqual({ 'cyclicCounter-maxCount': '3' });
  });

  it('passes configArgs and adds the node id when requested', async () => {
    const { send, run } = setup({
      category: 'tools',
      function: 'cyclicCounter',
      entry: 0,
      entryType: 'msg',
      tools: { 'cyclicCounter-maxCount': '3', 'cyclicCounter-resetDelay': '' },
    });
    await run({});
    expect(send.mock.calls[0][0].payload).toBe(1);
    expect(send.mock.calls[0][0].nodeParams.callWith[1].nodeId).toBe('node-1');
  });

  it('inverses the boolean result when configured', async () => {
    const { send, run } = setup({
      category: 'predicates',
      function: 'isString',
      entry: 'payload',
      entryType: 'msg',
      inverseReturnValue: true,
    });
    await run({ payload: 'a' });
    expect(send.mock.calls[0][0].payload).toBe(false);
  });

  it('splits boolean outputs when enabled', async () => {
    const { send, run } = setup({
      category: 'predicates',
      function: 'isString',
      entry: 'payload',
      entryType: 'msg',
      splitBooleanOutputs: true,
    });
    await run({ payload: 'a' });
    const [outputs] = send.mock.calls[0];
    expect(outputs[0].payload).toBe(true);
    expect(outputs[1]).toBeNull();
  });

  describe('output properties', () => {
    const base = { category: 'array_utilities', function: 'compact', entry: [0, 1, 2], entryType: 'msg' };
    const rule = (extra: Record<string, unknown>) => ({
      target: 'payload',
      targetType: 'msg',
      source: '',
      sourceType: 'result',
      ...extra,
    });

    it('writes the result to msg.payload by default, also for nodes saved without rules', async () => {
      for (const outputProps of [undefined, []]) {
        const { send, run } = setup({ ...base, outputProps });
        await run({ payload: 'in' });
        expect(send.mock.calls[0][0].payload).toEqual([1, 2]);
      }
    });

    it('writes the result to a nested msg property and keeps the original payload', async () => {
      const { send, run } = setup({ ...base, outputProps: [rule({ target: 'result.items' })] });
      await run({ payload: 'in' });
      const sent = send.mock.calls[0][0];
      expect(sent.result).toEqual({ items: [1, 2] });
      expect(sent.payload).toBe('in');
    });

    it('writes to the flow and global contexts', async () => {
      const { send, run } = setup({
        ...base,
        outputProps: [rule({ target: 'f', targetType: 'flow' }), rule({ target: 'g', targetType: 'global' })],
      });
      await run({ payload: 'in' });
      expect(flowSet).toHaveBeenCalledWith('f', [1, 2]);
      expect(globalSet).toHaveBeenCalledWith('g', [1, 2]);
      expect(send.mock.calls[0][0].payload).toBe('in');
    });

    it('handles several lines with result, input and evaluated sources', async () => {
      const { send, run } = setup({
        ...base,
        outputProps: [
          rule({ target: 'payload' }),
          rule({ target: 'original', sourceType: 'input' }),
          rule({ target: 'topic', sourceType: 'str', source: 'my-topic' }),
          rule({ target: 'copy', sourceType: 'msg', source: 'extra.value' }),
        ],
      });
      await run({ extra: { value: 42 } });
      const sent = send.mock.calls[0][0];
      expect(sent.payload).toEqual([1, 2]);
      expect(sent.original).toEqual([0, 1, 2]);
      expect(sent.topic).toBe('my-topic');
      expect(sent.copy).toBe(42);
    });

    it('evaluates the sources against the incoming message, not the one being built', async () => {
      const { send, run } = setup({
        ...base,
        outputProps: [rule({ target: 'payload' }), rule({ target: 'before', sourceType: 'msg', source: 'payload' })],
      });
      await run({ payload: 'in' });
      expect(send.mock.calls[0][0].before).toBe('in');
    });

    it('reports an empty target', async () => {
      const { send, done, run } = setup({ ...base, outputProps: [rule({ target: '  ' })] });
      await run({});
      expect(done).toHaveBeenCalledWith(expect.objectContaining({ message: 'Output property must not be empty' }));
      expect(send).not.toHaveBeenCalled();
    });

    it('reports a source that cannot be evaluated', async () => {
      const { send, done, run } = setup({ ...base, outputProps: [rule({ sourceType: 'fail', source: 'x' })] });
      await run({});
      expect(done).toHaveBeenCalledWith(expect.objectContaining({ message: 'cannot evaluate' }));
      expect(send).not.toHaveBeenCalled();
    });

    it('reports an unsupported target type', async () => {
      const { send, done, run } = setup({ ...base, outputProps: [rule({ targetType: 'str' })] });
      await run({});
      expect(done).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unsupported output type "str"' }));
      expect(send).not.toHaveBeenCalled();
    });
  });

  describe('typed fields', () => {
    const isAfter = (dateUtilities: Record<string, unknown>) => ({
      category: 'date_utilities',
      function: 'isAfter',
      entry: 'payload',
      entryType: 'msg',
      dateUtilities,
    });

    it('evaluates a typed field against the message before calling the function', async () => {
      const { send, run } = setup(isAfter({ reference: 'limit', referenceType: 'msg' }));
      await run({ payload: '2026-07-25T11:00:00.000Z', limit: '2026-07-25T10:00:00.000Z' });
      expect(send.mock.calls[0][0].payload).toBe(true);
    });

    it('reads a node saved before the field was typed as a plain string', async () => {
      const { send, run } = setup(isAfter({ reference: '2026-07-25T10:00:00.000Z' }));
      await run({ payload: '2026-07-25T09:00:00.000Z' });
      expect(send.mock.calls[0][0].payload).toBe(false);
    });

    it('reports a reference that is not a date', async () => {
      const { done, run } = setup(isAfter({ reference: 'limit', referenceType: 'msg' }));
      await run({ payload: '2026-07-25T11:00:00.000Z', limit: 'nope' });
      expect(done).toHaveBeenCalledWith(expect.objectContaining({ message: 'reference is not a valid date' }));
    });
  });

  it('clears the counters on close', () => {
    const { handlers } = setup({ category: 'tools', function: 'cyclicCounter' });
    expect(() => (handlers.close as any)()).not.toThrow();
  });
});
