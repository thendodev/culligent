'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './cell-actions';

export type CaseTableProps = {
  _id: string;
  name: string;
  createdAt: string;
  questions: number | undefined;
  status: string;
};

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
