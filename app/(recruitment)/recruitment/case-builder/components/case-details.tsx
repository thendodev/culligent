'use client';

import { Input } from '@/components/ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  CaseSchema,
  QuestionSchema,
  TCase,
} from '../../../../../validations/cases';

import { AlignLeft, Check, ListChecks } from 'lucide-react';
import OptionCard from './option-card';
import QuestionView from './question-view';
import { ReactNode, useState } from 'react';
import SingleChoice from './SingleChoice';
import OpenEnded from './OpenEnded';
import MultiChoice from './MultiChoice';
import { toast } from '@/components/ui/use-toast';
import { QuestionViewSkeleton } from './question-view-skeleton';
import SaveCase from './save-case';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCaseHandler } from '@/handlers/handleCases';
import { useSuspenseQuery } from '@tanstack/react-query';

export enum QuestionType {
  SingleChoice = 'Single Choice',
  OpenEnded = 'Open Ended',
  MultiChoice = 'Multiple Choice',
}
type TCaseProps = {
  id?: string | null;
};

const CaseDetails = ({ id }: TCaseProps) => {
  const { data: editCase } = useSuspenseQuery({
    queryKey: ['cases', id],
    queryFn: () => getCaseHandler(id as string),
  });

  const form = useForm<TCase>({
    resolver: zodResolver(CaseSchema),
    defaultValues: editCase ?? {
      name: '',
      description: '',
      duration: 0,
      questions: [],
    },
    values: editCase ?? {
      name: '',
      description: '',
      duration: 0,
      questions: [],
      isFeatured: true,
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: `questions`,
  });

  const handleSave = (questionIndex: number, type: QuestionType) => {
    const isValid = QuestionSchema.safeParse(
      form.getValues(`questions.${questionIndex}`),
    );
    const isTypeError =
      form.getValues(`questions.${questionIndex}`).type !== type;

    if (!isValid.success && isValid.error.errors.length > 1 && !isTypeError) {
      return isValid.error.errors.map((error) =>
        toast({
          title: error.path[0] as string,
          description: error.message,
        }),
      );
    }
    fieldArray.update(questionIndex, {
      ...form.getValues(`questions.${questionIndex}`),
      type: type,
    });
  };

  const [option, setOption] = useState<ReactNode>(
    <SingleChoice
      type={QuestionType.SingleChoice}
      form={form}
      question={0}
      handleSave={handleSave}
      key={0}
    />,
  );
  const [jumpTo, setJumpTo] = useState(0);

  const onNewOption = (option: string, questionIndex?: number) => {
    questionIndex = questionIndex ?? fieldArray.fields.length;

    switch (option) {
      case QuestionType.SingleChoice:
        setOption(
          <SingleChoice
            form={form}
            question={questionIndex}
            key={questionIndex}
            handleSave={handleSave}
            type={QuestionType.SingleChoice}
          />,
        );
        break;
      case QuestionType.OpenEnded:
        setOption(
          <OpenEnded
            form={form}
            question={questionIndex}
            key={questionIndex}
            handleSave={handleSave}
            type={QuestionType.OpenEnded}
          />,
        );
        break;
      case QuestionType.MultiChoice:
        setOption(
          <MultiChoice
            form={form}
            question={questionIndex}
            key={questionIndex}
            handleSave={handleSave}
            type={QuestionType.MultiChoice}
          />,
        );
        break;
      default:
        setOption(
          <SingleChoice
            form={form}
            question={questionIndex}
            handleSave={handleSave}
            key={questionIndex}
            type={QuestionType.SingleChoice}
          />,
        );
    }
  };
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
    <div className="w-full h-full flex gap-5">
      <div className="w-[55%] h-full flex flex-col gap-5 ">
        <div className="flex flex-row justify-between p-1 ">
          <p className="text-4xl">Question options</p>
        </div>
        <div className="flex flex-wrap gap-5 ">
          <OptionCard
            onNewOption={onNewOption}
            icon={<ListChecks size={30} className="mr-2" />}
            name="Multiple Choice"
          />
          <OptionCard
            icon={<Check size={30} className="mr-2" />}
            name="Single Choice"
            onNewOption={onNewOption}
          />

          <OptionCard
            icon={<AlignLeft size={30} className="mr-2" />}
            name="Open Ended"
            onNewOption={onNewOption}
          />
        </div>

        {option}
      </div>
      <div className="flex flex-col gap-5 w-[45%] h-full">
        <SaveCase form={form} id={id} />

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
                updateQuestion={onNewOption}
                form={form}
                question={fieldArray.fields[index] as any}
              />
            </div>
          ))}
          <QuestionViewSkeleton />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseDetails;
