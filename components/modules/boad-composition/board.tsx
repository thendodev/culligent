import { Input } from '@/components/ui/input';
import React from 'react';
import { MoreVertical, Trash2Icon } from 'lucide-react';
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

interface IBoardProps {
  boardName: string;
  children: React.ReactNode;
  stageIndex: number;
  handleDelete: () => void;
}
const Board = ({
  boardName,
  handleDelete,
  stageIndex,
  children,
}: IBoardProps) => {
  const form = useFormContext<TPipeline | TWithId<TPipeline>>();

  return (
    <div className="group min-w-[200px] min-h-[500px] border-t-4  rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] bg-[var(--cruto-foreground)]">
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
