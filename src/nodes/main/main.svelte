<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import { title } from 'radash';
  import { getCategories, getFunctionDetails, getFunctionsFromCategory } from '../../lib/client-side';
  import type { NodeMainProps } from '../../types/NodeMainProps';
  import { DEFAULT_OUTPUT_RULE } from '../../utils/output-rules';


  // One saved object per `configArgs` category (arrayUtilities, dateUtilities...), straight from the registry
  const configKeys = [
    ...new Set(
      getCategories.flatMap((category) =>
        getFunctionsFromCategory(category).map(({ key }) => getFunctionDetails(category, key).configArgs),
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
  // field groups to show for the chosen function, declared by `revealClasses` in the registry
  const shows = (group: string) => !!fn.revealClasses?.includes(group);
  const unitOptions = (units: string[]) => units.map((value) => ({ value, text: t(`unit_${value}`) }));
  const addUnits = unitOptions(['day', 'week', 'month', 'year', 'hour', 'minute', 'second', 'millisecond']);
  const boundaryUnits = unitOptions(['day', 'week', 'month', 'year', 'hour', 'minute']);
  // Monday first, 0 is Sunday
  const weekDays = [1, 2, 3, 4, 5, 6, 0];

  // a Select saves its first option (the units start with `day`); the amount and the days get their default here,
  // before the fields exist: a Checkbox would save `false` for a missing value
  $effect.pre(() => {
    const date = node.dateUtilities;
    if (shows('dateUtilities_add')) date.addAmount ??= '1';
    // a day unchecked is saved as false, an absent key means allowed
    if (shows('dateUtilities_timeRange')) for (const day of weekDays) date[`rangeDay${day}`] ??= true;
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

{#if shows('arrayUtilities_orderBy')}
  <Row label={t('property')}><Input bind:value={node.arrayUtilities.property} /></Row>
  <Row label={t('direction')}><Select bind:value={node.arrayUtilities.direction} options={[
        { value: 'asc', text: t('asc') },
        { value: 'desc', text: t('desc') },
      ]} /></Row>
{/if}

{#if shows('mathUtilities_range')}
  <Row label={t('min')}><Input type="number" step="any" bind:value={node.mathUtilities.min} /></Row>
  <Row label={t('max')}><Input type="number" step="any" bind:value={node.mathUtilities.max} /></Row>
{/if}

{#if shows('dateUtilities_now')}
  <Row label={t('format')}>
    <Select
      bind:value={node.dateUtilities.nowFormat}
      options={['timestamp', 'iso8601', 'utcString', 'full', 'long', 'medium', 'short']}
    />
  </Row>
  <Row label={t('token')}><Input placeholder="YYYY-MM-DD" bind:value={node.dateUtilities.nowFormatToken} /></Row>
{/if}

{#if shows('dateUtilities_timeRange')}
  <Row label={t('startTime')} icon="clock-o"><Input type="time" bind:value={node.dateUtilities.rangeStartTime} /></Row>
  <Row label={t('endTime')} icon="clock-o"><Input type="time" bind:value={node.dateUtilities.rangeEndTime} /></Row>
  <Row label={t('activeDays')} icon="calendar">
    {#each weekDays as day}
      <Checkbox bind:checked={node.dateUtilities[`rangeDay${day}`]} text={t(`weekday_${day}`)} />
    {/each}
  </Row>
{/if}

{#if shows('dateUtilities_add')}
  <Row label={t('amount')} icon="plus"><Input type="number" step="any" bind:value={node.dateUtilities.addAmount} /></Row>
  <Row label={t('unit')}><Select bind:value={node.dateUtilities.addUnit} options={addUnits} /></Row>
{/if}

{#if shows('dateUtilities_diff')}
  <Row label={t('unit')}><Select bind:value={node.dateUtilities.diffUnit} options={addUnits} /></Row>
{/if}

{#if shows('dateUtilities_boundary')}
  <Row label={t('unit')}><Select bind:value={node.dateUtilities.boundaryUnit} options={boundaryUnits} /></Row>
{/if}

{#if shows('dateUtilities_reference')}
  <Row label={t('referenceDate')} icon="calendar">
    <Input placeholder="2026-07-25T08:00:00" bind:value={node.dateUtilities.reference} />
    <Hint>{t('referenceHint', 'Empty: now')}</Hint>
  </Row>
{/if}

{#if shows('tools_cyclicCounter')}
  <Row label={t('maxCount')} icon="sort-numeric-asc">
    <Input type="number" bind:value={node.tools['cyclicCounter-maxCount']} />
  </Row>
  <Row label={t('resetDelay')} icon="clock-o">
    <Input type="number" bind:value={node.tools['cyclicCounter-resetDelay']} />
    <div class="hint">{t('resetDelayHint', 'Number in ms - Default 0: no reset')}</div>
  </Row>
{/if}

{#if shows('asyncUtilities_delay')}
  <Row label={t('milliseconds')} icon="clock-o">
    <Input type="number" min="0" bind:value={node.asyncUtilities.milliseconds} />
  </Row>
{/if}

{#if shows('parsers_json')}
  <Row label={t('action')}>
    <Select
      bind:value={node.parsers.action}
      options={[
        { value: 'auto', text: t('actionAuto', 'Convert between JSON String & Object') },
        { value: 'stringify', text: t('actionStringify', 'Always convert to JSON String') },
        { value: 'parse', text: t('actionParse', 'Always convert to JavaScript Object') },
      ]}
    />
  </Row>
  <Row label={t('format')}><Checkbox bind:checked={node.parsers.pretty} text={t('formatJsonText', 'Format JSON string')} /></Row>
{/if}

{#if helpText}
  <div class="alert alert-info text-center">{@html helpText}</div>
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
