import type { UtilityCategory } from '../../../types/UtilityList';

export const asyncUtilities: UtilityCategory = {
  delay: {
    description: 'Delays the message by the specified amount of time',
    revealClasses: ['asyncUtilities_delay'],
    configArgs: 'asyncUtilities',
  },
};
