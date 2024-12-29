import { z } from 'zod';

export enum EAutoCompleteOptionsType {
  CASES = 'cases',
}

const QuerySchema = z.object({
  query: z.string().min(1).max(100),
});
const AutoCompleteSchema = z.object({
  type: z.nativeEnum(EAutoCompleteOptionsType),
  query: z.array(QuerySchema),
});

export type TAutoComplete = z.infer<typeof AutoCompleteSchema>;
