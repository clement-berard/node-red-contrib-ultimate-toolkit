import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@keload/node-red-dxp/utils/controller', () => ({
  evaluateNodeProperty: vi.fn(async ({ value }: { value: unknown }) => [null, value]),
  splitBooleanOutputs: vi.fn((value: boolean, msg: unknown) => (value ? [msg, null] : [null, msg])),
}));

import { tools } from '../../../lib/server-side/fns/tools';
import controller from '../controller';

type Handler = (msg: any, send?: unknown, done?: unknown) => Promise<void>;

function setup(config: Record<string, unknown>) {
  const handlers: Record<string, Handler> = {};
  const node = {
    id: 'node-1',
    on: vi.fn((event: string, handler: Handler) => {
      handlers[event] = handler;
    }),
    status: vi.fn(),
  };
  const send = vi.fn();
  const done = vi.fn();
  (globalThis as any).RED = { nodes: { createNode: vi.fn() } };
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
      entry: 'a',
      entryType: 'msg',
      inverseReturnValue: true,
    });
    await run({});
    expect(send.mock.calls[0][0].payload).toBe(false);
  });

  it('splits boolean outputs when enabled', async () => {
    const { send, run } = setup({
      category: 'predicates',
      function: 'isString',
      entry: 'a',
      entryType: 'msg',
      splitBooleanOutputs: true,
    });
    await run({});
    const [outputs] = send.mock.calls[0];
    expect(outputs[0].payload).toBe(true);
    expect(outputs[1]).toBeNull();
  });

  it('clears the counters on close', () => {
    const { handlers } = setup({ category: 'tools', function: 'cyclicCounter' });
    expect(() => (handlers.close as any)()).not.toThrow();
  });
});
