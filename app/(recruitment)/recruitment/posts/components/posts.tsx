'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import PostCard from './post-card';
import { Button } from '@/components/ui/button';
import { ProjectRoutes } from '@/global/routes';
import { PenBox } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { FiltersPopover } from './filters-popover';
import { usePostContext, usePostViewStore } from '../state/state';
import PostCardLoader from './post-card-loader';
import TableWrapper from './table-wrapper';
import DataTableSkeleton from './table-loader';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { container, containerChild, searchContainer } from '../animation';
import { EPostView, TUserSettings } from '@/validations/user-settings';

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

  const currentView = EPostView.CARDS;

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
    const reHydrate = async () => {
      await usePostViewStore.persist.rehydrate();
    };

    reHydrate();
  }, []);

  useEffect(() => {
    if (queryKey !== queryKeyContext) {
      setContext({
        queryKey: queryKey,
      });
    }
  });

  return (
    <div className="flex flex-col gap-4 justify-center align-middle">
      <div className="w-full flex justify-end">
        <Button asChild variant={'default'}>
          <Link href={ProjectRoutes.post}>
            <PenBox />
            Create Post
          </Link>
        </Button>
      </div>

      <div className="w-full flex justify-between align-middle mb-4">
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
          variants={searchContainer}
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
              className="w-full"
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
