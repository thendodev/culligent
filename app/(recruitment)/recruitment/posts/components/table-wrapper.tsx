import React from 'react';
import { usePostContext } from '../state/state';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPostsHandler } from '@/handlers/handlePosts';
import { dateFormat } from '@/global/config';
import { DataTable } from '@/components/modules/data-table';
import { PostTableColumns } from './posts-column';

const TableWrapper = () => {
  const queryKey = usePostContext((state) => state.state.queryKey);
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: getPostsHandler,
  });

  const posts = data?.map((item: any) => ({
    ...item,
    _id: item._id,
    candidates: item?.questions?.length,
    status: item.isFeatured ? 'Featured' : 'Draft',
    createdAt: new Date(item.createdAt ?? '')?.toLocaleDateString(
      'en-us',
      dateFormat,
    ),
  }));
  return <DataTable columns={PostTableColumns} data={posts} searchKey={''} />;
};

export default TableWrapper;
