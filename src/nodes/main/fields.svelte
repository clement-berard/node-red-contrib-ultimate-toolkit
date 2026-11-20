<script lang="ts">
  import { Checkbox, Hint, Input, Row, Select, useT } from '@keload/node-red-dxp/ui';
  import { type Fields, fieldRows, i18nKey, inputAttrs } from '../../utils/fields';

  // Renders the declared fields of a function, bound on the saved object of its category
  let { fields, config }: { fields: Fields; config: Record<string, any> } = $props();

  const t = useT();
  const rows = $derived(fieldRows(fields));
</script>

{#each rows as row (row.label)}
  <Row label={t(row.label)} icon={row.icon}>
    {#each row.fields as { key, field } (key)}
      {@const base = i18nKey(key, field)}
      {#if field.kind === 'checkbox'}
        <Checkbox bind:checked={config[key]} text={t(base)} />
      {:else if field.kind === 'select'}
        <Select
          bind:value={config[key]}
          options={field.options.map((value) => ({ value, text: field.rawOptions ? value : t(`${base}_${value}`, value) }))}
        />
      {:else}
        <Input {...inputAttrs(field)} bind:value={config[key]} />
      {/if}
      {#if field.hint}<Hint>{t(`${base}_hint`)}</Hint>{/if}
    {/each}
  </Row>
{/each}
