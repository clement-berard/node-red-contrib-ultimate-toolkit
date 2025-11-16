export function filterByPrefix(
  arr: Array<Record<string, unknown>>,
  prefix: string,
  removePrefix = true,
  defaultFilteredPrefixes = ['nodeId'],
): Record<string, unknown> {
  return arr.map((obj) =>
    Object.fromEntries(
      Object.entries(obj)
        .filter(([key]) => key.startsWith(prefix) || defaultFilteredPrefixes.includes(key))
        .map(([key, value]) => [removePrefix ? key.replace(prefix, '') : key, value]),
    ),
  )[0];
}

export function getValueOrEmptyString(val: unknown) {
  return val ?? '';
}
