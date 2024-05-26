import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import CaseDetails from './components/case-details';

const CaseBuilder = () => {
  return (
    <PageWrapper title="new-case" description="create a new case from scratch">
      <CaseDetails />
    </PageWrapper>
  );
};

export default CaseBuilder;
