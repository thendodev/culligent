/**
 * Pluralizes a string based on a count.
 *
 * @param singular - The singular form of the word.
 * @param count - The number to determine if the word should be singular or plural.
 * @param plural - An optional plural form of the word. If not provided, the singular word with an 's' appended will be used.
 * @returns The pluralized string.
 */
export function pluralize(singular: string, count: number, plural?: string) {
  if (count === 1) {
    return singular;
  }
  if (plural) {
    return plural;
  }
  return `${singular}s`;
}
