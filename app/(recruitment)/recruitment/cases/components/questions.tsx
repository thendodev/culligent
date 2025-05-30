'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { TQuestion } from '@/validations/cases';
import {
  Check,
  MoreVertical,
  Search,
  SquarePen,
  Trash2Icon,
  X,
} from 'lucide-react';
import { useState } from 'react';

type TQuestionsProps = {
  questions: TQuestion[] | undefined;
  onUpdate?: (type: string, question: number) => void;
  onDelete?: (question: number) => void;
};

const Questions = ({ questions, onDelete, onUpdate }: TQuestionsProps) => {
  const [filteredQuestions, setFilteredQuestions] = useState<
    TQuestion[] | Record<string, any>[] | undefined
  >(questions);

  const deepSearch = (search: string) => {
    const searchTerm = search.toLowerCase();

    //i want to destructure the question and answers
    const filteredList = questions?.filter((question, index) => {
      const questionText = question?.question?.toLowerCase();
      const answersText = question?.answers?.some((answer) => {
        return answer?.answer?.toLowerCase().includes(searchTerm);
      });
      const currentQuestion = `question ${index + 1}`.includes(searchTerm);

      return (
        questionText?.includes(searchTerm) || answersText || currentQuestion
      );
    });

    setFilteredQuestions(filteredList);
  };

  return (
    <div className="h-fit flex flex-col gap-4">
      <div className="sticky z-10 p-4 w-full flex justify-between border-b border-b-[var(--cruto-border)]">
        <div className="w-full flex justify-end gap-2">
          <div className="flex align-middle items-center border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--cruto-foreground)] px-2">
            <Search className="h-4 w-4 text-[var(--cruto-off-white)]" />
            <Input
              className="border-none"
              onChange={({ target }) => deepSearch(target.value)}
            />
          </div>
        </div>
      </div>
      {questions?.map((question, index) => {
        if (
          !filteredQuestions?.includes(question) &&
          !filteredQuestions?.length
        )
          return <></>;
        return (
          <div
            className="w-full h-full flex bg-[var(--cruto-foreground)] border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]"
            key={index}
          >
            <div className="w-full flex flex-col  gap-2 p-6 border-r border-[var(--cruto-border)]">
              <span className="text-xl font-semibold">
                Question {index + 1}
              </span>
              <span className="mx-auto">{question?.question}</span>
            </div>
            <div className="w-full flex flex-col gap-4 p-6">
              <div className="w-full p-2 flex justify-end gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <MoreVertical />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-fit p-1">
                    <Button
                      variant="ghost"
                      className="hover:bg-[var(--cruto-background)]"
                      onClick={() => onUpdate?.(question.type, index)}
                    >
                      <SquarePen className="mr-1 w-4 h-4" />
                      Update
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:bg-[var(--cruto-background)]"
                      onClick={() => onDelete?.(index)}
                    >
                      <Trash2Icon className="mr-1 w-4 h-4" />
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mx-auto space-x-2 flex">
                <span className="text-2xl font-semibold">
                  {question?.skill}
                </span>
                <Separator orientation="vertical" className="bg-black" />
                <div className="flex gap-2 mx-auto">
                  <span className="text-sm bg-[var(--cruto-pale-green)] px-1 py-1">
                    {question?.skill_level} level
                  </span>
                  <div className="text-sm bg-[var(--cruto-pale-green)] px-1 py-1">
                    {question?.points} Points
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full justify-between gap-4">
                {question?.answers?.map((answer) => (
                  <div key={answer.answer} className="flex gap-2 w-full">
                    <div className="w-fit my-auto">
                      {answer.correct ? (
                        <Check className="text-[var(--cruto-green)]" />
                      ) : (
                        <X className="text-[var(--cruto-red)]" />
                      )}
                    </div>

                    <span className="text-large">{answer.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
