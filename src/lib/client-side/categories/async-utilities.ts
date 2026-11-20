import type { UtilityCategory } from '../../../types/UtilityList';
import { type ConfigOf, field } from '../../../utils/fields';

const delayFields = { milliseconds: field.number({ min: 0, icon: 'clock-o' }) };

export type AsyncConfig = ConfigOf<typeof delayFields>;

export const asyncUtilities: UtilityCategory = {
  delay: {
    description: 'Delays the message by the specified amount of time',
    fields: delayFields,
  },
};
