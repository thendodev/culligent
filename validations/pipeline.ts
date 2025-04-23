import { Types } from 'mongoose';
import { z } from 'zod';
import { objectIdValidator } from './mongoose';

const StageValidationSchema = z.object({
  name: z.string().min(2),
  cases: z
    .array(z.string())
    .transform((val) =>
      val.map((v) => {
        try {
          return Types.ObjectId.createFromHexString(v);
        } catch (e) {
          throw new Error('Invalid ObjectId');
        }
      }),
    )
    .or(z.array(z.string())),
  reviewers: z.array(z.string()).transform((val) =>
    val.map((v) => {
      try {
        return Types.ObjectId.createFromHexString(v);
      } catch (e) {
        throw new Error('Invalid ObjectId');
      }
    }),
  ),
});
const PipelineValidationSchema = z.object({
  userId: objectIdValidator,
  postId: objectIdValidator,
  stages: z.array(StageValidationSchema),
  isArchived: z.boolean().default(false),
});

export type TPipeline = z.infer<typeof PipelineValidationSchema>;
export type TStage = z.infer<typeof StageValidationSchema>;
export default PipelineValidationSchema;
