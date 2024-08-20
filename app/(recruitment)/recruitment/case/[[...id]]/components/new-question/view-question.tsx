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
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { UseFieldArrayReturn } from 'react-hook-form';
import Questions from '@/app/(recruitment)/recruitment/cases/components/questions';

type IViewQuestionProps = {
  fieldArray: UseFieldArrayReturn<any>;
  updateQuestion: (option: string, questionIndex?: number) => void;
  form: any;
};

const ViewQuestion = ({
  fieldArray,
  updateQuestion,
  form,
}: IViewQuestionProps) => {
  const cannotDeleteFirstQuestion = () =>
    toast({
      title: 'Cannot delete first question',
      description: 'Please add a new question before deleting this one',
    });

  const deletQuestion = (questionIndex: number) => {
    if (questionIndex === 0 && fieldArray.fields.length === 1)
      return cannotDeleteFirstQuestion();
    fieldArray.remove(questionIndex);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto">View Cases</Button>
      </SheetTrigger>
      <SheetContent size={'half'}>
        <SheetHeader>
          <SheetTitle className="text-2xl">
            View cases{' '}
            <sup className="text-sm">({fieldArray.fields.length}) </sup>
          </SheetTitle>
        </SheetHeader>
        <div>
          <div className="ml-auto flex justify-between items-center bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border-[var(--cruto-border)] border"></div>
          <ScrollArea className="w-full h-full">
            <Questions questions={fieldArray.fields} />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewQuestion;
