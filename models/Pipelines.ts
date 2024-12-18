import { mongoDbConnection } from '@/lib/database/mongoose';
import { TPipeline, TStage } from '@/validations/pipeline';
import { Schema } from 'mongoose';

const StageSchema = new Schema<TStage>({
  name: { type: String, required: true },
  reviewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  cases: [{ type: Schema.Types.ObjectId, ref: 'Case' }],
});

const PipelineSchema = new Schema<TPipeline>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  stages: [StageSchema],
});

export default mongoDbConnection.model('Pipeline', PipelineSchema);
