import React from 'react';
import PageWrapper from '../components/page-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostsHandler } from '@/handlers/handle-posts';
import Posts from './components/posts';
import { EGenericQueryKeys } from '@/global/config';
import getQueryClient from '@/app/providers/query-client';
import { handleGetUserSettingsByUserId } from '@/handlers/handle-user';
import { useUserServer } from '@/lib/useUserServer';

const PostsPage = async () => {
  const user = await useUserServer();
  const queryClient = getQueryClient();
  const queryKey = [EGenericQueryKeys.POSTS];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: getPostsHandler,
  });

  // const data = await queryClient.fetchQuery({
  //   queryFn: handleGetUserSettingsByUserId,
  //   queryKey: [EGenericQueryKeys.USER_SETTINGS, user?._id],
  // });

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
