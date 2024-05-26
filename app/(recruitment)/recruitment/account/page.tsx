import React from 'react';
import PageWrapper from '../components/page-wrapper';
import AccountForm from './components/account-form';
import { useUserServer } from '@/lib/useUserServer';

const Account = async () => {
  const user = await useUserServer();

  return (
    <PageWrapper description="Account Settings" title="ACCOUNT">
      <AccountForm account={user} />
    </PageWrapper>
  );
};

export default Account;
