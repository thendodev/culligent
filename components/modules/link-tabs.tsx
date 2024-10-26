'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { baseUrl } from '@/global/config';
import { cn } from '@/lib/utils';

interface ILinkTabProps {
  tabs: {
    name: string;
    href: string;
  }[];
  style?: string;
}

const LinkTabs = ({ tabs, style }: ILinkTabProps) => {
  const path = usePathname();

  return (
    <div
      className={cn(
        'w-fit border-b border-b-[var(--cruto-border)] space-x-2',
        style,
      )}
    >
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
