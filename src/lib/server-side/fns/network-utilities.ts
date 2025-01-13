import { isIP } from 'node:net';
import { networkInterfaces } from 'node:os';

export const networkUtilities = {
  ipInformation: async (input: string | undefined) => {
    if (input !== undefined && !isIP(input)) {
      throw new Error('Invalid IP address');
    }
    return (await fetch(`http://ip-api.com/json/${input || ''}`)).json();
  },
  ipVersion: isIP,
  networkInterfaces: networkInterfaces,
};
