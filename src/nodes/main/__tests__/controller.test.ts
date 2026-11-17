import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@keload/node-red-dxp/utils/controller', () => ({
  evaluateNodeProperty: vi.fn(async ({ value }: { value: unknown }) => [null, value]),
  splitBooleanOutputs: vi.fn((value: boolean, msg: unknown) => (value ? [msg, null] : [null, msg])),
}));

import controller from '../controller';

type Handler = (msg: any) => Promise<void>;

function setup(config: Record<string, unknown>) {
  const handlers: Record<string, Handler> = {};
  const node = {
    id: 'node-1',
    on: vi.fn((event: string, handler: Handler) => {
      handlers[event] = handler;
    }),
    send: vi.fn(),
    error: vi.fn(),
    status: vi.fn(),
  };
  (globalThis as any).RED = { nodes: { createNode: vi.fn() } };
  controller.call(node as any, config as any);
  return { node, handlers };
}

describe('controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls the function and sends the result with call metadata', async () => {
    const { node, handlers } = setup({
      category: 'array_utilities',
      function: 'chunk',
      entry: [1, 2, 3, 4],
      entryType: 'msg',
      mainValue: '2',
    });
    await handlers.input({ topic: 't' });
    expect(node.send).toHaveBeenCalledWith({
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
    const { node, handlers } = setup({
      category: 'array_utilities',
      function: 'chunk',
      entry: [1],
      entryType: 'msg',
      mainValue: '0',
    });
    await handlers.input({});
    expect(node.error).toHaveBeenCalled();
    expect(node.status).toHaveBeenCalledWith({ fill: 'red', shape: 'ring', text: 'Error' });
    expect(node.send).not.toHaveBeenCalled();
  });

  it('passes configArgs and adds the node id when requested', async () => {
    const { node, handlers } = setup({
      category: 'tools',
      function: 'cyclicCounter',
      entry: 0,
      entryType: 'msg',
      tools: { 'cyclicCounter-maxCount': '3', 'cyclicCounter-resetDelay': '' },
    });
    await handlers.input({});
    expect(node.send.mock.calls[0][0].payload).toBe(1);
    expect(node.send.mock.calls[0][0].nodeParams.callWith[1].nodeId).toBe('node-1');
  });

  it('inverses the boolean result when configured', async () => {
    const { node, handlers } = setup({
      category: 'predicates',
      function: 'isString',
      entry: 'a',
      entryType: 'msg',
      inverseReturnValue: true,
    });
    await handlers.input({});
    expect(node.send.mock.calls[0][0].payload).toBe(false);
  });

  it('splits boolean outputs when enabled', async () => {
    const { node, handlers } = setup({
      category: 'predicates',
      function: 'isString',
      entry: 'a',
      entryType: 'msg',
      splitBooleanOutputs: true,
    });
    await handlers.input({});
    const [outputs] = node.send.mock.calls[0];
    expect(outputs[0].payload).toBe(true);
    expect(outputs[1]).toBeNull();
  });

  it('clears the counters on close', () => {
    const { handlers } = setup({ category: 'tools', function: 'cyclicCounter' });
    expect(() => (handlers.close as any)()).not.toThrow();
  });
});
