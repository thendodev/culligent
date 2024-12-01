import { TPipeline, TStage } from '@/validations/pipeline';
import Mongoose from 'mongoose';

const StageSchema = new Mongoose.Schema<TStage>({
  name: { type: String, required: true },
  reviewers: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' }],
  cases: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Case' }],
});

const PipelineSchema = new Mongoose.Schema<TPipeline>({
  userId: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
  stages: [StageSchema],
});

export default Mongoose.model('Pipeline', PipelineSchema);
