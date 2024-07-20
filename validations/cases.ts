import z from 'zod';

export const QuestionSchema = z.object({
  question: z.string().min(1).max(1000),
  type: z.string().min(1).max(100),
  skill: z.string().min(1).max(100),
  skill_level: z.string().min(1).max(100),
  points: z.coerce.number(),
  answers: z
    .object({
      answer: z.string().min(1).max(1000),
      correct: z.boolean(),
    })
    .array(),
});

export const CaseSchema = z.object({
  name: z.string().min(1).max(100),
  duration: z.coerce.number(),
  description: z.string().min(1).max(1000),
  questions: QuestionSchema.array(),
  isFeatured: z.boolean().default(true),
});

export type TCase = z.infer<typeof CaseSchema>;
export type TQuestion = z.infer<typeof QuestionSchema>;
