'use server';
import { dateFormat } from '@/global/config';
import { privateRequest } from '@/lib/requests';
import { TPost } from '@/models/Posts';

enum EPostRoutes {
  POSTS = '/recruitment/posts',
}
export const getPostsHandler = async () => {
  const { data } = await privateRequest.get(EPostRoutes.POSTS);

  //remap data to match the case column schema
  return data?.map((item: TPost) => ({
    ...item,
    status: item.isFeatured ? 'Featured' : 'Draft',
    createdAt: new Date(item.createdAt).toLocaleDateString('en-us', dateFormat),
  }));
};

export const getPostHandler = async (id: string) => {
  const { data } = await privateRequest.get(`${EPostRoutes.POSTS}/${id}`);
  return data;
};
