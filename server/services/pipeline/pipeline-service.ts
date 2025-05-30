import { ApiResponse } from '@/global/response.types';
import Pipelines from '@/models/Pipelines';
import { TPipeline } from '@/validations/pipeline';
import { HttpStatusCode } from 'axios';
import { ObjectId, WithId } from 'mongodb';

export const createPipelineService = async (
  pipeline: TPipeline,
): Promise<ApiResponse<TPipeline>> => {
  const pipelineCreated = await Pipelines.create(pipeline);
  if (!pipelineCreated)
    return {
      data: null,
      success: false,
      message: 'Pipeline not created',
      code: HttpStatusCode.NotModified,
    };

  return {
    data: pipelineCreated,
    success: true,
    message: 'Pipeline created successfully',
    code: HttpStatusCode.Created,
  };
};

export const getPipelineService = async (
  id: ObjectId,
): Promise<ApiResponse<WithId<TPipeline>>> => {
  const pipeline = await Pipelines.findById(id);
  if (!pipeline)
    return {
      data: null,
      success: false,
      message: 'Pipeline not found',
      code: HttpStatusCode.NotFound,
    };

  return {
    data: pipeline.toObject(),
    success: true,
    message: 'Pipeline found',
    code: HttpStatusCode.Ok,
  };
};

export const updatePipelineService = async (
  pipeline: WithId<TPipeline>,
): Promise<ApiResponse<WithId<TPipeline>>> => {
  const updatedPipeline = await Pipelines.findOneAndUpdate(
    {
      _id: pipeline._id,
    },
    pipeline,
    { new: true },
  );

  if (!updatedPipeline) {
    return {
      data: null,
      success: false,
      message: 'Pipeline not updated',
      code: HttpStatusCode.NotModified,
    };
  }

  return {
    data: updatedPipeline,
    success: true,
    message: 'Pipeline updated successfully',
    code: HttpStatusCode.Ok,
  };
};
