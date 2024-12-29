import { getPostHandler } from '@/handlers/handlePosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import PageWrapper from '../components/page-wrapper';
import { ProjectRoutes } from '@/global/routes';
import Progression from './components/progression';

interface IPostLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

const PostLayout = async ({ children, params: { id } }: IPostLayoutProps) => {
  console.log(id);
  const queryKey = ['posts', id];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getPostHandler(id),
  });

  const stages = [
    {
      name: 'Post',
      href: `/${ProjectRoutes.recruitment}/posts/`,
    },
    {
      name: 'Pipeline',
      href: `/${ProjectRoutes.recruitment}/posts/${ProjectRoutes.pipeline}/`,
    },
  ];

  return (
    <PageWrapper title="Post" description="Post">
      <Progression stages={stages} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default PostLayout;
