'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import SelectCase from './components/select-case';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { TPipeline } from '@/validations/pipeline';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { useQuery } from '@tanstack/react-query';
import { getCasesHandler } from '@/handlers/handleCases';
import { EGenericQueryKeys } from '@/global/config';
import { TCase } from '@/models/Cases';
import { TWithId } from '@/global/types';
import { ProjectRoutes } from '@/global/routes';
import { setCurrentStage } from '../../state/state';
import Board from '@/components/modules/boad-composition/board';
import CasesList from '@/components/modules/boad-composition/cases-list';

type Props = {};

const PipelinePage = (props: Props) => {
  const { data } = useQuery({
    queryKey: [EGenericQueryKeys.CASES],
    queryFn: getCasesHandler,
  });

  const form = useForm<TPipeline>({
    defaultValues: {
      stages: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    name: 'stages',
    control: form.control,
  });

  const formErrors = Object.keys(form.formState.errors);

  useEffect(() => {
    if (!formErrors.length) {
      setCurrentStage(ProjectRoutes.post);
    }
  }, [formErrors.length]);

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

  const handleSubmit = () => {
    const data = form.getValues();
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="space-x-2 border border-[var(--cruto-border)] p-2 h-fit">
        <Button variant={'outline'} onClick={handleAddStage}>
          Add Stage
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <div className="w-full h-full flex gap-2 ">
        <Form {...form}>
          <form className="flex gap-6 w-[100vw] overflow-x-auto">
            {fields.map((pipeline, index) => (
              <Board
                key={pipeline.id}
                handleDelete={() => handleDeleteStage(index)}
                boardName={pipeline.name}
                stageIndex={index}
              >
                <div>
                  <CasesList stageIndex={index} />
                </div>
              </Board>
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PipelinePage;
