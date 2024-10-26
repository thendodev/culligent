import { TPipeline } from '@/validations/pipeline';
import Mongoose from 'mongoose';

const StageSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  reviewer: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const PipelineSchema = new Mongoose.Schema<TPipeline>({
  pipeline: { type: String, minLength: 2, required: true },
  stages: [StageSchema],
});

export default Mongoose.model('Pipeline', PipelineSchema);
