# DEV-INSTRUCTIONS

Notes on this codebase's architecture and conventions, gathered from analysis (not exhaustive, update as you learn more).

## What this package is

`@keload/node-red-contrib-ultimate-toolkit` is a single generic Node-RED node exposing ~180 utility functions grouped by category (array, async, crypto, date, math, network, object, predicates, string, tools, unit, utility functions...), selected via config in one node's editor rather than one node per utility.

The package also ships a second, independent node, **debug-kit** (see "debug-kit node" below).

## Architecture map

- `src/lib/server-side/fns/*.ts` — pure implementation, one file per category, each exporting a `camelCase` object (e.g. `export const asyncUtilities = {...}`) keyed by function name.
- `src/lib/server-side/index.ts` — aggregates all `fns/*` into `listFunctions`, keyed by snake_case category (runtime registry).
- `src/lib/client-side/categories/*.ts` — parallel metadata registry, one file per category (same names as `fns/*`), aggregated by `src/lib/client-side/list.ts` (`UtilityList`, typed by `src/types/UtilityList.ts`): `description`, `docs`, `mainValue`, `fields`, output-splitting flags, etc. Shortcuts: `es('array/chunk')` / `radash('array/toggle')` (from `src/utils/docs.ts`) for doc links, `value('Count')` (from `categories/helpers.ts`) for the shared `mainValue` label.
- `src/nodes/main/controller.ts` — the one Node-RED runtime node; resolves `config.category`/`config.function`, builds call args (`payload` + optional `mainValue` + optional config object built from `fields`), invokes the matching fn wrapped in `attemptAsync` (es-toolkit), and on error calls `this.error(err, msg)` + sets a red "Error" node status.
- Common fields (all functions): `entry`/`entryType` (input, typedInput msg/flow/global/str/json/jsonata/env) and `outputProps` (the "Output properties" editableList, one `target = source` line per `OutputRule`, see `src/types/OutputRule.ts`; targets: msg property, flow or global variable; sources: `result` of the function, `input`, or any typedInput type evaluated against the incoming message). The list UI is a `List` of `TypedInput` rows in `main.svelte` (components of `@keload/node-red-dxp/ui`, rows can be reordered). `outputProps` is deliberately not `required` in the editor `defaults`, and the controller falls back to `msg.payload = result` through `getOutputRules` (`src/utils/output-rules.ts`) when a node has no rule: nodes saved before the list existed must keep working and not be flagged invalid. Do not remove that fallback.
- `src/nodes/main/main.svelte` — the whole editor of the node (Svelte 5, compiled by node-red-dxp; see its "Svelte editor" docs). The `<script module>` exports the Node-RED definition (`definition`, `defaults`, `label`, `outputLabels`, `onsave`), the instance script and markup are the form. The common fields are `Row`/`Input`/`Select`/`TypedInput`/`List`... bound on `node.<property>`; the options of the chosen function are rendered by `fields.svelte` from its `fields` declaration (see "Declarative fields"), the defaults of each saved category object (`arrayUtilities`, `dateUtilities`, `tools`...) being derived from the registry (`configKey`): there is no hand-maintained list. `onsave` resets the options hidden by the chosen function and sets `outputs`. The saved shape is flat keys under the category object (e.g. `node.tools['cyclicCounter-maxCount']`), unchanged since the pug version, so nodes saved before keep working.
- `src/nodes/main/locales/en-US.json` and `fr.json` — translations of the editor: the form calls `t('key')` (`useT()`), a missing key falls back to the humanized key. Add a key in both files when adding a label. The registry texts are translated through keys derived from the registry (categories and function names stay as technical identifiers): `mv_<mainValue label with non-word characters replaced by _>`, `desc_<category>_<function>` (French only: English falls back to the registry `description`) and the field keys (`field_<key>`, `<i18n>_hint`, `<i18n>_<option>`, see "Declarative fields"), a test fails when one is missing in either file. Keys never contain `.` or `:` (i18next separators). Adding a `mainValue` label or a function means adding these keys to `fr.json`. `docs.mdx` (the sidebar help) stays in English.
- `src/nodes/main/docs.mdx` — the node help shown in the Node-RED sidebar, compiled by node-red-dxp at build time (still a separate file: a Svelte node does not carry its help). It renders one table per category (name + description) straight from the `client-side` registry, so a new function appears in the help with no extra step.
- `src/types/NodeMainProps.ts` — typed config shape of the common fields from the editor; `mainValue: string` is always a string regardless of the target fn's expected type. It is also the type of the `node` prop of `main.svelte`. The options of a category are not declared here: they are typed from its `fields` (`DateConfig`, `MathConfig`... exported by `categories/*.ts`, imported as types by `fns/*.ts`).

## Declarative fields

`src/utils/fields.ts` (pure, no dependency, shared by the editor, the registry and the tests). A function that needs typed options declares them once in its registry entry:

```ts
fields: {
  direction: field.select(['asc', 'desc'], { default: 'asc' }),
  property: field.text(),
}
```

Everything else is derived from that declaration: the saved defaults (`applyDefaults`, run before the form renders), the form (`fields.svelte`), the type of the options received by the fn (`ConfigOf`) and the i18n keys. Kinds: `text`, `number`, `time`, `typed` (a Node-RED typedInput: value under the key, type under `<key>Type`; the controller evaluates it against the message with `resolveTypedFields`, so the fn receives the value, `unknown`, never the type), `checkbox` (needs a `group`, the row label), `select` (needs a `default`; `rawOptions` for technical values shown untranslated). A secret (key, password) is a `typed` field limited to env, flow and global, so it never sits in the flow file (see `crypto-fields.ts`). Fields sharing a `group` render in one row. The options are saved flat under `storageKey(category)` (`date_utilities` -> `dateUtilities`), the key of a field being the saved key: functions sharing a field object (`range`, `referenceFields`...) share the saved value.

i18n: `i18n` (default `field_<key>`) is the base of the label, `<i18n>_hint` (when `hint: true`) and `<i18n>_<option>`; `src/lib/client-side/__tests__/i18n.test.ts` checks that both locales have them.

## debug-kit node

Separate node (`src/nodes/debug-kit/`, same folder layout as `src/nodes/main/`: `controller.ts`, `debug-kit.svelte`, `docs.mdx`, `locales/`). node-red-dxp bundles every node into the same `dist/index.js` + `index.html`, so `package.json` (`node-red.nodes.all`) needs no change per node.

- `src/lib/server-side/debug-kit.ts` — pure logic: `buildSnapshot` (sections meta/msg/flow/global/node/env), `safeClone` (excluded keys, max depth, circular references, Buffer/function/Error/Map/Set), `readContext`, `describePayload`, `parseExcludeKeys`. Context reads are synchronous: non-memory context stores are not supported.
- `controller.ts` — builds the snapshot on each message, publishes it like the native debug node (`RED.comms.publish('debug', RED.util.encodeObject({ msg }))`) and/or `this.log`s it, optional pass-through output, status.
- `debug-kit.svelte` — `defaults` are flat booleans (`showMsg`, `showFlow`...) plus `excludeKeys` (comma separated), `maxDepth`, `target` (`sidebar` | `console` | `both`), `passthrough`, `showStatus`. `onsave` sets `outputs` (0, or 1 with pass-through). `definition.onadd` names a node added without a name `debug-kit N` through `src/utils/next-node-name.ts`.
- `src/types/NodeDebugKitProps.ts` — typed config. Tests: `src/lib/server-side/__tests__/debug-kit.test.ts`, `src/nodes/debug-kit/__tests__/controller.test.ts`, `src/utils/__tests__/next-node-name.test.ts`.
- The README is generated by `build-readme.ts` (`pnpm generate:readme`, run after `pnpm build`): edit the template in that file, never `README.md` directly. It carries a debug-kit section.

## How to add a new utility function

1. Implement it in the relevant `fns/*.ts` file (or a new file registered in `src/lib/server-side/index.ts`).
2. Add its metadata entry in `src/lib/client-side/categories/<category>.ts`:
    - `mainValue: { label: '...' }` if it just needs one loosely-typed value shared with other functions.
    - `fields: {...}` if it needs a dedicated/typed/multi-field UI (see decision rule below). Export a `ConfigOf<typeof fields>` type and use it as the type of the options in the fn.
3. For `fields`: add the labels, hints and option texts to `locales/en-US.json` and `fr.json` (the i18n test tells which keys are missing). Nothing to add in `main.svelte` or `NodeMainProps.ts`.
4. Add a test under `fns/__tests__/` for the server-side logic.

## Decision rule: `mainValue` vs dedicated `fields` — never mutate the shared field

The `mainValue` `Input` of `main.svelte` is one shared field reused by many unrelated functions (`gt`, `lt`, `take`, `groupBy`, `unique`, etc., see `categories/*.ts`). If a function needs a specific input type (`number`, `time`, a `Select`, multiple fields...), **do not** change the shared `mainValue` field or add per-function conditionals around it — that either leaks across every other function sharing the field, or turns the form into a pile of `if (function === 'x')` special cases.

Instead always give that function its own `fields` declaration — even when it ends up with a single field. The renderer, the derived `defaults` and the types need no changes. This keeps each function's field fully isolated.

## Wrapper vs direct reference (server-side)

The controller always calls `fn(payload, mainValue?, config?)`. Expose a library function directly (`camelCase: camelCase`) only when it takes the payload alone. When the library function has an optional 2nd parameter (`dedent`, `toArray`, `isEmpty`...) or when `mainValue`/`config` must be interpreted, wrap it (`(input) => fn(input)`) so the extra arguments are never forwarded by accident.

## Validation convention (server-side)

No schema library (zod/ajv/joi) is used anywhere. Each fn does its own inline guard and `throw new Error('<message>')` where it exists (see `date-utilities.ts`: `format`, `timeRange`). Errors are caught centrally by the controller — individual fns never need try/catch or custom error shapes. Most `fns/*.ts` files have no such guards at all (only `date-utilities.ts` and partially `network-utilities.ts` do) — this is inconsistent across the codebase, worth knowing before assuming any given fn validates its input.

## Testing convention

Vitest, tests live in `fns/__tests__/*.test.ts` (not colocated, not a top-level `test/` dir), one `describe` block per exported fn object, nested `describe`/`it` per function, assert both happy-path return values and thrown-error messages. No test coverage exists for editor-side (`main.svelte`) code — only server-side `fns/` logic is unit-tested.

## Tooling

- Biome for lint+format (`pnpm lint` / `pnpm lint:check` / `pnpm lint:ci` / `pnpm format`, config in `biome.json`; `suspicious.noExplicitAny` is off — `as any`/`unknown` casts are an accepted pattern here).
- TypeScript via `tsc --noEmit` (`pnpm typecheck`). It only checks `.ts` files: the content of `main.svelte` is not type-checked, so keep logic that needs checking in `.ts` files.
- Svelte comes with `@keload/node-red-dxp`: never add `svelte` or `svelte-check` to this package (published package, no tooling; `svelte-check` also refuses TypeScript 7).
- Build via `@keload/node-red-dxp` (`pnpm build`).
- `pnpm dev` (`node-red-dxp watch`) to run a live Node-RED instance while developing.
- `pnpm test` for Vitest (single run), `pnpm test:watch`, `pnpm test:coverage` (thresholds in `vitest.config.ts`, editor code excluded; CI runs it).
- No runtime `dependencies` in `package.json` — the build tree-shakes everything into the bundle.
