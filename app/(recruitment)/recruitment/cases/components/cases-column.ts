'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellActions from './cell-actions';
import { MCase } from '@/models/Cases';

export type CaseTableProps = {
  name: string;
  createdAt: Date;
  questions: number;
  status: string;
  data: MCase;
};

export const caseTableColumns: ColumnDef<CaseTableProps>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Created At',
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
    header: 'Action',
    accessorKey: 'action',
    cell: ({ row }) => CellActions(row.original),
  },
];
