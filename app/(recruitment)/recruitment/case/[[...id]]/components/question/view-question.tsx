import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IViewQuestionProps {
  isOpen?: boolean;
  questions: number;
  children: React.ReactNode;
}
const ViewQuestion = ({
  children,
  questions,
  isOpen = false,
}: IViewQuestionProps) => {
  return (
    <Sheet defaultOpen={isOpen}>
      <SheetTrigger asChild>
        <Button className="ml-auto">View Cases</Button>
      </SheetTrigger>
      <SheetContent className="!max-w-[60rem]">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            View cases <sup className="text-sm">({questions}) </sup>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="w-full h-full">{children}</ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ViewQuestion;
