import type { UtilityCategory } from '../../../types/UtilityList';
import { es } from '../../../utils/docs';

export const mathUtilities: UtilityCategory = {
  abs: {},
  acos: {},
  asin: {},
  atan: {},
  ceil: {},
  clamp: {
    description: 'Restricts the number between Min and Max',
    revealClasses: ['mathUtilities_range'],
    configArgs: 'mathUtilities',
    docs: es('math/clamp'),
  },
  cos: {},
  exp: {},
  floor: {},
  inRange: {
    description: 'True if the number is greater than or equal to Min and lower than Max',
    revealClasses: ['mathUtilities_range'],
    configArgs: 'mathUtilities',
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('math/inRange'),
  },
  log: {},
  max: {},
  mean: {},
  min: {},
  median: {},
  random: {},
  round: {},
  sin: {},
  sum: {
    docs: es('math/sum'),
  },
  tan: {},
  trunc: {},
};
