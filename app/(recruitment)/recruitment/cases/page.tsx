import PageWrapper from '../components/page-wrapper';
import { getCasesHandler } from '@/handlers/handleCases';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CasesClient from './components/cases';
const Cases = async () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
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
