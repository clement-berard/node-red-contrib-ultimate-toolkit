# DEV-INSTRUCTIONS

Notes on this codebase's architecture and conventions, gathered from analysis (not exhaustive, update as you learn more).

## What this package is

`@keload/node-red-contrib-ultimate-toolkit` is a single generic Node-RED node exposing ~76 utility functions grouped by category (array, async, date, math, network, object, predicates, string, tools, utility functions...), selected via config in one node's editor rather than one node per utility.

## Architecture map

- `src/lib/server-side/fns/*.ts` — pure implementation, one file per category, each exporting a `camelCase` object (e.g. `export const asyncUtilities = {...}`) keyed by function name.
- `src/lib/server-side/index.ts` — aggregates all `fns/*` into `listFunctions`, keyed by snake_case category (runtime registry).
- `src/lib/client-side/categories/*.ts` — parallel metadata registry, one file per category (same names as `fns/*`), aggregated by `src/lib/client-side/list.ts` (`UtilityList`, typed by `src/types/UtilityList.ts`): `description`, `docs`, `mainValue`, `configArgs`, `revealClasses`, output-splitting flags, etc. Shortcuts: `es('array/chunk')` / `radash('array/toggle')` (from `src/utils/docs.ts`) for doc links, `value('Count')` (from `categories/helpers.ts`) for the shared `mainValue` label.
- `src/nodes/main/controller.ts` — the one Node-RED runtime node; resolves `config.category`/`config.function`, builds call args (`payload` + optional `mainValue` + optional `configArgs` object), invokes the matching fn wrapped in `attemptAsync` (es-toolkit), and on error calls `this.error(err, msg)` + sets a red "Error" node status.
- Common fields (all functions): `entry`/`entryType` (input, typedInput msg/flow/global/str/json/jsonata/env) and `outputProps` (the "Output properties" editableList, one `target = source` line per `OutputRule`, see `src/types/OutputRule.ts`; targets: msg property, flow or global variable; sources: `result` of the function, `input`, or any typedInput type evaluated against the incoming message). The list UI is a `List` of `TypedInput` rows in `main.svelte` (components of `@keload/node-red-dxp/ui`, rows can be reordered). `outputProps` is deliberately not `required` in the editor `defaults`, and the controller falls back to `msg.payload = result` through `getOutputRules` (`src/utils/output-rules.ts`) when a node has no rule: nodes saved before the list existed must keep working and not be flagged invalid. Do not remove that fallback.
- `src/nodes/main/main.svelte` — the whole editor of the node (Svelte 5, compiled by node-red-dxp; see its "Svelte editor" docs). The `<script module>` exports the Node-RED definition (`definition`, `defaults`, `label`, `outputLabels`, `onsave`), the instance script and markup are the form. Fields are `Row`/`Input`/`Select`/`TypedInput`/`List`... bound on `node.<property>`. Visibility is data-driven: each group of extra fields is an `{#if shows('<category>_<function>')}` block, `shows` reading the function's `revealClasses` from the registry (`list.ts`). The saved `defaults` object of each `configArgs` group (`arrayUtilities`, `dateUtilities`, `tools`...) is derived from the registry (`configKeys`): there is no hand-maintained list. `onsave` resets the options hidden by the chosen function and sets `outputs`. The saved shape is unchanged from the pug version (flat keys such as `node.tools['cyclicCounter-maxCount']`), so nodes saved before keep working.
- `src/nodes/main/locales/en-US.json` and `fr.json` — translations of the editor: the form calls `t('key')` (`useT()`), a missing key falls back to the humanized key. Add a key in both files when adding a label. The registry texts are translated through keys derived from the registry (categories and function names stay as technical identifiers): `mv_<mainValue label with non-word characters replaced by _>` and `desc_<category>_<function>` (French only: English falls back to the registry `description`). Keys never contain `.` or `:` (i18next separators). Adding a `mainValue` label or a function means adding these keys to `fr.json`. `docs.mdx` (the sidebar help) stays in English.
- `src/nodes/main/docs.mdx` — the node help shown in the Node-RED sidebar, compiled by node-red-dxp at build time (still a separate file: a Svelte node does not carry its help). It renders one table per category (name + description) straight from the `client-side` registry, so a new function appears in the help with no extra step.
- `src/types/NodeMainProps.ts` — typed config shape from the editor; `mainValue: string` is always a string regardless of the target fn's expected type; each `configArgs` category gets its own typed sub-object here (`dateUtilities`, `tools`, `asyncUtilities`), read via `NodeMainProps['<category>']` in the corresponding `fns/*.ts` file (note: the saved shape is a flat object whose keys are what followed `node-input-<prefix>-` in the old DOM ids — for keys like `cyclicCounter-maxCount` this doesn't perfectly match a nested TS type; a pre-existing inconsistency, not something to "fix" reflexively. It is also the type of the `node` prop of `main.svelte`).

## How to add a new utility function

1. Implement it in the relevant `fns/*.ts` file (or a new file registered in `src/lib/server-side/index.ts`).
2. Add its metadata entry in `src/lib/client-side/categories/<category>.ts`:
    - `mainValue: { label: '...' }` if it just needs one loosely-typed value shared with other functions.
    - `configArgs: '<category>'` + `revealClasses: ['<category>_<function>']` if it needs a dedicated/typed/multi-field UI (see decision rule below).
3. For the `configArgs` route: add an `{#if shows('<category>_<function>')}` block in `main.svelte` with its `Row`s bound on `node.<category>.<field>` (the `defaults` entry of the category is derived from the registry), add the labels to `locales/en-US.json` and `fr.json`, and a typed shape in `NodeMainProps.ts`.
4. Add a test under `fns/__tests__/` for the server-side logic.

## Decision rule: `mainValue` vs a dedicated `configArgs` field — never mutate the shared field

The `mainValue` `Input` of `main.svelte` is one shared field reused by many unrelated functions (`gt`, `lt`, `take`, `groupBy`, `unique`, etc., see `categories/*.ts`). If a function needs a specific input type (`number`, `time`, a `Select`, multiple fields...), **do not** change the shared `mainValue` field or add per-function conditionals around it — that either leaks across every other function sharing the field, or turns the form into a pile of `if (function === 'x')` special cases.

Instead always give that function its **own `configArgs` category**: a dedicated `{#if shows(...)}` block in `main.svelte` with real, typed fields (`<Input type="number">`, `<Select>`...) bound on `node.<category>.<field>` — even when the category ends up with just a single field. The `shows`/`revealClasses` mechanism and the derived `defaults` need no changes for this. This keeps each function's field fully isolated.

## Wrapper vs direct reference (server-side)

The controller always calls `fn(payload, mainValue?, configArgs?)`. Expose a library function directly (`camelCase: camelCase`) only when it takes the payload alone. When the library function has an optional 2nd parameter (`dedent`, `toArray`, `isEmpty`...) or when `mainValue`/`configArgs` must be interpreted, wrap it (`(input) => fn(input)`) so the extra arguments are never forwarded by accident.

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
