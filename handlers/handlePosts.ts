import { dateFormat } from '@/global/config';
import { TWithId } from '@/global/types';
import { privateRequest } from '@/lib/requests';
import { TPipeline } from '@/validations/pipeline';
import { TPost } from '@/validations/posts';

enum EPostRoutes {
  POSTS = '/recruitment/posts',
}
export const getPostsHandler = async () => {
  const { data } = await privateRequest.get(EPostRoutes.POSTS);

  //remap data to match the case column schema
  return data?.map((item: TWithId<TPost>) => ({
    ...item,
    status: item.isFeatured ? 'Featured' : 'Draft',
    createdAt: new Date(item?.createdAt || '').toLocaleDateString(
      'en-us',
      dateFormat,
    ),
  }));
};

export const getPostHandler = async (
  id: string,
): Promise<TWithId<TPost> & { pipeline: TWithId<TPipeline> }> => {
  const { data } = await privateRequest.get(`${EPostRoutes.POSTS}/${id}`);
  return data;
};

export const updatePostHandler = async (data: TWithId<TPost>) => {
  const { data: response } = await privateRequest.put(
    `${EPostRoutes.POSTS}/${data._id}`,
    data,
  );
  return response;
};

export const createPostHandler = async (data: TPost) => {
  const { data: response } = await privateRequest.post(EPostRoutes.POSTS, data);
  return response.data;
};

export const deletePostHandler = async (id: string) => {
  const { data } = await privateRequest.delete(`${EPostRoutes.POSTS}/${id}`);
  return data;
};
