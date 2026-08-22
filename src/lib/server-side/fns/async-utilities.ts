import { delay } from 'es-toolkit';
import type { NodeMainProps } from '../../../types/NodeMainProps';

export const asyncUtilities = {
  delay: (_: unknown, options: NodeMainProps['asyncUtilities']) => {
    const realProp = Number(options?.milliseconds);
    return delay(realProp);
  },
};
