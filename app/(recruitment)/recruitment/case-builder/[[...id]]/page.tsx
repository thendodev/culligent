import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import CaseDetails from '../components/case-details';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getCaseHandler } from '@/handlers/handleCases';

const CaseBuilder = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  !!params.id &&
    (await queryClient.prefetchQuery({
      queryKey: ['cases', params.id],
      queryFn: () => getCaseHandler(params.id),
    }));
  const dehydratedState = dehydrate(queryClient);

  return (
    <PageWrapper title="new-case" description="create a new case from scratch">
      <HydrationBoundary state={dehydratedState}>
        <CaseDetails id={params.id} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default CaseBuilder;
