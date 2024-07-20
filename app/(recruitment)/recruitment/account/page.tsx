import React from 'react';
import PageWrapper from '../components/page-wrapper';
import AccountForm from './components/account-form';
import getQueryClient from '@/app/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { handleUserAccount } from '@/handlers/handleUser';

const Account = async () => {
  const queryClient = getQueryClient();
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
