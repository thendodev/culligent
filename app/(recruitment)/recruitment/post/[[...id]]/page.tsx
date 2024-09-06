import { getPostHandler } from '@/handlers/handlePosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import PageWrapper from '../../components/page-wrapper';
import Post from './component/post';

type TPostProps = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params: { id } }: TPostProps) => {
  const queryKey = ['posts', id];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getPostHandler(id),
  });

  return (
    <PageWrapper title="Post" description="Post">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Post id={id} queryKey={queryKey} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default PostPage;
