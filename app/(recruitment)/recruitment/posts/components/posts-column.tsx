'use client';

import { ColumnDef } from '@tanstack/react-table';
import PostActions from './post-actions';
import { TPost } from '@/validations/posts';
import { TWithId } from '@/global/types';

export type PostTableProps = {
  name: string;
  createdAt: Date;
  candidates: number;
  status: string;
} & TWithId<TPost>;

export const PostTableColumns: ColumnDef<PostTableProps>[] = [
  {
    header: 'Post',
    accessorKey: 'title',
  },
  {
    header: 'Date Created',
    accessorKey: 'createdAt',
  },
  {
    header: 'Candidates',
    accessorKey: 'candidates',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      return <PostActions data={row.original} />;
    },
  },
];
