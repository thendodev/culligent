'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
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
import {
  BriefcaseIcon,
  GripVertical,
  PenBox,
  Trash2Icon,
  X,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCasesHandler } from '@/handlers/handleCases';
import { EGenericQueryKeys } from '@/global/config';
import { TCase } from '@/models/Cases';
import { TWithId } from '@/global/types';
import { recruitment } from '@/server/routes/recruitment';
import { ProjectRoutes } from '@/global/routes';
import { setCurrentStage } from '../../state/state';

type Props = {};

const PipelinePage = (props: Props) => {
  const [selectedCase, setSelectedCase] = useState<TWithId<TCase>[]>([]);

  const { data } = useQuery({
    queryKey: [EGenericQueryKeys.CASES],
    queryFn: getCasesHandler,
  });

  const form = useForm<TPipeline>({
    defaultValues: {
      stages: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    name: 'stages',
    control: form.control,
  });

  const [index, setIndex] = React.useState(fields.length);

  const formErrors = Object.keys(form.formState.errors);

  useEffect(() => {
    if (!formErrors.length) {
      setCurrentStage(ProjectRoutes.post);
    }
  }, [formErrors.length]);

  const randomColorGenerator = (x: number): string => {
    if (x === 0) return '#ffee00';
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    const formattedColor = `#${randomColor}`;
    if (
      formattedColor.toLowerCase() === '#000000' ||
      formattedColor.toLowerCase() === '#ffffff'
    ) {
      return randomColorGenerator(x - 1);
    }
    return formattedColor;
  };

  const handleSaveStage = () => {
    const stage = form.getValues(`stages.${index}`);
    stage.color = randomColorGenerator(2);
    const cases = selectedCase.map((item) => item._id);
    stage.cases = cases;
    update(index, stage);
    setIndex(fields.length + 1);
  };

  const handleDeleteStage = (index: number) => {
    remove(index);
  };

  const handleCaseSelect = (newCase: TWithId<TCase>) =>
    setSelectedCase((prev) => [...prev, newCase]);

  const handleUpdateStage = (index: number) => setIndex(index);

  const handleSubmit = (values: TPipeline) => {
    //update timeline
    console.log(values);
  };

  return (
    <div className="w-full h-[75vh]  flex flex-col gap-2">
      <div className="w-full h-full flex gap-2 ">
        <div className="flex flex-col justify-between  w-[70%] h-full p-2 bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border border-[var(--cruto-border)]">
          <div className="flex gap-2 overflow-x-auto">
            {fields.map((pipeline, index) => (
              <div
                style={{
                  borderTop: `2px solid ${pipeline.color}`,
                }}
                className={`flex align-middle items-center justify-between border-t-4 bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border border-[var(--cruto-border)] p-4`}
                key={pipeline.id}
              >
                <div className="flex align-middle items-center gap-2">
                  <GripVertical className="focus:cursor-grab focus:text-[var(--cruto-green)]" />
                  <span className="font-light text-md mr-16">
                    {pipeline.name}
                  </span>
                  <div className="flex items-center gap-2 border border-[var(--cruto-border)] p-1 rounded-[var(--cruto-radius)]">
                    {selectedCase.length > 0 && (
                      <BriefcaseIcon className="w-4 h-4" />
                    )}
                    {selectedCase.slice(0, 3)?.map((item) => (
                      <span
                        key={item._id.toString()}
                        className="text-sm flex items-center gap-1 hover: cursor-pointer"
                      >
                        {item.name}
                        <X className="w-3 h-3 hover:text-[var(--cruto-red)]" />
                      </span>
                    ))}
                    {selectedCase.length > 3 && (
                      <span className="text-sm flex items-center gap-1 hover: cursor-pointer">
                        +{selectedCase.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PenBox
                    onClick={() => handleUpdateStage(index)}
                    className="w-4 h-4 cursor-pointer hover:text-[var(--cruto-green)]"
                  />
                  <Trash2Icon
                    onClick={() => handleDeleteStage(index)}
                    className="mr-2 w-4 h-4 cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center align-middle gap-2 ">
            <Input
              defaultValue="Customize hiring pipeline"
              className="w-full rounded-none border-t-0 border-x-0 "
            />
            <div>
              <Button variant={'outline'} onClick={handleSaveStage}>
                Save
              </Button>
            </div>
          </div>
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
                cases={data!}
                onCaseSelect={handleCaseSelect}
                selectedCase={selectedCase[0]}
              />
            </form>

            <Button variant={'outline'} onClick={handleSaveStage}>
              Add stage
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PipelinePage;
