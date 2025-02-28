'use client';

import React, { Suspense, useCallback, useEffect } from 'react';
import PostCard from './post-card';
import { Button } from '@/components/ui/button';
import { ProjectRoutes } from '@/global/routes';
import { PenBox } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { FiltersPopover } from './filters-popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EPostView, usePostContext, usePostViewStore } from '../state/state';
import PostCardLoader from './post-card-loader';
import TableWrapper from './table-wrapper';
import DataTableSkeleton from './table-loader';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { container, containerChild } from '../animation';

interface IPostsProps {
  queryKey: string[];
}

export interface IFilters {
  dateRange: Date;
  minApplicants: number;
  maxApplicants: number;
  includeArchived: boolean;
  includeUnpublished: boolean;
}

const Posts = ({ queryKey }: IPostsProps) => {
  const queryKeyContext = usePostContext((state) => state.state.queryKey);
  const setContext = usePostContext((state) => state.setContext);

  const currentFilters = usePostContext((state) => state.filters);
  const setFilters = usePostContext((state) => state.setFilters);

  const currentView = usePostViewStore((state) => state.currentStoredView);
  const setCurrentStoredView = usePostViewStore(
    (state) => state.setCurrentStoredView,
  );

  const handleSetFilters = useCallback(
    (filters: any) => {
      setFilters(filters);
    },
    [setFilters],
  );

  useEffect(() => {
    if (queryKey !== queryKeyContext) {
      setContext({
        queryKey: queryKey,
      });
    }
  });

  console.log(currentView);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex justify-end">
        <Button asChild variant={'default'}>
          <Link href={ProjectRoutes.post}>
            <PenBox />
            Create Post
          </Link>
        </Button>
      </header>

      <div className="flex justify-between align-middle mb-4">
        <div className="flex gap-2 align-middle">
          <Button onClick={() => setCurrentStoredView(EPostView.CARDS)}>
            Card view
          </Button>
          <Button onClick={() => setCurrentStoredView(EPostView.TABLE)}>
            Table view
          </Button>
        </div>
        <FiltersPopover
          currentFilters={currentFilters}
          handleFilters={handleSetFilters}
        />
      </div>
      <AnimatePresence>
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {currentView === EPostView.CARDS && (
            <motion.div variants={containerChild}>
              <Input className="w-full bg-white" placeholder="Search..." />
            </motion.div>
          )}
        </motion.div>
        {currentView === EPostView.CARDS ? (
          <Suspense fallback={<PostCardLoader />}>
            <motion.div
              className="container"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <PostCard />
            </motion.div>
          </Suspense>
        ) : (
          <Suspense fallback={<DataTableSkeleton />}>
            <motion.div
              className="container"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={containerChild}>
                <TableWrapper />
              </motion.div>
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Posts;
