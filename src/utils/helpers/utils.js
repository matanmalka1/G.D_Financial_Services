// Generic search helper for filtering collections by a query string.
// - `items`: array to filter
// - `query`: raw search text
// - `buildHaystack`: function that returns a string or array of strings to search within
export const filterBySearch = (items, query = "", buildHaystack) => {
  const normalized = query?.toString().trim().toLowerCase();
  if (!normalized) return items.slice();

  return items.filter((item) => {
    const haystack = buildHaystack(item);
    const values = Array.isArray(haystack) ? haystack : [haystack];

    return values.some((value) =>
      (value || "").toString().toLowerCase().includes(normalized),
    );
  });
};
