import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import CaseDetails from './components/case-details';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getCaseHandler } from '@/handlers/handleCases';

const CaseBuilder = async ({ params }: { params: { id: string[] } }) => {
  const queryKey = 'cases';
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cases', params.id],
    queryFn: () => getCaseHandler(params.id[0]),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <PageWrapper title="new-case" description="create a new case from scratch">
      <HydrationBoundary state={dehydratedState}>
        <CaseDetails id={params.id[0]} queryKey={queryKey} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default CaseBuilder;
