import { sleep } from 'radash';

export const asyncUtilities = {
  delay: (_, inputProp: unknown) => {
    const realProp = inputProp as number;
    return sleep(realProp);
  },
};
