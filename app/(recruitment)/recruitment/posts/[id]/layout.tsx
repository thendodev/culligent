import LinkTabs from '@/components/modules/link-tabs';
import React from 'react';
import PageWrapper from '../../components/page-wrapper';
import { NextRequest, NextResponse } from 'next/server';

interface IPostLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

const PostLayout = ({ params: { id }, children }: IPostLayoutProps) => {
  const tabs = [
    {
      name: 'Overview',
      href: `${id}`,
    },
    {
      name: 'Applicants',
      href: `applicants`,
    },
    {
      name: 'Candidates',
      href: `candidates`,
    },
  ];
  return (
    <div className="w-full">
      <PageWrapper>
        <LinkTabs tabs={tabs} />
        <div className="mt-4">{children}</div>
      </PageWrapper>
    </div>
  );
};

export default PostLayout;
