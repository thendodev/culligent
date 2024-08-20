'use client';
import { getPostHandler } from '@/handlers/handlePosts';
import { QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import PageWrapper from '../../components/page-wrapper';

type TPostProps = {
  params: {
    id: string;
  };
};

const Post = ({ params: { id } }: TPostProps) => {
  const queryKey = ['posts'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getPostHandler(id),
    enabled: !!id,
  });

  return (
    <PageWrapper title="Post" description="Post">
      <div className="w-full border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--cruto-foreground)]">
        <div className="w-full text-xl font-bold p-4">
          {!id ? 'Create Post' : 'Update Post'}
        </div>
        <div className="w-full flex">
          <div className="flex-1 bg-[var(--cruto-background)]"></div>
          <div className="flex-3"></div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Post;
