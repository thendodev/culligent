'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AlignLeft, ListChecks } from 'lucide-react';
import OptionCard from './option-card';
import { ReactNode, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import SaveCase from './save-case';
import { getCaseHandler } from '@/handlers/handleCases';
import { useQuery } from '@tanstack/react-query';
import ViewQuestion from './new-question/view-question';
import {
  CaseSchema,
  QuestionSchema,
  TCaseValidation,
} from '@/validations/cases';
import QuestionWrapper from './QuestionWrapper';
import Answers from './new-question/Answers';
import Question from './new-question/Question';

export enum QuestionType {
  SingleChoice = 'Single Choice',
  OpenEnded = 'Open Ended',
  MultiChoice = 'Multiple Choice',
}
type TCaseProps = {
  id: string;
  queryKey?: string | null;
};

const CaseDetails = ({ id, queryKey }: TCaseProps) => {
  const { data, isError } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getCaseHandler(id),
    enabled: !!id?.length,
  });

  const form = useForm<TCaseValidation>({
    resolver: zodResolver(CaseSchema),
    values: data,
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
    <QuestionWrapper form={form}>
      <Question
        question={0}
        handleSave={handleSave}
        type={QuestionType.SingleChoice}
        form={form}
      />
      <Answers form={form} question={0} />
    </QuestionWrapper>,
  );

  const onNewOption = (option: string, questionIndex?: number) => {
    questionIndex = questionIndex ?? fieldArray.fields.length;

    switch (option) {
      case QuestionType.SingleChoice:
        setOption(
          <QuestionWrapper form={form}>
            <Question
              question={questionIndex}
              handleSave={handleSave}
              type={QuestionType.SingleChoice}
              form={form}
            />
            <Answers form={form} question={questionIndex} />
          </QuestionWrapper>,
        );
        break;
      case QuestionType.OpenEnded:
        setOption(
          <QuestionWrapper form={form}>
            <Question
              question={questionIndex}
              handleSave={handleSave}
              type={QuestionType.SingleChoice}
              form={form}
            />
          </QuestionWrapper>,
        );
        break;

      default:
        setOption(
          <QuestionWrapper form={form}>
            <Question
              question={questionIndex}
              handleSave={handleSave}
              type={QuestionType.SingleChoice}
              form={form}
            />
            <Answers form={form} question={questionIndex} />
          </QuestionWrapper>,
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
