import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserProps } from '@/models/User.types';

/**
 * Combines multiple CSS class names using the `clsx` and `twMerge` utilities.
 *
 * @param inputs - An array of class names or values that can be used to conditionally apply classes.
 * @returns The merged class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
