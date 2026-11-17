import type { UtilityCategory } from '../../../types/UtilityList';

export const tools: UtilityCategory = {
  cyclicCounter: {
    description:
      "A customizable cyclic counter node for Node-RED that iterates through a defined sequence of numbers and can reset after a set timeout. It allows flexible control over the counter's behavior, making it useful in a variety of automation scenarios.",
    revealClasses: ['tools_cyclicCounter'],
    configArgs: 'tools',
    addNodeIdToConfigArgs: true,
  },
};
