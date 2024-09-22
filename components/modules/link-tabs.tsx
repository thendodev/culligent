'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { baseUrl } from '@/global/config';

interface ILinkTabProps {
  tabs: {
    name: string;
    href: string;
  }[];
}

const LinkTabs = ({ tabs }: ILinkTabProps) => {
  const path = usePathname();

  return (
    <div className="w-fit border-b border-b-[var(--cruto-border)] space-x-2">
      {tabs.map((tab, index) => (
        <a
          key={index}
          href={baseUrl + tab.href}
          className={`${
            tab.href === path
              ? 'border-b-2 border-b-[var(--cruto-primary)]'
              : ''
          } inline-flex items-center p-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};

export default LinkTabs;
