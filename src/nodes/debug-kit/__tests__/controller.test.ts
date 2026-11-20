import { beforeEach, describe, expect, it, vi } from 'vitest';
import controller from '../controller';

type Handler = (msg: any, send: unknown, done: unknown) => void;

const publish = vi.fn();

function setup(config: Record<string, unknown>) {
  const handlers: Record<string, Handler> = {};
  const store = (data: Record<string, unknown>) => ({ keys: () => Object.keys(data), get: (key: string) => data[key] });
  const node = {
    id: 'node-1',
    z: 'flow-1',
    on: vi.fn((event: string, handler: Handler) => {
      handlers[event] = handler;
    }),
    status: vi.fn(),
    log: vi.fn(),
    context: () => Object.assign(store({ n: 3 }), { flow: store({ f: 1 }), global: store({ g: 2 }) }),
  };
  const send = vi.fn();
  const done = vi.fn();
  (globalThis as any).RED = {
    nodes: { createNode: vi.fn() },
    util: { encodeObject: vi.fn((value: unknown) => ({ format: 'Object', msg: JSON.stringify(value) })) },
    comms: { publish },
  };
  controller.call(
    node as any,
    {
      showMeta: true,
      showMsg: true,
      showFlow: true,
      showGlobal: true,
      showNode: true,
      showEnv: false,
      excludeKeys: 'req',
      maxDepth: 5,
      target: 'sidebar',
      passthrough: false,
      showStatus: true,
      ...config,
    } as any,
  );
  const run = (msg: any) => handlers.input(msg, send, done);
  return { node, send, done, run };
}

describe('debug-kit controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('publishes the snapshot to the debug sidebar and sets the status', () => {
    const { node, run, send, done } = setup({});
    run({ _msgid: 'm1', payload: 'hi', topic: 't', req: 'x' });

    const [channel, entry] = publish.mock.calls[0];
    expect(channel).toBe('debug');
    expect(entry).toMatchObject({ id: 'node-1', z: 'flow-1', name: 'debug-kit', topic: 't', property: 'debug-kit' });
    const logged = JSON.parse(entry.msg).msg;
    expect(logged.msg).toEqual({ _msgid: 'm1', payload: 'hi', topic: 't' });
    expect(logged.flow).toEqual({ f: 1 });
    expect(logged.global).toEqual({ g: 2 });
    expect(logged.node).toEqual({ n: 3 });
    expect(logged.env).toBeUndefined();
    expect(node.status).toHaveBeenCalledWith(expect.objectContaining({ fill: 'blue' }));
    expect(send).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledWith();
  });

  it('logs to the console only and forwards the message with pass-through', () => {
    const { node, run, send } = setup({ target: 'console', passthrough: true, showStatus: false });
    const msg = { _msgid: 'm2', payload: 1 };
    run(msg);

    expect(publish).not.toHaveBeenCalled();
    expect(node.log).toHaveBeenCalledOnce();
    expect(node.status).not.toHaveBeenCalled();
    expect(send).toHaveBeenCalledWith(msg);
  });

  it('does both with target "both" and falls back to the default depth', () => {
    const { node, run } = setup({ target: 'both', maxDepth: 0 });
    run({ _msgid: 'm3' });

    expect(publish).toHaveBeenCalledOnce();
    expect(node.log).toHaveBeenCalledOnce();
  });

  it('reports errors through done and a red status', () => {
    const { node, run, done } = setup({});
    publish.mockImplementationOnce(() => {
      throw new Error('boom');
    });
    run({ _msgid: 'm4' });

    expect(node.status).toHaveBeenCalledWith({ fill: 'red', shape: 'ring', text: 'Error' });
    expect(done).toHaveBeenCalledWith(expect.objectContaining({ message: 'boom' }));
  });
});
