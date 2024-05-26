import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { MoveQuestion } from './move-question-popup';
import { useState } from 'react';

type QuestionDropdownProps = {
  question: number;
  handleMoveQuestion: () => void;
  handleShiftQuestionToEnd: () => void;
  handleShiftQuestionToFront: () => void;
  deleteQuestion: () => void;
};
export function QuestionDropdown({
  question,
  handleMoveQuestion,
  handleShiftQuestionToEnd,
  handleShiftQuestionToFront,
  deleteQuestion,
}: QuestionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-51 bg-[var(--cruto-white)] border-[var(--cruto-off-white)] rounded-[0.4rem]">
        <DropdownMenuLabel>Question {question}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleMoveQuestion}>move</DropdownMenuItem>
          <DropdownMenuItem onClick={handleShiftQuestionToEnd}>
            shift to end
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShiftQuestionToFront}>
            shift to front
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteQuestion}>delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
