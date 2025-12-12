import { delay } from 'es-toolkit';

export const asyncUtilities = {
  delay: (_, inputProp: unknown) => {
    const realProp = inputProp as number;
    return delay(realProp);
  },
};
