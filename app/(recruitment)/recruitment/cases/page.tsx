import PageWrapper from '../components/page-wrapper';
import { getCasesHandler } from '@/handlers/handleCases';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import CasesClient from './components/cases';
const Cases = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['cases'],
    queryFn: getCasesHandler,
  });

  return (
    <PageWrapper
      title={'Case library'}
      description={'A library of all existing cases.'}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CasesClient />{' '}
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default Cases;
