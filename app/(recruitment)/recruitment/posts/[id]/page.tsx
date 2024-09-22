import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { getPostHandler } from '@/handlers/handlePosts';
import { TPost } from '@/models/Posts';

interface IPostPageProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params: { id } }: IPostPageProps) => {
  const queryClient = new QueryClient();

  const post = await queryClient.fetchQuery<TPost | null>({
    queryKey: ['posts', id],
    queryFn: async () => getPostHandler(id),
  });

  return <div></div>;
};

export default PostPage;
