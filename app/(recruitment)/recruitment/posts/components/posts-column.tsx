'use client';

import { ColumnDef } from '@tanstack/react-table';
import PostActions from './post-actions';
import { TPost } from '@/models/Posts';

export type PostTableProps = {
  name: string;
  createdAt: Date;
  candidates: number;
  status: string;
} & TPost;

export const PostTableColumns: ColumnDef<PostTableProps>[] = [
  {
    header: 'Post',
    accessorKey: 'name',
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
