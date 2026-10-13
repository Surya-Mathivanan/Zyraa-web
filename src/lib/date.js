/**
 * Shared date formatting. Lives outside the page files so importing it does not
 * break React Fast Refresh (a component file must only export components).
 */
export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
