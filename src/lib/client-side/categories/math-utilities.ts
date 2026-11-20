import type { UtilityCategory } from '../../../types/UtilityList';
import { es, mdn } from '../../../utils/docs';
import { type ConfigOf, field } from '../../../utils/fields';

const range = {
  min: field.number({ i18n: 'min', step: 'any' }),
  max: field.number({ i18n: 'max', step: 'any' }),
};

const roundFields = {
  decimals: field.number({ default: '2', min: 0, i18n: 'decimals' }),
};

export type MathConfig = ConfigOf<typeof range & typeof roundFields>;

export const mathUtilities: UtilityCategory = {
  abs: {
    description: 'Returns the absolute value',
    docs: mdn('Math/abs'),
  },
  acos: {
    description: 'Returns the arccosine, in radians',
    docs: mdn('Math/acos'),
  },
  asin: {
    description: 'Returns the arcsine, in radians',
    docs: mdn('Math/asin'),
  },
  atan: {
    description: 'Returns the arctangent, in radians',
    docs: mdn('Math/atan'),
  },
  ceil: {
    description: 'Rounds up to the next integer',
    docs: mdn('Math/ceil'),
  },
  clamp: {
    description: 'Restricts the number between Min and Max',
    fields: range,
    docs: es('math/clamp'),
  },
  cos: {
    description: 'Returns the cosine of an angle in radians',
    docs: mdn('Math/cos'),
  },
  exp: {
    description: 'Returns e raised to the power of the number',
    docs: mdn('Math/exp'),
  },
  floor: {
    description: 'Rounds down to the previous integer',
    docs: mdn('Math/floor'),
  },
  inRange: {
    description: 'True if the number is greater than or equal to Min and lower than Max',
    fields: range,
    canSplitBooleanOutputs: true,
    inverseReturnValue: true,
    docs: es('math/inRange'),
  },
  log: {
    description: 'Returns the natural logarithm (base e)',
    docs: mdn('Math/log'),
  },
  max: {
    description: 'Returns the largest value of the array',
    docs: mdn('Math/max'),
  },
  mean: {
    description: 'Returns the average of the array',
    docs: es('math/mean'),
  },
  min: {
    description: 'Returns the smallest value of the array',
    docs: mdn('Math/min'),
  },
  median: {
    description: 'Returns the median of the array',
    docs: es('math/median'),
  },
  random: {
    description: 'Returns a random number from 0 (included) to 1 (excluded)',
    docs: mdn('Math/random'),
  },
  round: {
    description: 'Rounds to the nearest integer',
    docs: mdn('Math/round'),
  },
  sin: {
    description: 'Returns the sine of an angle in radians',
    docs: mdn('Math/sin'),
  },
  sum: {
    description: 'Returns the sum of the array',
    docs: es('math/sum'),
  },
  tan: {
    description: 'Returns the tangent of an angle in radians',
    docs: mdn('Math/tan'),
  },
  trunc: {
    description: 'Removes the decimal part',
    docs: mdn('Math/trunc'),
  },
  roundTo: {
    description: 'Rounds to the given number of decimals',
    fields: roundFields,
    docs: es('math/round'),
  },
};
