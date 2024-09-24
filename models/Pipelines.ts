import Papr, { schema, types } from 'papr';

const StageSchema = schema({
  name: types.string({ required: true }),
});
const PipelineSchema = schema({
  pipeline: types.string({ minLength: 2, required: true }),
  stage: types.array(StageSchema),
});
