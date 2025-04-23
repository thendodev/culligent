'use client';
import { getCasesHandler } from '@/handlers/handle-cases';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { caseTableColumns } from './cases-column';
import { DataTable } from '@/components/modules/data-table';
import { dateFormat, EGenericQueryKeys } from '@/global/config';
import { Suspense } from 'react';

const CasesClient = () => {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: [EGenericQueryKeys.CASES],
    queryFn: getCasesHandler,
  });

  const cases = data?.map((item) => ({
    ...item,
    _id: item._id,
    questions: item?.questions?.length,
    status: item.isFeatured ? 'Featured' : 'Draft',
    createdAt: new Date(item.createdAt ?? '')?.toLocaleDateString(
      'en-us',
      dateFormat,
    ),
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable
        data={cases ?? []}
        columns={caseTableColumns}
        searchKey={'name'}
      />
    </Suspense>
  );
};

export default CasesClient;
