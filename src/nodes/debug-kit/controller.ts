import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { NodeMessage } from 'node-red';
import { buildSnapshot, type DebugSection, parseExcludeKeys } from '../../lib/server-side/debug-kit';
import type { NodeDebugKitProps } from '../../types/NodeDebugKitProps';

const DEFAULT_MAX_DEPTH = 5;

// debug-kit: logs the whole context of a message (msg, flow, global, node, env, meta) in one debug entry
export default function (this: NodeControllerInst<NodeDebugKitProps>, config: NodeControllerConfig<NodeDebugKitProps>) {
  RED.nodes.createNode(this, config);

  const sections = (
    [
      ['meta', config.showMeta],
      ['msg', config.showMsg],
      ['flow', config.showFlow],
      ['global', config.showGlobal],
      ['node', config.showNode],
      ['env', config.showEnv],
    ] as [DebugSection, boolean][]
  )
    .filter(([, enabled]) => enabled)
    .map(([section]) => section);
  const excludeKeys = parseExcludeKeys(config.excludeKeys);
  const maxDepth = Number(config.maxDepth) > 0 ? Number(config.maxDepth) : DEFAULT_MAX_DEPTH;
  const target = config.target ?? 'sidebar';

  let previousAt: number | undefined;

  this.on('input', (msg, send, done) => {
    try {
      const now = Date.now();
      const context = this.context();
      const snapshot = buildSnapshot(
        {
          msg: msg as Record<string, unknown>,
          flow: context.flow,
          global: context.global,
          node: context,
          env: process.env,
          meta: { nodeId: this.id, nodeName: config.name, flowId: this.z, now, previousAt },
        },
        { sections, excludeKeys, maxDepth },
      );
      previousAt = now;

      if (target === 'sidebar' || target === 'both') {
        // same payload shape as the native debug node, so the entry shows up in the debug sidebar tree
        const encoded = (RED.util as any).encodeObject({ msg: snapshot });
        RED.comms.publish(
          'debug',
          {
            ...encoded,
            id: this.id,
            z: this.z,
            name: config.name || 'debug-kit',
            topic: msg.topic,
            property: 'debug-kit',
          },
          false,
        );
      }
      if (target === 'console' || target === 'both') {
        this.log(JSON.stringify(snapshot, null, 2));
      }
      if (config.showStatus) {
        const at = new Date(now).toLocaleTimeString();
        this.status({ fill: 'blue', shape: 'dot', text: `${(msg as NodeMessage)._msgid ?? '-'} · ${at}` });
      }

      if (config.passthrough) {
        send(msg);
      }
      done();
    } catch (err) {
      this.status({ fill: 'red', shape: 'ring', text: 'Error' });
      done(err as Error);
    }
  });
}
