'use client';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useRef } from 'react';

type BreadCrumbsProps = {
  homeElement: string;
  homeUrl: string;
};

const BreadCrumbs = ({ homeElement, homeUrl }: BreadCrumbsProps) => {
  const paths = usePathname();
  const crumbs = paths.split('/').filter((p) => p);
  let href = `/${crumbs.join('/')}`;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      id="breadcrumbs"
      className="flex gap-2 justify-between items-end bg-[var(--cruto-foreground)]"
    >
      <ul className="flex flex-row items-center content-end w-full h-full mx-auto">
        <li className="flex flex-row content-center text-sm text-[color:var(--cruto-grey)]">
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
    </div>
  );
};

export default BreadCrumbs;
