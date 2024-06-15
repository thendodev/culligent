'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './cell-actions';
import { MCase } from '@/models/Cases';

export type CaseTableProps = {
  name: string;
  createdAt: Date;
  questions: number;
  status: string;
} & MCase;

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
