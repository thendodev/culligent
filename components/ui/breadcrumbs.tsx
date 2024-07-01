'use client';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

type BreadCrumbsProps = {
  homeElement: string;
  homeUrl: string;
  children: ReactNode;
};

const BreadCrumbs = ({ homeElement, homeUrl, children }: BreadCrumbsProps) => {
  const paths = usePathname();
  const crumbs = paths.split('/').filter((p) => p);
  let href = `/${crumbs.join('/')}`;

  return (
    <div
      id="breadcrumbs"
      className="fixed z-10 p-2 h-[60px] w-[calc(100vw-60px)] px-10 flex gap-2 justify-between items-center  bg-[var(--cruto-foreground)]"
    >
      <ul className="flex flex-row items-center content-center w-full h-full mx-auto">
        <li className="flex flex-row content-center text-sm text-[color:var(--cruto-grey)]">
          <Home color="var(--cruto-pale-grey)" size={20} className="mr-2" />
          {crumbs[crumbs.length - 1] !== homeElement ? (
            <Link href={[...crumbs].splice(1, 1).join('/') + homeUrl}>
              {homeElement}
            </Link>
          ) : null}
        </li>
        {crumbs.splice(1, 2).map((link, index) => {
          let itemClasses =
            paths == href
              ? 'text-[color:var(--cruto-grey)]'
              : 'text-[color:var(--cruto-pale-grey]';
          let linkItem =
            link === crumbs[crumbs.length - 1] ? 'text-lg' : 'text-sm';

          return (
            <React.Fragment key={index}>
              <ChevronRight size={15} />
              <li className={itemClasses + ' ' + linkItem}>
                <Link href={href}>
                  {index === crumbs.length - 1 ? link : link}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      {children}
    </div>
  );
};

export default BreadCrumbs;
