import type { UtilityCategory } from '../../../types/UtilityList';
import { field } from '../../../utils/fields';

export const tools: UtilityCategory = {
  cyclicCounter: {
    description:
      "A customizable cyclic counter node for Node-RED that iterates through a defined sequence of numbers and can reset after a set timeout. It allows flexible control over the counter's behavior, making it useful in a variety of automation scenarios.",
    fields: {
      'cyclicCounter-maxCount': field.number({ i18n: 'maxCount', icon: 'sort-numeric-asc' }),
      'cyclicCounter-resetDelay': field.number({ i18n: 'resetDelay', icon: 'clock-o', hint: true }),
    },
    addNodeIdToConfigArgs: true,
  },
};
