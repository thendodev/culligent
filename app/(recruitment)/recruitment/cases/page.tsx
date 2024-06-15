'use client';

import React, { useEffect } from 'react';
import PageWrapper from '../components/page-wrapper';
import { DataTable } from '@/components/modules/data-table';
import { getCasesHandler } from '@/handlers/handleCases';
import { caseTableColumns } from './components/cases-column';

const Cases = () => {
  const [cases, setCases] = React.useState([]);

  useEffect(() => {
    const getCases = async () => {
      const data = await getCasesHandler();
      setCases(data);
    };
    getCases();
  }, []);

  return (
    <PageWrapper
      title={'Case library'}
      description={'A library of all existing cases.'}
    >
      <DataTable columns={caseTableColumns} data={cases} searchKey={'name'} />
    </PageWrapper>
  );
};

export default Cases;
