import { delay } from 'es-toolkit';
import type { NodeMainProps } from '../../../types/NodeMainProps';

export const asyncUtilities = {
  delay: (_: unknown, options: NodeMainProps['asyncUtilities']) => {
    const milliseconds = Number(options?.milliseconds);
    if (!Number.isFinite(milliseconds) || milliseconds < 0) {
      throw new Error('Milliseconds must be a positive number');
    }
    return delay(milliseconds);
  },
};
