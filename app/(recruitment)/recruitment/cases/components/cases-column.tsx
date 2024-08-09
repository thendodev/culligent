'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './cell-actions';
import { TCase } from '@/models/Cases';

export type CaseTableProps = {
  name: string;
  createdAt: Date;
  questions: number;
  status: string;
} & TCase;

export const caseTableColumns: ColumnDef<CaseTableProps>[] = [
  {
    header: 'Case',
    accessorKey: 'name',
  },
  {
    header: 'Date Created',
    accessorKey: 'createdAt',
  },
  {
    header: 'Questions',
    accessorKey: 'questions',
  },
  {
    header: 'Invites',
    accessorKey: 'invites',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
