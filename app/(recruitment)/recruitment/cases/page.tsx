import PageWrapper from '../components/page-wrapper';
import { getCasesHandler } from '@/handlers/handleCases';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/app/query-client';
import CasesClient from './components/cases';
const Cases = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cases'],
    queryFn: getCasesHandler,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <PageWrapper
      title={'Case library'}
      description={'A library of all existing cases.'}
    >
      <HydrationBoundary state={dehydratedState}>
        <CasesClient />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default Cases;
