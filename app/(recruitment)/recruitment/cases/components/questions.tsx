'use client';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MQuestion } from '@/models/Cases';
import { MoreVertical, Search, SpellCheck, SpellCheck2 } from 'lucide-react';
import React from 'react';

type TQuestionsProps = {
  questions: MQuestion[] | undefined;
};

const Questions = ({ questions }: TQuestionsProps) => {
  return (
    <div className="h-fit flex flex-col gap-4">
      <div className="p-4 w-full flex justify-between border-b border-b-[var(--cruto-border)]">
        <div className="w-full flex justify-end gap-2">
          <div className="flex align-middle items-center border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--cruto-foreground)] px-2">
            <Search className="h-4 w-4 text-[var(--cruto-off-white)]" />
            <Input className="border-none" />
          </div>
        </div>
      </div>
      {questions?.map((question, index) => (
        <div
          className="w-full h-full flex bg-[var(--cruto-foreground)] border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]"
          key={index}
        >
          <div className="w-full flex flex-col  gap-2 p-8 border-r border-[var(--cruto-border)]">
            <span className="text-xl font-semibold">Question</span>
            <span className="mx-auto">{question?.question}</span>
          </div>
          <div className="w-full flex flex-col  gap-4 p-8">
            <div className="flex gap-2 w-full">
              <span className="ml-auto text-2xl font-semibold">
                {question?.skill}
              </span>
              <Separator orientation="vertical" className="bg-black" />
              <span className="mr-auto text-xl bg-[var(--cruto-pale-green)] px-2 py-1 rounded-[var(--cruto-radius)] text-[var(--cruto-off-white)]">
                {question?.skill_level}
              </span>
            </div>
            <div className="flex w-full justify-between">
              {question?.answers?.map((answer) => (
                <div key={answer.answer}>
                  {answer.correct ? (
                    <SpellCheck className="text-[var(--cruto-green)]" />
                  ) : (
                    <SpellCheck2 className="text-[var(--cruto-red)]" />
                  )}
                  <span className="text-xl">{answer.answer}</span>
                </div>
              ))}
            </div>
            <div className="mx-auto bg-[var(--cruto-pale-green)] px-2 py-1 rounded-[var(--cruto-radius)] text-[var(--cruto-off-white)]">
              Points : {question?.points}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
