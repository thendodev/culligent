import { z } from 'zod';
import { objectIdValidator } from './mongoose';

const skillsValidationSchema = z.object({
  name: z.string().min(1).max(100),
});
const certificationsValidationSchema = z.object({
  name: z.string().min(1).max(100),
  level: z.string().min(1).max(100),
});
const idealCandidateValidationSchema = z.object({
  experience: z.coerce.number().min(0).max(100),
  skills: z.array(skillsValidationSchema).optional(),
  education: z.string().min(1).max(100),
  certifications: z.array(certificationsValidationSchema).optional(),
});

export const postsValidationSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  role: z.string().min(1).max(1500),
  idealCandidate: idealCandidateValidationSchema,
  applicants: z.array(z.string()).optional(),
  userId: objectIdValidator,
  isFeatured: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TPost = z.infer<typeof postsValidationSchema>;
export type TIdealCandidate = z.infer<typeof idealCandidateValidationSchema>;
export type TPostSkills = z.infer<typeof skillsValidationSchema>;
export type TPostCertifications = z.infer<
  typeof certificationsValidationSchema
>;
