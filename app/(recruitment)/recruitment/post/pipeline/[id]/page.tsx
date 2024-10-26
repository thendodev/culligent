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

type Props = {};

const PipelinePage = (props: Props) => {
  const form = useForm<TPipeline>({
    defaultValues: {
      pipeline: '',
      stages: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: 'stages',
    control: form.control,
  });

  const randomColorGenerator = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (
      randomColor.toLowerCase() === '#OOOOOO'.toLowerCase() ||
      randomColor.toLowerCase() === '#FFFFFF'.toLowerCase()
    ) {
      return randomColorGenerator();
    }
    return `#${randomColor}`;
  };

  const handleNewStage = () => {
    fieldArray.append({
      name: '',
      color: randomColorGenerator(),
    });
  };

  return (
    <div className="w-full h-[80vh]  flex flex-col gap-2">
      <div className="w-full">
        <p className="text-2xl font-semibold ">Customize hiring pipeline</p>
      </div>
      <div className="w-full h-full flex gap-1">
        <div className="w-[70%] h-full"></div>
        {/* <Separator
          orientation="vertical"
          className="h-full w-1 bg-[var(--cruto-border)]"
        /> */}
        <div className="w-[30%] h-full bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] flex gap-2 flex-col justify-between p-2 ">
          <Form {...form}>
            {fields}
           {fields}
            <FormField
              name={`stages.${question}.skill`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-light text-md">Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="Pipeline stage" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message || ''}
                  </FormMessage>
                </FormItem>
              )}
            />
            <SelectCase
              teams={[]}
              onTeamSelect={() => {}}
              selectedTeam={undefined}
            />

            <Button className="w-fit">Save</Button>
          </Form>
        </div>
      </div>
      <div>
        <Button>Add stage</Button>
      </div>
    </div>
  );
};

export default PipelinePage;
