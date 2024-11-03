import React from 'react';
import PageWrapper from '../components/page-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostsHandler } from '@/handlers/handlePosts';
import Posts from './components/posts';

const PostsPage = async () => {
  const queryClient = new QueryClient();
  const queryKey = ['posts'];
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: getPostsHandler,
  });

  return (
    <PageWrapper
      title={'Posts'}
      description={'A library of all existing posts.'}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts queryKey={queryKey} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default PostsPage;
