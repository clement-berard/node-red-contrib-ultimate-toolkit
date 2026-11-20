import { delay } from 'es-toolkit';
import type { AsyncConfig } from '../../client-side/categories/async-utilities';

export const asyncUtilities = {
  delay: (_: unknown, options: AsyncConfig) => {
    const milliseconds = Number(options?.milliseconds);
    if (!Number.isFinite(milliseconds) || milliseconds < 0) {
      throw new Error('Milliseconds must be a positive number');
    }
    return delay(milliseconds);
  },
};
