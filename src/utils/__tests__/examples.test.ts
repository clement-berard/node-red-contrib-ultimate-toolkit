import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { list } from '../../lib/client-side/list';

const examplesDir = join(__dirname, '../../../examples');
const flows = readdirSync(examplesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => ({ file, nodes: JSON.parse(readFileSync(join(examplesDir, file), 'utf8')) as any[] }));

// the Node-RED flow library checks that every node of the package is used in an example
describe('examples', () => {
  it('use every node of the package', () => {
    const types = new Set(flows.flatMap(({ nodes }) => nodes.map((node) => node.type)));
    expect(types.has('main')).toBe(true);
    expect(types.has('debug-kit')).toBe(true);
  });

  it('only wire to existing nodes and have no tab node', () => {
    for (const { nodes } of flows) {
      const ids = new Set(nodes.map((node) => node.id));
      expect(nodes.some((node) => node.type === 'tab')).toBe(false);
      for (const target of nodes.flatMap((node) => (node.wires ?? []).flat())) {
        expect(ids.has(target)).toBe(true);
      }
    }
  });

  it('call a function that exists', () => {
    for (const node of flows.flatMap(({ nodes }) => nodes).filter((n) => n.type === 'main')) {
      expect(list[node.category]?.[node.function]).toBeDefined();
    }
  });
});
