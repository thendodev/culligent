import { Types } from 'mongoose';
import { z } from 'zod';

const StageValidationSchema = z.object({
  name: z.string().min(2),
  cases: z
    .array(z.string())
    .transform((val) => val.map((v) => Types.ObjectId.createFromBase64(v)))
    .or(z.array(z.string())),
  reviewers: z
    .array(z.string())
    .transform((val) => val.map((v) => Types.ObjectId.createFromBase64(v))),
});
const PipelineValidationSchema = z.object({
  userId: z.custom<Types.ObjectId>(),
  stages: z.array(StageValidationSchema),
  isArchived: z.boolean(),
});

export type TPipeline = z.infer<typeof PipelineValidationSchema>;
export type TStage = z.infer<typeof StageValidationSchema>;
export default PipelineValidationSchema;
