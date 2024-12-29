'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Questions from '@/app/(recruitment)/recruitment/cases/components/questions';
import { TCase } from '@/validations/cases';

const ViewQuestion = () => {
  const form = useFormContext<TCase>();
  const { remove, fields } = useFieldArray({
    name: 'questions',
    control: form.control,
  });
  const cannotDeleteFirstQuestion = () =>
    toast({
      title: 'Cannot delete first question',
      description: 'Please add a new question before deleting this one',
    });

  const deletQuestion = (questionIndex: number) => {
    if (questionIndex === 0 && fields.length === 1)
      return cannotDeleteFirstQuestion();
    remove(questionIndex);
  };

  const questions = form.getValues('questions');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto">View Cases</Button>
      </SheetTrigger>
      <SheetContent size={'half'}>
        <SheetHeader>
          <SheetTitle className="text-2xl">
            View cases <sup className="text-sm">({fields.length}) </sup>
          </SheetTitle>
        </SheetHeader>
        <div>
          <div className="ml-auto flex justify-between items-center bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border-[var(--cruto-border)] border"></div>
          <ScrollArea className="w-full h-full">
            <Questions questions={questions} />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewQuestion;
