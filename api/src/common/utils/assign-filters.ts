export const assignFilters = (
  source: Record<string, any>,
  target: Record<string, any>,
) => {
  const entries = Object.entries(source);

  for (const [key, value] of entries) {
    if (value !== undefined) {
      target[key] = value;
    }
  }
};
