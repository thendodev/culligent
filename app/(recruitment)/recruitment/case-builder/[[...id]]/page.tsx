import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';
import React from 'react';
import CaseDetails from '../components/case-details';

const CaseBuilder = ({ params }: { params: { id: string } }) => {
  return (
    <PageWrapper title="new-case" description="create a new case from scratch">
      <CaseDetails id={params.id} />
    </PageWrapper>
  );
};

export default CaseBuilder;
