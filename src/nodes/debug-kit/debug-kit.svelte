<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import type { NodeDebugKitProps } from '../../types/NodeDebugKitProps';
  import { nextNodeName } from '../../utils/next-node-name';

  export const definition: SvelteNodeConfig<NodeDebugKitProps>['definition'] = {
    category: 'toolkit',
    color: '#87A980',
    paletteLabel: 'debug-kit',
    icon: 'font-awesome/fa-bug',
    // a node added without a name gets "debug-kit N", like the native debug node
    onadd(this: NodeDebugKitProps) {
      if (this.name) return;
      const names: (string | undefined)[] = [];
      RED.nodes.eachNode((n: any) => {
        if (n.type === this.type && n.id !== this.id) names.push(n.name);
      });
      this.name = nextNodeName('debug-kit', names);
    },
  };

  export const defaults: SvelteNodeConfig<NodeDebugKitProps>['defaults'] = {
    name: { value: '' },
    showMeta: { value: true },
    showMsg: { value: true },
    showFlow: { value: true },
    showGlobal: { value: true },
    showNode: { value: true },
    showEnv: { value: false },
    excludeKeys: { value: 'req,res' },
    maxDepth: { value: 5 },
    target: { value: 'sidebar' },
    passthrough: { value: false },
    showStatus: { value: true },
    outputs: { value: 0 },
  };

  export function label(this: NodeDebugKitProps) {
    return this.name || 'debug-kit';
  }

  export function onsave(values: NodeDebugKitProps) {
    values.outputs = values.passthrough ? 1 : 0;
  }
</script>

<script lang="ts">
  import { Checkbox, Input, Row, Select, useT } from '@keload/node-red-dxp/ui';

  let { node }: { node: NodeDebugKitProps } = $props();

  const t = useT();

  const targets = ['sidebar', 'console', 'both'].map((value) => ({ value, text: t(`target_${value}`) }));
</script>

<Row label={t('name')} icon="tag"><Input bind:value={node.name} /></Row>

<Row label={t('sections')} icon="list">
  <Checkbox bind:checked={node.showMeta} text={t('meta')} />
  <Checkbox bind:checked={node.showMsg} text={t('msg')} />
  <Checkbox bind:checked={node.showFlow} text={t('flow')} />
  <Checkbox bind:checked={node.showGlobal} text={t('global')} />
  <Checkbox bind:checked={node.showNode} text={t('node')} />
  <Checkbox bind:checked={node.showEnv} text={t('env')} />
</Row>

<Row label={t('excludeKeys')} icon="filter"><Input placeholder="req,res" bind:value={node.excludeKeys} /></Row>

<Row label={t('maxDepth')} icon="sort-numeric-asc"><Input type="number" min="1" bind:value={node.maxDepth} /></Row>

<Row label={t('target')} icon="desktop"><Select bind:value={node.target} options={targets} /></Row>

<Row label={t('passthrough')} icon="arrow-circle-o-right">
  <Checkbox bind:checked={node.passthrough} text={t('passthroughText', 'Send the message to an output')} />
</Row>

<Row label={t('status')} icon="info-circle">
  <Checkbox bind:checked={node.showStatus} text={t('statusText', 'Show the last message id and time')} />
</Row>
