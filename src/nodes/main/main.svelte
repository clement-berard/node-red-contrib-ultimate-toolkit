<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import { title } from 'radash';
  import { getCategories, getFunctionDetails, getFunctionsFromCategory } from '../../lib/client-side';
  import type { NodeMainProps } from '../../types/NodeMainProps';
  import { DEFAULT_OUTPUT_RULE } from '../../utils/output-rules';


  // One saved object per category declaring `fields` (arrayUtilities, dateUtilities...), straight from the registry
  const configKeys = [
    ...new Set(
      getCategories.flatMap((category) =>
        getFunctionsFromCategory(category).map(({ key }) => getFunctionDetails(category, key).configKey),
      ),
    ),
  ].filter((key): key is string => !!key);

  export const definition: SvelteNodeConfig<NodeMainProps>['definition'] = {
    category: 'toolkit',
    color: '#8EA3A6',
    paletteLabel: 'toolkit',
    icon: 'font-awesome/fa-wrench',
  };

  export const defaults: SvelteNodeConfig<NodeMainProps>['defaults'] = {
    name: { value: '' },
    entry: { value: 'payload', required: true },
    entryType: { value: 'msg', required: true },
    // not required: nodes saved before this option existed must not be flagged invalid
    outputProps: { value: [] },
    category: { value: '', required: true },
    function: { value: '', required: true },
    mainValue: { value: '' },
    splitBooleanOutputs: { value: false },
    inverseReturnValue: { value: false },
    ...Object.fromEntries(configKeys.map((key) => [key, { value: {} }])),
    outputs: { value: 1 },
  };

  export function label(this: NodeMainProps) {
    return this.name || `${this.inverseReturnValue ? '!' : ''}${this.function}` || 'toolkit';
  }

  export function outputLabels(this: NodeMainProps, index: number) {
    return this.outputs > 1
      ? this._(`main.${index === 0 ? 'outputTrue' : 'outputFalse'}`, { defaultValue: index === 0 ? 'True' : 'False' })
      : undefined;
  }

  export function onsave(values: NodeMainProps) {
    const fn = getFunctionDetails(values.category, values.function);
    // options hidden by the chosen function must not stay switched on
    if (!fn.canSplitBooleanOutputs) values.splitBooleanOutputs = false;
    if (!fn.inverseReturnValue) values.inverseReturnValue = false;
    values.outputs = values.splitBooleanOutputs || fn.forceSplitBooleanOutputs ? 2 : 1;
    values.outputProps = values.outputProps.length ? values.outputProps : [DEFAULT_OUTPUT_RULE];
  }
</script>

<script lang="ts">
  import { Checkbox, Hint, Input, List, Row, Select, TypedInput, useT } from '@keload/node-red-dxp/ui';
  import { applyDefaults } from '../../utils/fields';
  import Fields from './fields.svelte';

  let { node }: { node: NodeMainProps } = $props();

  const t = useT();

  const categories = getCategories.map((value) => ({ value, text: title(value) }));
  // "Property (optional)" -> mv_Property_optional
  const mainValueLabel = (label: string) => t(`mv_${label.replace(/\W+/g, '_').replace(/^_|_$/g, '')}`, label);

  // nodes saved before the output list existed show the historical target (msg.payload = result)
  // svelte-ignore state_referenced_locally
  if (!node.outputProps?.length) node.outputProps = [{ ...DEFAULT_OUTPUT_RULE }];

  const fn = $derived(getFunctionDetails(node.category, node.function));
  const functions = $derived(
    node.category ? getFunctionsFromCategory(node.category).map(({ key, label }) => ({ value: key, text: label })) : [],
  );
  // the defaults of the declared fields, set before they are rendered (a Checkbox would save `false` for a missing value)
  $effect.pre(() => {
    if (fn.fields) applyDefaults(node[fn.configKey], fn.fields);
  });

  const helpText = $derived(
    [
      fn.description && t(`desc_${node.category}_${node.function}`, fn.description),
      fn.docs?.replace('View documentation on', t('viewDocs')),
    ]
      .filter(Boolean)
      .join('<br><br>')
      .trim(),
  );
</script>


<Row label={t('name')} icon="tag"><Input bind:value={node.name} /></Row>

<Row label={t('inputData')} icon="arrow-circle-o-right">
  <TypedInput bind:value={node.entry} bind:type={node.entryType} />
</Row>

<Row label={t('category')} icon="list-alt">
  <Select bind:value={node.category} options={categories} empty onchange={() => (node.function = '')} />
</Row>

<Row label={t('function')} icon="code"><Select bind:value={node.function} options={functions} empty /></Row>

{#if fn.mainValue}
  <Row label={fn.mainValue.label ? mainValueLabel(fn.mainValue.label) : t('value')} icon="plus"><Input bind:value={node.mainValue} /></Row>
{/if}

{#if fn.inverseReturnValue}
  <Row label={t('inverse')} icon="arrow-circle-o-right">
    <Checkbox bind:checked={node.inverseReturnValue} text={t('inverseText', 'Inverse the return value (not) of condition')} />
  </Row>
{/if}

{#if fn.canSplitBooleanOutputs}
  <Row label={t('splitOut')} icon="map-signs">
    <Checkbox bind:checked={node.splitBooleanOutputs} text={t('splitOutText', 'Split outputs in two distinct boolean')} />
  </Row>
{/if}

{#if fn.fields}
  <Fields fields={fn.fields} config={node[fn.configKey]} />
{/if}

{#if helpText}
  <!-- inline style: the tray is sized on the natural width of the form, a long help text must not widen it -->
  <div style="contain: inline-size" class="alert alert-info text-center">{@html helpText}</div>
{/if}

<Row label={t('outputProperties')} icon="arrow-circle-o-left">
  <List bind:items={node.outputProps} create={() => ({ ...DEFAULT_OUTPUT_RULE, target: '' })}>
    {#snippet row(rule)}
      <TypedInput bind:value={rule.target} bind:type={rule.targetType} types={['msg', 'flow', 'global']} />
      <span>=</span>
      <TypedInput
        bind:value={rule.source}
        bind:type={rule.sourceType}
        types={[
          { value: 'result', label: t('sourceResult'), hasValue: false },
          { value: 'input', label: t('sourceInput'), hasValue: false },
          'msg',
          'flow',
          'global',
          'str',
          'num',
          'bool',
          'json',
          'jsonata',
          'env',
          'date',
        ]}
      />
    {/snippet}
  </List>
</Row>
