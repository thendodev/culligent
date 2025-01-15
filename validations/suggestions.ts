import { z } from 'zod';
import { objectIdValidator } from './mongoose';

export enum ESuggestionType {
  CASES = 'cases',
}

export const SuggestionSchema = z.object({
  type: z.nativeEnum(ESuggestionType),
  query: z.string().min(1).max(100),
});

export type TSuggestion = z.infer<typeof SuggestionSchema>;
