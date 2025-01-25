import React, { Suspense } from 'react';
import PageWrapper from '../components/page-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostsHandler } from '@/handlers/handlePosts';
import Posts from './components/posts';
import { EGenericQueryKeys } from '@/global/config';

const PostsPage = async () => {
  const queryClient = new QueryClient();
  const queryKey = [EGenericQueryKeys.POSTS];

  queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: getPostsHandler,
  });

  return (
    <PageWrapper
      title={'Posts'}
      description={'A library of all existing posts.'}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Posts queryKey={queryKey} />
        </Suspense>
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default PostsPage;
