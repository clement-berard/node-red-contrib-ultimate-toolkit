export function filterByPrefix(
  arr: Array<Record<string, unknown>>,
  prefix: string,
  removePrefix = true,
): Record<string, unknown> {
  return arr.map((obj) =>
    Object.fromEntries(
      Object.entries(obj)
        .filter(([key]) => key.startsWith(prefix) || key === 'nodeId')
        .map(([key, value]) => [removePrefix ? key.replace(prefix, '') : key, value]),
    ),
  )[0];
}
