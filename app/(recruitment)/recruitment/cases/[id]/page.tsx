'use client';

import { MCase } from '@/models/Cases';
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/page-wrapper';
import { getCaseHandler } from '@/handlers/handleCases';
import { useParams } from 'next/navigation';
import { TCase } from '@/validations/cases';
import { Input } from '@/components/ui/input';
import { getBaseUrl } from '@/global/config';
import { envPublic } from '@/global/envClient';
import { Copy } from 'lucide-react';
import CaseDetails from '../components/case-details';

type TCaseProps = {
  data: MCase;
};

const url = getBaseUrl(envPublic.NEXT_PUBLIC_ENVIRONMENT);

const Case = () => {
  const [editCase, setEditCase] = useState<MCase>();
  const { id } = useParams();

  useEffect(() => {
    const getCase = async () => {
      const data = await getCaseHandler(id as string);
      setEditCase(data);
    };
    getCase();
  }, [id]);

  return (
    <PageWrapper title={editCase?.name ?? ''} description={''}>
      <div
        id="header"
        className="w-full flex justify-between align-middle items-center"
      >
        <span className="">{editCase?.name}</span>
        <div className="w-fit flex items-center gap-2">
          <span>Case link:</span>
          <div className="flex align-middle items-center border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--curto-foreground)] px-2">
            <Input
              className="border-none"
              value={`${url}showroom/${editCase?._id}`}
            />

            <Copy />
          </div>
        </div>
      </div>
      <CaseDetails
        name={editCase?.name}
        description={editCase?.description}
        status={editCase?.isFeatured}
        questions={editCase?.questions}
        duration={editCase?.duration}
        createdAt={editCase?.createdAt}
        updatedAt={editCase?.updatedAt}
      />
    </PageWrapper>
  );
};

export default Case;
