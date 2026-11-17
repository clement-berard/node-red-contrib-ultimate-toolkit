import type { UtilityCategory } from '../../../types/UtilityList';

export const networkUtilities: UtilityCategory = {
  ipInformation: {
    description: 'Fetches detailed information about an IP address',
    docs: 'By default is your current IP address',
  },
  ipVersion: {
    description: 'Returns IP version (4, 6, or 0 if invalid) for a given IP address string',
  },
  networkInterfaces: {
    description: 'Lists all network interfaces of the current machine (ethernet, wifi, etc.)',
  },
};
