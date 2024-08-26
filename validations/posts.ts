import { z } from 'zod';

const tagsValidationSchema = z.object({
  name: z.string().min(1).max(100),
});
const certificationsValidationSchema = z.object({
  name: z.string().min(1).max(100),
  level: z.string().min(1).max(100),
});
const idealCandidateValidationSchema = z.object({
  experience: z.number().min(1).max(100),
  skills: z.array(z.string().min(1).max(100)),
  education: z.string().min(1).max(100),
  certifications: z.array(certificationsValidationSchema).optional(),
});

export const postsValidationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  role: z.string().min(1).max(1500),
  idealCandidate: idealCandidateValidationSchema,
  tags: z.array(tagsValidationSchema).optional(),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
});

export type TPostValidation = z.infer<typeof postsValidationSchema>;
export type TCandidateValidation = z.infer<
  typeof idealCandidateValidationSchema
>;
