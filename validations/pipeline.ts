import { z } from 'zod';

const StageValidationSchema = z.object({
  name: z.string().min(2),
  color: z.string().min(2),
  description: z.string().min(2),
});
const PipelineValidationSchema = z.object({
  userId: z.string().min(8),
  stages: z.array(StageValidationSchema),
});

export type TPipeline = z.infer<typeof PipelineValidationSchema>;
export default PipelineValidationSchema;
