import { z } from 'zod';

const idealCandidateValidationSchema = z.object({
  experience: z.number().min(1).max(100),
  skills: z.array(z.string().min(1).max(100)),
  education: z.string().min(1).max(100),
  languages: z.array(z.string().min(1).max(100)).optional(),
  certifications: z.array(z.string().min(1).max(100)),
  certifications_level: z.string().min(1).max(100),
});

export const postsValidationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  role: z.string().min(1).max(1500),
  idealCandidate: idealCandidateValidationSchema,
  tags: z.array(z.string().min(1).max(100)),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
});

export type TPostValidation = z.infer<typeof postsValidationSchema>;
export type TCandidateValidation = z.infer<
  typeof idealCandidateValidationSchema
>;
