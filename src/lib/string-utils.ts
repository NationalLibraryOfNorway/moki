export function toProperCase(input: string | undefined): string {
  if (!input) return '';

  const parts = input
    .replace(/([A-Z])/g, ' $1')  // Insert space before capitals
    .replace(/[-_.]/g, ' ')      // Replace hyphens and underscores with spaces
    .toLowerCase()
    .trim()

  return parts[0].toUpperCase() + parts.slice(1);
}