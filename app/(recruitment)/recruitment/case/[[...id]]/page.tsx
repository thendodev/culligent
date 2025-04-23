import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import Case from './components/case';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getCaseHandler } from '@/handlers/handle-cases';
import { EGenericQueryKeys } from '@/global/config';

const CaseBuilder = async ({ params }: { params: { id: string } }) => {
  const id = params.id && params.id[0];
  const queryKey = [EGenericQueryKeys.CASES, id];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => getCaseHandler(id),
  });

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Case id={id} queryKey={queryKey} />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default CaseBuilder;
