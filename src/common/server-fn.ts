export const serverFn = {
  network_utilities: {
    ping: {
      fn: () => {
        console.log('ping');
      },
    },
  },
};

export function getServerFn(category: string, fn: string) {
  return serverFn?.[category]?.[fn];
}
