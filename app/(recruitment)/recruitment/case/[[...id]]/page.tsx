import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import Case from './components/case';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getCaseHandler } from '@/handlers/handleCases';

const CaseBuilder = async ({ params }: { params: { id: string } }) => {
  const queryKey = 'cases';
  const id = params.id && params.id[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cases', id],
    queryFn: () => getCaseHandler(id),
  });

  return (
    <PageWrapper title="new-case" description="create a new case from scratch">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Case id={id} queryKey={queryKey} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default CaseBuilder;
