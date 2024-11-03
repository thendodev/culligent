'use client';
import { getCasesHandler } from '@/handlers/handleCases';
import { useQuery } from '@tanstack/react-query';
import { caseTableColumns } from './cases-column';
import { DataTable } from '@/components/modules/data-table';
import { dateFormat, EGenericQueryKeys } from '@/global/config';

const CasesClient = () => {
  const { data, isLoading } = useQuery({
    queryKey: [EGenericQueryKeys.CASES],
    queryFn: getCasesHandler,
  });
  const cases = data?.map((item) => ({
    _id: item._id,
    questions: item?.questions?.length,
    status: item.isFeatured ? 'Featured' : 'Draft',
    createdAt: new Date(item.createdAt).toLocaleDateString('en-us', dateFormat),
  })) as any;

  return (
    <DataTable
      data={cases ?? []}
      columns={caseTableColumns}
      searchKey={'name'}
    />
  );
};

export default CasesClient;
