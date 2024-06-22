import z from 'zod';

export const QuestionSchema = z.object({
  question: z.string().min(1).max(1000),
  type: z.string().min(1).max(100),
  skill: z.string().min(1).max(100),
  skill_level: z.string().min(1).max(100),
  points: z.string().transform((i) => parseInt(i)),
  answers: z
    .object({
      answer: z.string().min(1).max(1000),
      correct: z.boolean(),
    })
    .array(),
});

export const CaseSchema = z.object({
  name: z.string().min(1).max(100),
  duration: z.string().transform((i) => parseFloat(i)),
  description: z.string().min(1).max(1000),
  questions: QuestionSchema.array(),
});

export type TCase = z.infer<typeof CaseSchema>;
export type TQuestion = z.infer<typeof QuestionSchema>;
