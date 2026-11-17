import { isIP } from 'node:net';
import { networkInterfaces } from 'node:os';

export const networkUtilities = {
  ipInformation: async (input: string | undefined) => {
    if (input !== undefined && !isIP(input)) {
      throw new Error('Invalid IP address');
    }
    const response = await fetch(`http://ip-api.com/json/${input || ''}`, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) {
      throw new Error(`IP lookup failed (HTTP ${response.status})`);
    }
    return response.json();
  },
  ipVersion: isIP,
  networkInterfaces: networkInterfaces,
};
