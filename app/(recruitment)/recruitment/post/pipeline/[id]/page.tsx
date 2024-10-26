'use client';
import SearchBar from '@/components/modules/search-bar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import SelectCase from './components/select-case';
import { useFieldArray, useForm } from 'react-hook-form';
import { TPipeline } from '@/validations/pipeline';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { GripVertical, Trash2Icon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {};

const PipelinePage = (props: Props) => {
  const form = useForm<TPipeline>({
    defaultValues: {
      stages: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'stages',
    control: form.control,
  });

  const [index, setIndex] = React.useState(fields.length);

  const randomColorGenerator = (x: number) => {
    if (x === 0) return '#ffee00';
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (
      randomColor.toLowerCase() === '#OOOOOO'.toLowerCase() ||
      randomColor.toLowerCase() === '#FFFFFF'.toLowerCase()
    ) {
      return randomColorGenerator(x - 1);
    }
    return `#${randomColor}`;
  };

  const handleNewStage = () => {
    const stage = form.getValues(`stages.${index}`);
    stage.color = randomColorGenerator(2);
    console.log(stage);
    append(stage);
  };

  const handleDeleteStage = (index: number) => {
    remove(index);
  };

  return (
    <div className="w-full h-[75vh]  flex flex-col gap-2">
      <div className="w-full flex items-center align-middle gap-2 ">
        <Input
          defaultValue="Customize hiring pipeline"
          className="w-[63%] rounded-none border-t-0 border-x-0 "
        />
        <div>
          <Button variant={'outline'}>Save</Button>
        </div>
      </div>
      <div className="w-full h-full flex gap-2 ">
        <div className=" overflow-x-auto flex flex-col gap-2 w-[70%] h-full p-6 bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border border-[var(--cruto-border)]">
          {fields.map((pipeline, index) => (
            <div
              className={`flex align-middle items-center border-t-8 border-t-${pipeline.color} bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] p-4`}
              key={pipeline.id}
            >
              <div className="flex align-middle items-center gap-2">
                <GripVertical />
                <span className="font-light text-md">{pipeline.name}</span>
              </div>
              <div>
                <Trash2Icon
                  onClick={() => handleDeleteStage(index)}
                  className="mr-2 w-4 h-4 cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-[30%] h-full bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] flex gap-2 flex-col justify-between p-2 ">
          <Form {...form}>
            <form className="space-y-2">
              <FormField
                name={`stages.${index}.name`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-light text-sm">Stage</FormLabel>
                    <FormControl>
                      <Input placeholder="Pipeline stage" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.stages?.[index]?.name?.message ||
                        ''}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name={`stages.${index}.description`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-light text-sm">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Pipeline stage" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.stages?.[index]?.name?.message ||
                        ''}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <SelectCase
                cases={[]}
                onCaseSelect={() => {}}
                selectedCase={undefined}
              />
            </form>

            <Button variant={'outline'} onClick={handleNewStage}>
              Add stage
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PipelinePage;
