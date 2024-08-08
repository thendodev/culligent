'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionViewSkeleton } from '../question-view-skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import QuestionView from '../question-view';
import { UseFieldArrayReturn } from 'react-hook-form';
import { TCase } from '@/models/Cases';

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
      <SheetContent className="w-[50vw]">
        <SheetHeader>
          <SheetTitle>View cases</SheetTitle>
        </SheetHeader>
        <div>
          <div className="ml-auto flex justify-between items-center bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border-[var(--cruto-border)] border">
            <Button
              disabled
              variant={'ghost'}
              className="rounded-none  border-r border-r-[var(--cruto-border)]"
            >
              Jump to
            </Button>
            <Input placeholder="Ex. 4" className="w-3/4 h-3/4 border-none  " />
          </div>
          <ScrollArea className="w-full h-[550px]">
            {fieldArray.fields.map((field, index) => (
              <div key={field.id}>
                <QuestionView
                  fieldArray={fieldArray}
                  id={index}
                  deleteQuestion={deletQuestion}
                  updateQuestion={updateQuestion}
                  form={form}
                  question={fieldArray.fields[index] as any}
                />
              </div>
            ))}
            <QuestionViewSkeleton />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewQuestion;
