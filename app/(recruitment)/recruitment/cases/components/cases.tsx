'use client';
import { getCasesHandler } from '@/handlers/handleCases';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { caseTableColumns } from './cases-column';
import { DataTable } from '@/components/modules/data-table';

const CasesClient = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['cases'],
    queryFn: getCasesHandler,
  });
  return (
    <DataTable
      data={data ?? []}
      columns={caseTableColumns}
      searchKey={'name'}
    />
  );
};

export default CasesClient;
