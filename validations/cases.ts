import z from 'zod';
import { objectIdValidator } from './mongoose';

export const AnswerSchema = z.object({
  answer: z.string().min(1).max(1000),
  correct: z.boolean(),
});
export const QuestionSchema = z.object({
  question: z.string().min(1).max(1000),
  type: z.string().min(1).max(100),
  skill: z.string().min(1).max(100),
  skill_level: z.string().min(1).max(100),
  points: z.coerce.number(),
  answers: z.array(AnswerSchema).optional(),
});

export const CaseSchema = z.object({
  userId: objectIdValidator.optional(),
  name: z.string().min(1).max(100),
  duration: z.coerce.number(),
  description: z.string().min(1).max(1000),
  questions: QuestionSchema.array(),
  isFeatured: z.boolean().default(true),
  sharedWith: z
    .array(
      z.object({
        user: objectIdValidator,
        role: z.string().min(1).max(100),
      }),
    )
    .default([]),

  isArchived: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TAnswer = z.infer<typeof AnswerSchema>;
export type TCase = z.infer<typeof CaseSchema>;
export type TQuestion = z.infer<typeof QuestionSchema>;
