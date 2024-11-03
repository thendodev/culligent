import { z } from 'zod';
import { ObjectId } from 'mongodb';

const StageValidationSchema = z.object({
  name: z.string().min(2),
  color: z.string().min(2),
  description: z.string().min(2),
  cases: z
    .array(z.string())
    .transform((val) => val.map((v) => new ObjectId(v)))
    .or(z.array(z.string())),
  reviewers: z
    .array(z.string())
    .transform((val) => val.map((v) => new ObjectId(v))),
});
const PipelineValidationSchema = z.object({
  userId: z.custom<ObjectId>(),
  stages: z.array(StageValidationSchema),
});

export type TPipeline = z.infer<typeof PipelineValidationSchema>;
export type TStage = z.infer<typeof StageValidationSchema>;
export default PipelineValidationSchema;
