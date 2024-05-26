'use client';

import { AlignLeft, Check, ListChecks, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';

type QuestionPopoverProps = {
  append: () => void;
  type: Dispatch<SetStateAction<number>>;
};

const QuestionPopover = ({ append, type }: QuestionPopoverProps) => {
  const handleButtonAction = (question: number) => {
    type(question);
    append();
  };

  return (
    <Popover>
      <PopoverTrigger className="flex gap-1 border-[1px] hover:border-[var(--cruto-black)] rounded-[0.6rem] p-1 items-center">
        <Plus size={20} color="black" /> Add Question
      </PopoverTrigger>
      <PopoverContent className="w-fit h-fit shadow-sm border-[color:var(--cruto-black)] bg-white rounded-[10px] p-2">
        <Button
          variant="ghost"
          onClick={() => handleButtonAction(0)}
          className="flex-grow flex flex-row justify-center content-center items-center p-10 hover:scale-105"
        >
          <ListChecks size={30} className="mr-2" /> Multiple Choice
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleButtonAction(1)}
          className="flex-1 flex flex-row justify-center content-center items-center p-10 hover:scale-105"
        >
          <Check size={30} className="mr-2" /> Single Choice
        </Button>
        {/* <div className="flex-1 flex flex-row p-10">
            <Video size={30} className='mr-2' /> Video
            </div> */}
        {/* 
          <Button variant="ghost"  className="flex-1 shadow-sm flex flex-row justify-center content-center items-center p-10 hover:scale-105">
              <Code size={30} className='mr-2' /> Code
          </Button>
              */}
        <Button
          variant="ghost"
          onClick={() => handleButtonAction(2)}
          className="flex-1 flex flex-row justify-center content-center items-center p-10 hover:scale-105"
        >
          <AlignLeft size={30} className="mr-2" />
          Open Ended
        </Button>
        {/* <div className="flex-1 flex flex-row p-10">
            <FileSignature size={30} className='mr-2' />Fill in the blank
            </div>
            <div className="flex-1 flex flex-row p-10">
            <Table size={30} className='mr-2' /> Table
            </div>
            <div className="flex-1 flex flex-row p-10">
            <Grid size={30} className='mr-2' /> Matrix
            </div> */}
        {/* <div className="flex-1 flex flex-row p-10">
            <ListChecks size={30} className='mr-2' /> Drive
            </div> */}
      </PopoverContent>
    </Popover>
  );
};

export default QuestionPopover;
