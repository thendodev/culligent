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
import {  getPostHandler } from '@/handlers/handlePosts';
import { useParams } from 'next/navigation';
import {
  createPipelineHandler,
  updatePipelineHandler,
} from '@/handlers/handlePipeline';
import { mongooseObjectIdString } from '@/validations/mongoose';

const PipelinePage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostHandler(id as string),
    enabled: !!id,
  });

  const form = useForm<TPipeline>({
    defaultValues: {
      stages: [],
    },
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
  }, [formErrors.length]);

  const sortId = fields.map((field) => field.id);

  const handleDeleteStage = (index: number) => {
    remove(index);
  };

  const handleAddStage = () => {
    append(
      {
        name: '',
        cases: [],
        reviewers: [],
      },
      {
        shouldFocus: true,
      },
    );
  };

  const handleSubmit = async () => {
    const stages = form.getValues();
    const { success, error, data } = PipelineValidationSchema.extend(
      mongooseObjectIdString,
    ).safeParse(stages);
    if (!success) {
      return toast({
        title: 'Pipeline is not valid',
        description: error.issues[0].message,
        variant: 'destructive',
      });
    }
    !id ? await createPipelineHandler(data) : await updatePipelineHandler(data);
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
    mutationFn: handleSubmit,
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
      <div className="w-full flex flex-col gap-2">
        <div className="space-x-2 border border-[var(--cruto-border)] p-2 h-fit">
          <Button variant={'outline'} onClick={handleAddStage}>
            Add Stage
          </Button>
          <Button onClick={() => mutate()}>Submit</Button>
        </div>
        <div className="w-full h-full flex gap-2 ">
          <Form {...form}>
            <form className="flex gap-6 w-[100vw] overflow-x-auto">
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
            </form>
          </Form>
        </div>
      </div>
    </DndContext>
  );
};

export default PipelinePage;
