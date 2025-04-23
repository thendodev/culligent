import { z } from 'zod';
import { objectIdValidator } from './mongoose';
export enum EPostView {
  CARDS = 'cards',
  TABLE = 'table',
}
export const postFiltersValidation = z.object({
  dateRange: z.date(),
  minApplicants: z.number(),
  maxApplicants: z.number(),
  includeArchived: z.boolean(),
  includeUnpublished: z.boolean(),
});

export const postSettingsValidation = z.object({
  view: z.nativeEnum(EPostView),
  filters: postFiltersValidation,
});
export const userSettingsValidation = z.object({
  userId: objectIdValidator,
  post: postSettingsValidation,
});

export type TPostSettings = z.infer<typeof postSettingsValidation>;
export type TPostFilters = z.infer<typeof postFiltersValidation>;
export type TUserSettings = z.infer<typeof userSettingsValidation>;
