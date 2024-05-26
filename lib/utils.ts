import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserProps } from '@/models/User.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
