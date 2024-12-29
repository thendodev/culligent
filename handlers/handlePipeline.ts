import { TWithId } from '@/global/types';
import { privateRequest } from '@/lib/requests';
import { TPipeline } from '@/validations/pipeline';

enum EPipelineRoutes {
  PIPELINE = '/recruitment/pipeline',
}

export const createPipelineHandler = async (data: TPipeline) => {
  const { data: response } = await privateRequest.post(
    EPipelineRoutes.PIPELINE,
    data,
  );
  return response;
};

export const getPipelineHandler = async (id: string) => {
  const { data: response } = await privateRequest.get(
    `${EPipelineRoutes.PIPELINE}/${id}`,
  );
  return response;
};

export const updatePipelineHandler = async (data: TWithId<TPipeline>) => {
  const { data: response } = await privateRequest.put(
    `${EPipelineRoutes.PIPELINE}/${data._id}`,
    data,
  );
  return response;
};
