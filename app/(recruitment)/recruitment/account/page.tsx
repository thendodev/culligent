import React from 'react';
import PageWrapper from '../components/page-wrapper';
import AccountForm from './components/account-form';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { handleUserAccount } from '@/handlers/handle-user';

const Account = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['account'],
    queryFn: handleUserAccount,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <PageWrapper description="Account Settings" title="ACCOUNT">
      <HydrationBoundary state={dehydratedState}>
        <AccountForm />
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default Account;
