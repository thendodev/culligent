import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import CaseDetails from './components/case-details';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getCaseHandler } from '@/handlers/handleCases';
import getQueryClient from '@/app/providers/query-client';

const CaseBuilder = async ({ params }: { params: { id: string } }) => {
  const queryKey = 'cases';
  const queryClient = new QueryClient();
  !!params.id &&
    queryClient.prefetchQuery({
      queryKey: ['cases', params.id],
      queryFn: () => getCaseHandler(params.id),
    });
  const dehydratedState = dehydrate(queryClient);

  return (
    <PageWrapper title="new-case" description="create a new case from scratch">
      <HydrationBoundary state={dehydratedState}>
        <CaseDetails id={params.id} queryKey={queryKey} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default CaseBuilder;
