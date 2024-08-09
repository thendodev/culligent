import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface IMoveQuestionProps {
  handleMove: (index: number) => void;
}
export function MoveQuestion({ handleMove }: IMoveQuestionProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleMoveQuestion = () => {
    const numberTest = /[0-9]/;
    if (!numberTest.test(questionIndex.toString())) return setIsError(true);
    handleMove(questionIndex);
  };

  const validateIndex = (index: number) => {
    const numberTest = /[0-9]/;
    if (!numberTest.test(index.toString())) return setIsError(true);
    if (questionIndex < 0) return setIsError(true);
    if (isError) setIsError(false);
    setQuestionIndex(index);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>Move</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[var(--cruto-white)] border-[var(--cruto-off-white)] rounded-[0.5rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>Where to move the question</AlertDialogTitle>
          <Input
            placeholder="Question number"
            type="number"
            onChange={(e) => validateIndex(e.target.valueAsNumber)}
          />

          <FormMessage
            style={{
              visibility: isError ? 'visible' : 'hidden',
              transition: 'visibility',
              transitionDelay: '600ms',
            }}
          >
            Please enter a valid number
          </FormMessage>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleMoveQuestion}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
