import type { NodeMainProps } from '../../../types/NodeMainProps';
import { filterByPrefix } from '../../../utils/utils';

const counters = new Map<string, number>();
const timers = new Map<string, NodeJS.Timeout>();

export const tools = {
  cyclicCounter: (_input: number, ...params: Record<string, unknown>[]) => {
    const prefix = 'cyclicCounter-';
    const counterParams = filterByPrefix(params, prefix) as NodeMainProps['tools']['cyclicCounter'];
    const maxCount = Number(counterParams.maxCount);
    const nodeId = counterParams.nodeId;
    const resetDelay = Number(counterParams.resetDelay) || 0;

    const currentCounter = counters.get(nodeId) || 1;
    const nextCounter = (currentCounter % maxCount) + 1;

    counters.set(nodeId, nextCounter);

    if (timers.has(nodeId)) {
      clearTimeout(timers.get(nodeId));
    }

    if (resetDelay > 0) {
      const timer = setTimeout(() => {
        counters.delete(nodeId); // Supprime au lieu de set(nodeId, 1)
        timers.delete(nodeId);
      }, resetDelay);

      timers.set(nodeId, timer);
    }

    return currentCounter;
  },

  clearCounter: () => {
    timers.clear();
    counters.clear();
  },
};
