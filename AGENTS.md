# DEV-INSTRUCTIONS

Notes on this codebase's architecture and conventions, gathered from analysis (not exhaustive, update as you learn more).

## What this package is

`@keload/node-red-contrib-ultimate-toolkit` is a single generic Node-RED node exposing ~76 utility functions grouped by category (array, async, date, math, network, object, predicates, string, tools, utility functions...), selected via config in one node's editor rather than one node per utility.

## Architecture map

- `src/lib/server-side/fns/*.ts` — pure implementation, one file per category, each exporting a `camelCase` object (e.g. `export const asyncUtilities = {...}`) keyed by function name.
- `src/lib/server-side/index.ts` — aggregates all `fns/*` into `listFunctions`, keyed by snake_case category (runtime registry).
- `src/lib/client-side/list.ts` — parallel metadata registry (`UtilityList`, typed by `src/types/UtilityList.ts`): `description`, `docs`, `mainValue`, `configArgs`, `revealClasses`, output-splitting flags, etc.
- `src/nodes/main/controller.ts` — the one Node-RED runtime node; resolves `config.category`/`config.function`, builds call args (`payload` + optional `mainValue` + optional `configArgs` object), invokes the matching fn wrapped in `attemptAsync` (es-toolkit), and on error calls `this.error(err, msg)` + sets a red "Error" node status.
- `src/nodes/main/editor/templates/*.pug` — editor UI. `common-options.pug` has the generic shared `mainValue` text input (used by functions with a single loosely-typed value: `gt`, `lt`, `take`, `groupBy`, etc.). Category-specific templates (`date-utilities.pug`, `tools-cyclic-counter.pug`, `async-utilities.pug`) declare dedicated `.extra-field.<revealClass>` blocks with real HTML input types (`type='time'`, `type='number'`) for functions that need more than one loosely-typed value, or a properly typed one.
- `src/nodes/main/editor/index.ts` — the `NodeEditorDefinition` (`defaults`, `oneditsave`, `oneditprepare`). Key mechanism: `handleShowDivs()` hides all `.extra-field` elements then reveals only the ones matching the selected function's `revealClasses` (from `list.ts`) — this part is fully generic/data-driven, no per-function branching. A `configArgs` category (e.g. `'dateUtilities'`, `'tools'`, `'asyncUtilities'`) is paired with one `getFormValues(prefix)`/`setFormValues(prefix, ...)` line each in `oneditsave`/`oneditprepare` — this pairing is **not** auto-derived from `list.ts`, so adding a new `configArgs` category means adding one boilerplate line per hook here (mechanical, not conditional logic). The plain `mainValue` field is handled separately/generically by Node-RED's own top-level `defaults` binding (by DOM id `node-input-mainValue`), toggled via the `.additionalMainValue` class rather than `revealClasses`.
- `src/types/NodeMainProps.ts` — typed config shape from the editor; `mainValue: string` is always a string regardless of the target fn's expected type; each `configArgs` category gets its own typed sub-object here (`dateUtilities`, `tools`, `asyncUtilities`), read via `NodeMainProps['<category>']` in the corresponding `fns/*.ts` file (note: the actual runtime shape saved via `getFormValues` is a flat object keyed by whatever follows `node-input-<prefix>-` in the DOM id — for multi-level ids like `tools-cyclicCounter-maxCount` this doesn't perfectly match a nested TS type; a pre-existing inconsistency, not something to "fix" reflexively).

## How to add a new utility function

1. Implement it in the relevant `fns/*.ts` file (or a new file registered in `src/lib/server-side/index.ts`).
2. Add its metadata entry in `src/lib/client-side/list.ts`:
    - `mainValue: { label: '...' }` if it just needs one loosely-typed value shared with other functions.
    - `configArgs: '<category>'` + `revealClasses: ['<category>_<function>']` if it needs a dedicated/typed/multi-field UI (see decision rule below).
3. For the `configArgs` route: add a `.pug` template under `editor/templates/`, `include` it in `editor/index.pug`, add the `defaults`/`getFormValues`/`setFormValues` boilerplate lines in `editor/index.ts`, and a typed shape in `NodeMainProps.ts`.
4. Add a test under `fns/__tests__/` for the server-side logic.

## Decision rule: `mainValue` vs a dedicated `configArgs` field — never mutate the shared field

`mainValue` (`common-options.pug`) is one shared DOM field/id reused by many unrelated functions (`gt`, `lt`, `take`, `groupBy`, `unique`, etc., see `list.ts`). If a function needs a specific input type (`number`, `time`, a `<select>`, multiple fields...), **do not** change `mainValue`'s HTML attributes or add per-function conditional logic in `editor/index.ts` to vary it — that either leaks across every other function sharing the field, or turns the editor JS into a pile of `if (function === 'x')` special cases.

Instead always give that function its **own `configArgs` category**: a new `.pug` template with a real, dedicated DOM id, wired via the exact same three-line boilerplate already repeated for `dateUtilities`/`tools`/`asyncUtilities` (one `defaults` entry, one `getFormValues` line, one `setFormValues` line) — even when the category ends up with just a single field. The `handleShowDivs()`/`revealClasses` show-hide mechanism is already fully generic and needs no changes for this. This keeps `editor/index.ts` function-agnostic and each function's field fully isolated.

## Validation convention (server-side)

No schema library (zod/ajv/joi) is used anywhere. Each fn does its own inline guard and `throw new Error('<message>')` where it exists (see `date-utilities.ts`: `format`, `timeRange`). Errors are caught centrally by the controller — individual fns never need try/catch or custom error shapes. Most `fns/*.ts` files have no such guards at all (only `date-utilities.ts` and partially `network-utilities.ts` do) — this is inconsistent across the codebase, worth knowing before assuming any given fn validates its input.

## Testing convention

Vitest, tests live in `fns/__tests__/*.test.ts` (not colocated, not a top-level `test/` dir), one `describe` block per exported fn object, nested `describe`/`it` per function, assert both happy-path return values and thrown-error messages. No test coverage exists for editor-side (`.ts`/`.pug`) code — only server-side `fns/` logic is unit-tested.

## Tooling

- Biome for lint+format (`pnpm lint` / `pnpm format`, config in `biome.json`; `suspicious.noExplicitAny` is off — `as any`/`unknown` casts are an accepted pattern here).
- TypeScript via `tsc --noEmit` (`pnpm typecheck`).
- Build via `@keload/node-red-dxp` (`pnpm build`).
- `pnpm dev` (`node-red-dxp watch`) to run a live Node-RED instance while developing.
- `pnpm test` for Vitest.
- No runtime `dependencies` in `package.json` — the build tree-shakes everything into the bundle.
