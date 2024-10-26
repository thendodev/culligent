import { getPostHandler } from '@/handlers/handlePosts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import PageWrapper from '../components/page-wrapper';
import Progression from './components/progression';
import { ProjectRoutes } from '@/global/routes';
import LinkTabs from '@/components/modules/link-tabs';
import { Tabs, TabsList } from '@/components/ui/tabs';

interface IPostLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

const PostLayout = async ({ children, params: { id } }: IPostLayoutProps) => {
  const queryKey = ['posts', id];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getPostHandler(id),
  });

  const stages = [
    {
      name: 'Post',
      href: `/${ProjectRoutes.recruitment}/posts/${id}`,
    },
    {
      name: 'Pipeline',
      href: `/${ProjectRoutes.recruitment}/posts/${ProjectRoutes.pipeline}/${id}/`,
    },
  ];

  return (
    <PageWrapper title="Post" description="Post">
      <div className="w-fit border-b border-[var(--cruto-border)] space-x-2">
        <Tabs>
          <TabsList></TabsList>
        </Tabs>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default PostLayout;
