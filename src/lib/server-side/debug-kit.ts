export type DebugSection = 'msg' | 'flow' | 'global' | 'node' | 'env' | 'meta';

export interface ContextLike {
  keys(): string[];
  get(key: string): unknown;
}

export interface SnapshotOptions {
  sections: DebugSection[];
  excludeKeys: string[];
  maxDepth: number;
}

export interface SnapshotSources {
  msg: Record<string, unknown>;
  flow: ContextLike;
  global: ContextLike;
  node: ContextLike;
  env: Record<string, unknown>;
  meta: {
    nodeId: string;
    nodeName?: string;
    flowId?: string;
    now: number;
    previousAt?: number;
  };
}

// Plain, JSON-friendly copy: circular references, depth, excluded keys, Buffers and functions are all handled
export function safeClone(
  value: unknown,
  maxDepth: number,
  excludeKeys: string[] = [],
  depth = 0,
  seen = new WeakSet<object>(),
): unknown {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof value === 'bigint') {
    return `${value}n`;
  }
  if (typeof value === 'function') {
    return `[Function ${value.name || 'anonymous'}]`;
  }
  if (typeof value !== 'object') {
    return value;
  }
  if (Buffer.isBuffer(value)) {
    return `[Buffer ${value.length} bytes]`;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? 'Invalid Date' : value.toISOString();
  }
  if (value instanceof Error) {
    return { name: value.name, message: value.message };
  }
  if (seen.has(value)) {
    return '[Circular]';
  }

  const entries: [string, unknown][] = Array.isArray(value)
    ? value.map((item, index) => [String(index), item])
    : value instanceof Map
      ? [...value].map(([key, item]) => [String(key), item])
      : value instanceof Set
        ? [...value].map((item, index) => [String(index), item])
        : Object.entries(value);

  if (depth >= maxDepth) {
    return Array.isArray(value) ? `[Array(${entries.length})]` : '[Object]';
  }

  seen.add(value);
  const clone = (item: unknown) => safeClone(item, maxDepth, excludeKeys, depth + 1, seen);
  let result: unknown;
  if (Array.isArray(value) || value instanceof Set) {
    result = entries.map(([, item]) => clone(item));
  } else {
    result = Object.fromEntries(
      entries.filter(([key]) => !excludeKeys.includes(key)).map(([key, item]) => [key, clone(item)]),
    );
  }
  // only the current branch counts as circular: the same object may legitimately appear twice
  seen.delete(value);
  return result;
}

export function readContext(context: ContextLike): Record<string, unknown> {
  return Object.fromEntries(context.keys().map((key) => [key, context.get(key)]));
}

export function describePayload(payload: unknown): { type: string; size?: number } {
  if (payload === null) {
    return { type: 'null' };
  }
  if (Buffer.isBuffer(payload)) {
    return { type: 'buffer', size: payload.length };
  }
  if (Array.isArray(payload)) {
    return { type: 'array', size: payload.length };
  }
  if (typeof payload === 'string') {
    return { type: 'string', size: payload.length };
  }
  if (typeof payload === 'object') {
    return { type: 'object', size: Object.keys(payload).length };
  }
  return { type: typeof payload };
}

export function parseExcludeKeys(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);
}

export function buildSnapshot(sources: SnapshotSources, options: SnapshotOptions): Record<string, unknown> {
  const { sections, excludeKeys, maxDepth } = options;
  const clone = (value: unknown) => safeClone(value, maxDepth, excludeKeys);
  const snapshot: Record<string, unknown> = {};

  if (sections.includes('meta')) {
    const { nodeId, nodeName, flowId, now, previousAt } = sources.meta;
    snapshot.meta = {
      nodeId,
      nodeName: nodeName || undefined,
      flowId,
      msgId: sources.msg._msgid,
      at: new Date(now).toISOString(),
      sinceLastMs: previousAt === undefined ? undefined : now - previousAt,
      payload: describePayload(sources.msg.payload),
    };
  }
  if (sections.includes('msg')) {
    snapshot.msg = clone(sources.msg);
  }
  if (sections.includes('flow')) {
    snapshot.flow = clone(readContext(sources.flow));
  }
  if (sections.includes('global')) {
    snapshot.global = clone(readContext(sources.global));
  }
  if (sections.includes('node')) {
    snapshot.node = clone(readContext(sources.node));
  }
  if (sections.includes('env')) {
    snapshot.env = clone(sources.env);
  }
  return snapshot;
}
