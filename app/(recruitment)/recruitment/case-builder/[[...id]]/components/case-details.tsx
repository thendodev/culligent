'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AlignLeft, Check, ListChecks } from 'lucide-react';
import OptionCard from './option-card';
import { ReactNode, useState } from 'react';
import SingleChoice from './SingleChoice';
import OpenEnded from './OpenEnded';
import MultiChoice from './MultiChoice';
import { toast } from '@/components/ui/use-toast';
import { QuestionViewSkeleton } from './question-view-skeleton';
import SaveCase from './save-case';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCaseHandler } from '@/handlers/handleCases';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import ViewQuestion from './new-question/view-question';
import {
  CaseSchema,
  QuestionSchema,
  TCaseValidation,
} from '@/validations/cases';
import QuestionView from './question-view';

export enum QuestionType {
  SingleChoice = 'Single Choice',
  OpenEnded = 'Open Ended',
  MultiChoice = 'Multiple Choice',
}
type TCaseProps = {
  id?: string | null;
  queryKey?: string | null;
};

const CaseDetails = ({ id, queryKey }: TCaseProps) => {
  const { data: editCase, isError } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getCaseHandler(id as string),
    enabled: !!id,
  });

  const form = useForm<TCaseValidation>({
    resolver: zodResolver(CaseSchema),
    defaultValues: editCase ?? {
      name: '',
      description: '',
      duration: 0,
      questions: [],
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

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="space-x-2 ml-auto">
          <ViewQuestion
            form={form}
            fieldArray={fieldArray}
            updateQuestion={onNewOption}
          />
          <SaveCase form={form} id={id} />
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-5 ">
        <div className="flex flex-row justify-between p-1 ">
          <p className="text-4xl">Create a new question</p>
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
    </div>
  );
};

export default CaseDetails;
