import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  ArrowRightLeft,
  Edit,
  MoreHorizontal,
  Trash,
} from 'lucide-react';

type QuestionDropdownProps = {
  question: number;
  handleMoveQuestion: () => void;
  handleShiftQuestionToEnd: () => void;
  handleShiftQuestionToFront: () => void;
  deleteQuestion: () => void;
  updateQuestion: () => void;
};
export function QuestionDropdown({
  question,
  handleMoveQuestion,
  handleShiftQuestionToEnd,
  handleShiftQuestionToFront,
  deleteQuestion,
  updateQuestion,
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
          <DropdownMenuItem onClick={handleMoveQuestion}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            move
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShiftQuestionToEnd}>
            <ArrowBigDownDash className="mr-2 h-4 w-4" />
            shift to end
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShiftQuestionToFront}>
            <ArrowBigUpDash className="mr-2 h-4 w-4" />
            shift to front
          </DropdownMenuItem>
          <DropdownMenuItem onClick={updateQuestion}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteQuestion}>
            <Trash className="mr-2 h-4 w-4" />
            delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
