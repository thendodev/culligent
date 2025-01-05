'use client';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import PipelineValidationSchema, { TPipeline } from '@/validations/pipeline';
import { Form } from '@/components/ui/form';

import { ProjectRoutes } from '@/global/routes';
import { setCurrentStage } from '../../state/state';
import Board from '@/components/modules/board-composition/board';
import CasesList from '@/components/modules/board-composition/cases-list';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { toast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  createPipelineHandler,
  updatePipelineHandler,
} from '@/handlers/handlePipeline';
import { TWithId } from '@/global/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPostHandler } from '@/handlers/handlePosts';

const PipelinePage = () => {
  const { id } = useParams();
  const { data: post } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostHandler(id as string),
    enabled: !!id,
  });

  const isPipeline = !!post?.userId && !!post?.pipeline?._id;

  const pipeline: TPipeline | TWithId<TPipeline> = isPipeline
    ? {
        _id: post.pipeline._id,
        postId: post._id,
        userId: post.userId,
        stages: post.pipeline.stages,
        isArchived: false,
      }
    : {
        postId: post._id,
        userId: post.userId,
        stages: [],
        isArchived: false,
      };

  const form = useForm({
    values: pipeline,
    resolver: zodResolver(PipelineValidationSchema),
  });

  const { fields, append, remove, move } = useFieldArray({
    name: 'stages',
    control: form.control,
  });

  const formErrors = Object.keys(form.formState.errors);
  useEffect(() => {
    if (!formErrors.length) {
      setCurrentStage(ProjectRoutes.post);
    }
    return;
  }, [formErrors.length, formErrors]);

  const sortId = fields.map((field) => field.id);

  const handleDeleteStage = (index: number) => {
    remove(index);
  };

  const handleAddStage = () => {
    append({
      name: '',
      cases: [],
      reviewers: [],
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle board swapping
    if (
      active.data.current?.type === 'board' &&
      over.data.current?.type === 'board'
    ) {
      const activeIndex = fields.findIndex((field) => field.id === active.id);
      const overIndex = fields.findIndex((field) => field.id === over.id);

      if (activeIndex !== overIndex) {
        move(activeIndex, overIndex);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: !post?.pipeline?._id
      ? form.handleSubmit(createPipelineHandler)
      : form.handleSubmit(updatePipelineHandler),
    onSuccess: () => {
      toast({
        title: 'Pipeline created',
      });
    },
  });

  return (
    <DndContext
      modifiers={[restrictToHorizontalAxis]}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <Form {...form}>
        <form onSubmit={mutate}>
          <div className="space-x-2 space-y-2  p-2 h-fit">
            <Button type="button" variant={'outline'} onClick={handleAddStage}>
              Add Stage
            </Button>
            <Button>Submit</Button>
          </div>
          <div className="w-full h-full flex gap-2 ">
            <div className="flex gap-6 w-full overflow-x-auto">
              <SortableContext
                items={sortId}
                strategy={horizontalListSortingStrategy}
              >
                {fields.map((pipeline, index) => (
                  <Board
                    key={pipeline.id}
                    handleDelete={() => handleDeleteStage(index)}
                    boardName={pipeline.name}
                    stageIndex={index}
                    id={pipeline.id}
                  >
                    <CasesList stageIndex={index} />
                  </Board>
                ))}
              </SortableContext>
            </div>
          </div>
        </form>
      </Form>
    </DndContext>
  );
};

export default PipelinePage;
