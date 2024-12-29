'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlignLeft, ListChecks } from 'lucide-react';
import OptionCard from './option-card';
import { ReactNode, useState } from 'react';
import SaveCase from './save-case';
import { getCaseHandler } from '@/handlers/handleCases';
import { useQuery } from '@tanstack/react-query';
import ViewQuestion from './new-question/view-question';
import { CaseSchema, TCase } from '@/validations/cases';
import QuestionWrapper from './question-wrapper';

import { Form } from '@/components/ui/form';
import Question from './new-question/question';
import Answers from './new-question/answers';

export enum QuestionType {
  OpenEnded = 'Open Ended',
  MultiChoice = 'Multiple Choice',
}
type TCaseProps = {
  id: string;
  queryKey: string[];
};

const Case = ({ id, queryKey }: TCaseProps) => {
  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () => getCaseHandler(id),
    enabled: !!id?.length,
  });

  const form = useForm<TCase>({
    resolver: zodResolver(CaseSchema),
    values: data,
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: `questions`,
  });

  const [option, setOption] = useState<ReactNode>();

  const onNewOption = (option: string, questionIndex?: number) => {
    questionIndex = questionIndex ?? fieldArray.fields.length;

    switch (option) {
      case QuestionType.MultiChoice:
        setOption(
          <QuestionWrapper form={form}>
            <Question
              question={questionIndex}
              type={QuestionType.MultiChoice}
            />
            <Answers question={questionIndex} />
          </QuestionWrapper>,
        );
        break;
      case QuestionType.OpenEnded:
        setOption(
          <QuestionWrapper form={form}>
            <Question question={questionIndex} type={QuestionType.OpenEnded} />
          </QuestionWrapper>,
        );
        break;

      default:
        setOption(
          <QuestionWrapper form={form}>
            <Question
              question={questionIndex}
              type={QuestionType.MultiChoice}
            />
            <Answers question={questionIndex} />
          </QuestionWrapper>,
        );
    }
  };

  return (
    <Form {...form}>
      <form className="w-full h-full flex flex-col gap-2">
        <div className="flex flex-col gap-5 w-full h-full">
          <div className="space-x-2 ml-auto">
            <ViewQuestion />
            <SaveCase id={id} />
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-5 ">
          <div className="flex flex-row justify-between p-1 ">
            <p className="text-4xl">Create a new question</p>
          </div>
          <div className="flex flex-wrap gap-5 ">
            <OptionCard onClick={() => onNewOption(QuestionType.MultiChoice)}>
              <ListChecks size={30} className="mr-2" />
              Multiple Choice
            </OptionCard>

            <OptionCard onClick={() => onNewOption(QuestionType.OpenEnded)}>
              <AlignLeft size={30} className="mr-2" />
              Open Ended
            </OptionCard>
          </div>

          {option}
        </div>
      </form>
    </Form>
  );
};

export default Case;
