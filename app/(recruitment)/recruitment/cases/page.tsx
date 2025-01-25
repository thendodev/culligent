import PageWrapper from '../components/page-wrapper';
import { getCasesHandler } from '@/handlers/handleCases';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CasesClient from './components/cases';
import { Suspense } from 'react';
import getQueryClient from '@/app/providers/query-client';
const Cases = async () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['cases'],
    queryFn: getCasesHandler,
  });

  return (
    <PageWrapper
      title={'Case library'}
      description={'A library of all existing cases.'}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <CasesClient />
        </Suspense>
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default Cases;
