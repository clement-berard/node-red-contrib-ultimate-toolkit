// "debug-kit 1", "debug-kit 2"...: one above the highest number already used by a sibling node
export function nextNodeName(base: string, existingNames: (string | undefined)[]): string {
  const prefix = `${base} `;
  const highest = existingNames.reduce((max, name) => {
    if (!name?.startsWith(prefix)) {
      return max;
    }
    const suffix = name.slice(prefix.length);
    return /^\d+$/.test(suffix) ? Math.max(max, Number(suffix)) : max;
  }, 0);
  return `${prefix}${highest + 1}`;
}
