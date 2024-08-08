'use client';
import { getCasesHandler } from '@/handlers/handleCases';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { caseTableColumns } from './cases-column';
import { DataTable } from '@/components/modules/data-table';
import { toast } from '@/components/ui/use-toast';

const CasesClient = () => {
  const { data, isLoading } = useSuspenseQuery({
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
