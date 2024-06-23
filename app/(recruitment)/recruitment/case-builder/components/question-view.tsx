'use client';

import React, { useEffect, useRef } from 'react';
import { QuestionDropdown } from './question-dropdown';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Check, StarIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TCase, TQuestion } from '@/validations/cases';

type TQuestionProps = {
  form: UseFormReturn<TCase>;
  fieldArray: any;
  id: number;
  deleteQuestion: (index: number) => void;
  updateQuestion: (index: number) => void;

  question: TQuestion;
};

const QuestionView = ({
  form,
  id,
  deleteQuestion,
  updateQuestion,
  fieldArray,
  question,
}: TQuestionProps) => {
  const questionRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const [openMoveQuestion, setMoveQuestion] = React.useState(false);
  const [openAnswers, setOpenAnswers] = React.useState(false);

  useEffect(() => {
    if (!questionRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (questionRef.current?.clientHeight !== height) {
        setHeight(questionRef.current?.clientHeight ?? 0);
      }
    });
    resizeObserver.observe(questionRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [questionRef, height]);

  const handleShiftQuestionToEnd = () => {
    fieldArray.move(id, fieldArray.fields.length - 1);
  };
  const handleMoveQuestion = () => {
    fieldArray.move(id, fieldArray.fields.length - 1);
  };
  const handleShiftQuestionToFront = () => {
    fieldArray.move(id, 0);
  };

  return (
    <div className="flex gap-2 h-full w-full">
      <div className="flex flex-col items-center h-full">
        <div className="w-4 h-4 rounded-full bg-[var(--cruto-black)]"></div>
        <div
          className="w-[2px] bg-[var(--cruto-black)]"
          style={{ height: height }}
        ></div>
      </div>

      <div
        className="w-[100%] h-full rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] px-2 bg-[--cruto-foreground]"
        ref={questionRef}
      >
        <div
          id="view-question-header"
          className="flex items-center justify-between w-full p-2"
        >
          <p className="text-md font-bold text-[var(--cruto-text)]">
            Question {id + 1} of {fieldArray.fields?.length}.
          </p>
          <QuestionDropdown
            question={id + 1}
            handleMoveQuestion={() => setMoveQuestion(true)}
            handleShiftQuestionToFront={handleShiftQuestionToFront}
            handleShiftQuestionToEnd={handleShiftQuestionToEnd}
            deleteQuestion={() => deleteQuestion(id)}
            updateQuestion={() => updateQuestion(id)}
          />
        </div>

        <div className="text-[var(--cruto-text-black)] text-center p-2 mx-auto">
          {question?.question}
        </div>

        <div className="w-full flex justify-center">
          <Button
            variant={'ghost'}
            onClick={() => setOpenAnswers(!openAnswers)}
            className="text-[var(--cruto-green)] "
            disabled={!question?.answers?.length}
          >
            Show Answers
          </Button>
        </div>
        <div className="flex flex-col gap-2 w-full p-2">
          {openAnswers &&
            question?.answers?.map((answer, index) => (
              <p
                key={answer.answer}
                className="text-md text-[var(--cruto-text)] flex items-center gap-2 b p-2"
              >
                {answer.correct ? (
                  <Check size={20} className="text-[var(--cruto-green)]" />
                ) : (
                  <X size={20} className="text-[var(--cruto-red)]" />
                )}
                {answer.answer}
              </p>
            ))}
        </div>
        <div className="flex gap-5 w-full border-t border-t-[var(--cruto-border)] justify-around items-center p-2">
          <div className="flex gap-2 text-sm b">
            <StarIcon size={20} /> Points: {question?.points}
          </div>
          <div className="flex gap-2 text-sm b">
            <StarIcon size={20} /> Skill: {question?.skill}
          </div>
          <div className="flex gap-2 text-sm b">
            <StarIcon size={20} /> Skill level: {question?.skill_level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
