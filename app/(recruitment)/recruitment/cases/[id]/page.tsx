'use client';

import PageWrapper from '../../components/page-wrapper';
import { getCaseHandler } from '@/handlers/handle-cases';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { dateFormat, getBaseUrl } from '@/global/config';
import { envPublic } from '@/global/envClient';
import { Copy } from 'lucide-react';
import CaseDetails from '../components/case-details';
import { toast } from '@/components/ui/use-toast';
import Questions from '../components/questions';
import { useQuery } from '@tanstack/react-query';

const url = getBaseUrl(envPublic.NEXT_PUBLIC_ENVIRONMENT);

const Case = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['cases', id],
    queryFn: () => getCaseHandler(id as string),
    enabled: !!id,
  });

  const onCopy = () => {
    navigator.clipboard.writeText(`${url}showroom/${data?._id}`);
    toast({ title: 'Copy case link', description: 'case link copied' });
  };

  const caseData = !!data
    ? {
        ...data,
        createdAt: new Date(data.createdAt!).toLocaleDateString(
          'en-us',
          dateFormat,
        ),
      }
    : null;

  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 relative">
        <div
          id="header"
          className="w-full flex justify-end align-middle items-center gap-6"
        >
          <div className="w-fit flex items-center gap-2">
            <span className="text-[var(--cruto-text-grey)]">Case link:</span>
            <div className="flex align-middle items-center border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--curto-foreground)] px-2">
              <Input
                className="border-none"
                value={`${url}showroom/${data?._id}`}
              />

              <Copy
                onClick={onCopy}
                className="h-4 w-4 hover:text-[var(--cruto-green)] hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
        <CaseDetails
          name={caseData?.name}
          description={caseData?.description}
          status={caseData?.isFeatured}
          questions={caseData?.questions}
          duration={caseData?.duration}
          createdAt={caseData?.createdAt}
          updatedAt={caseData?.updatedAt}
          id={caseData?._id}
        />
        <Questions questions={data?.questions} />
      </div>
    </PageWrapper>
  );
};

export default Case;
