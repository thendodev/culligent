import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { DotSquare, MoreVertical, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Form, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { TPipeline } from '@/validations/pipeline';
import { TWithId } from '@/global/types';
import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

interface IBoardProps {
  boardName: string;
  children: React.ReactNode;
  stageIndex: number;
  handleDelete: () => void;
  id: string;
}
const Board = ({
  boardName,
  handleDelete,
  stageIndex,
  id,
  children,
}: IBoardProps) => {
  const form = useFormContext<TPipeline | TWithId<TPipeline>>();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        type: 'board',
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group min-w-[200px] min-h-[500px] border-t-4  rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] bg-[var(--cruto-foreground)]"
    >
      <div className="flex align-middle items-center justify-between p-2 hover:cursor-grab">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name={`stages.${stageIndex}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-fit border-none rounded-none font-bold text-xl hover:cursor-pointer hover:bg-[var(--cruto-background)] focus:bg-[var(--cruto-background)]"
                      defaultValue={boardName}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex items-center gap-2 hover:cursor-default">
          <Popover>
            <PopoverTrigger asChild>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-1">
              <Button
                variant="ghost"
                className="hover:bg-[var(--cruto-background)]"
                onClick={handleDelete}
              >
                <Trash2Icon className="mr-2 w-4 h-4" />
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Board;
