import CaseCards from '@/app/(recruitment)/recruitment/dashboard/components/case-cards';
import React from 'react';
import { Grip } from 'lucide-react';
import { DataTable } from '@/components/modules/data-table';
import { caseTableColumns } from './components/cases-column';
import PageWrapper from '@/app/(recruitment)/recruitment/components/page-wrapper';

const page = () => {
  return (
    <PageWrapper title="Dashboard" description="You are in the main panel">
      <div className="flex flex-col content-center items-center justify-center w-full h-full">
        <div className="w-full flex flex-col sm:flex-row gap-2 justify-between items-center">
          <CaseCards
            Icon={Grip}
            title="Use a case from the library"
            desc="Predefined cases ready to import and use"
            action="Use"
            url="cases"
            color="var(--cruto-green)"
          />
          <CaseCards
            Icon={Grip}
            title="Create a case from skills"
            desc="Build your own case from skills"
            action="Use"
            url="case-library"
            color="var(--cruto-pale-grey)"
          />
          <CaseCards
            Icon={Grip}
            title="Request a custom case"
            desc="Request a case be assinged to you"
            action="Use"
            url="case-library"
            color="var(--cruto-purple)"
          />
        </div>

        <div className="w-full">
          <div
            className="w-full h-[80px] rounded-tl-sm rounded-tr-sm
           flex content-center items-center 
            border-[color:var(--cruto-white)]
            text-[color:var(--cruto-pale-grey)]
            "
          >
            Active Cases
          </div>
          <DataTable columns={caseTableColumns} data={[]} searchKey="name" />
        </div>
        <div className="w-full">
          <div
            className="w-full h-[80px] rounded-tl-sm rounded-tr-sm
           flex content-center items-center 
            border-[color:var(--cruto-white)]
            text-[color:var(--cruto-pale-grey)]
            "
          >
            Custom Cases
          </div>
          <DataTable columns={caseTableColumns} data={[]} searchKey="name" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default page;
