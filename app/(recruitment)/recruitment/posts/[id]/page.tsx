import React from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostHandler } from '@/handlers/handlePosts';
import Post from './components/post';

interface IPostPageProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params: { id } }: IPostPageProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostHandler(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post />
    </HydrationBoundary>
  );
};

export default PostPage;
