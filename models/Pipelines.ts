import { mongoDbConnection } from '@/lib/database/mongoose';
import { TPipeline, TStage } from '@/validations/pipeline';
import { Schema } from 'mongoose';

const StageSchema = new Schema<TStage>({
  name: { type: String, required: true },
  reviewers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  cases: [{ type: Schema.Types.ObjectId, ref: 'Cases' }],
});

const PipelineSchema = new Schema<TPipeline>({
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Posts', unique: true, require },
  stages: [StageSchema],
});

export default mongoDbConnection.model('Pipeline', PipelineSchema);
