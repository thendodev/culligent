import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KanbanBoard from './components/kanban-board';
interface ICandidatesPageProps {
  params: {
    id: string;
  };
}

const CandidatesPage = async ({ params: { id } }: ICandidatesPageProps) => {
  const queryKey = ['candidates', id];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => {},
  });

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Tabs className="w-full">
          <div className="w-full flex justify-end">
            <TabsList className="w-fit bg-[var(--cruto-foreground)]">
              <TabsTrigger value="pipeline">Pipeline view</TabsTrigger>
              <TabsTrigger value="table">Table view</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pipeline">
            <KanbanBoard />
          </TabsContent>
          <TabsContent value="table">Change your password here.</TabsContent>
        </Tabs>
      </HydrationBoundary>
    </div>
  );
};

export default CandidatesPage;
