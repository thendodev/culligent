import LinkTabs from '@/components/modules/link-tabs';
import React from 'react';
import PageWrapper from '../../components/page-wrapper';
import { ProjectRoutes } from '@/global/routes';

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
      href: `/${ProjectRoutes.recruitment}/posts/${id}`,
    },
    {
      name: 'Applicants',
      href: `/${ProjectRoutes.recruitment}/posts/${id}/applicants`,
    },
    {
      name: 'Candidates',
      href: `/${ProjectRoutes.recruitment}/posts/${id}/candidates`,
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
