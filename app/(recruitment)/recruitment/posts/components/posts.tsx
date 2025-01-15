'use client';

import { DataTable } from '@/components/modules/data-table';
import { getPostsHandler } from '@/handlers/handlePosts';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { PostTableColumns } from './posts-column';

type PostsProps = {
  queryKey: string[];
};

const Posts = ({ queryKey }: PostsProps) => {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: queryKey,
    queryFn: getPostsHandler,
  });

  return (
    <DataTable
      data={data ?? []}
      columns={PostTableColumns}
      searchKey={'name'}
    />
  );
};

export default Posts;
