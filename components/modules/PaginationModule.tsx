import React, { Dispatch, SetStateAction } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';

type PaginationProps = {
  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
  pages: Array<any>;
};

const PaginationModule = ({
  pages,
  onPageChange,
  pageIndex,
}: PaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" onClick={() => onPageChange(pageIndex - 1)}>
            Previous
          </Button>
        </PaginationItem>
        {pages.map(({ id }, index) => {
          if (index >= pageIndex && index <= pageIndex + 2)
            return (
              <PaginationItem key={id}>
                <Button variant="link" onClick={() => onPageChange(index)}>
                  {index + 1}
                </Button>
              </PaginationItem>
            );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" onClick={() => onPageChange(pageIndex + 1)}>
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationModule;
