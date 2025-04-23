import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import React from 'react';
import { SkillsCombobox } from '../skills-combobox';
import { Button } from '@/components/ui/button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { QuestionSchema, TCase } from '@/validations/cases';
import { toast } from '@/components/ui/use-toast';
import { QuestionType } from '../case';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export type TQuestionProps = {
  question: number;
  type: QuestionType;
};

const Question = ({ question, type }: TQuestionProps) => {
  const form = useFormContext<TCase>();

  const { update } = useFieldArray({
    control: form?.control,
    name: `questions`,
  });

  const handleSave = (questionIndex: number) => {
    const question = {
      ...form.getValues(`questions.${questionIndex}`),
      type: type,
    };
    const { success, error, data } = QuestionSchema.safeParse(question);

    if (!data || (!success && error > 1)) {
      return error.errors.map((error) =>
        toast({
          title: (error.path[0] as string) ?? 'Nothing to save',
          description: error.message ?? 'No case found',
        }),
      );
    }

    update(questionIndex, {
      ...data,
      type: type,
    });

    toast({
      title: 'Saved',
      description: 'Question saved successfully',
    });
  };
  return (
    <Form {...form}>
      <form className="h-full space-y-10 overflow-hidden">
        <div className="overflow-hidden space-y-10 animate-[pulse_1s_ease-in] p-5 rounded-[0.5rem]">
          <div>
            <div className="flex justify-between ">
              <FormField
                name={`questions.${question}.skill`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-light text-md">Skills</FormLabel>
                    <FormControl>
                      <SkillsCombobox field={field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message || ''}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => handleSave(question)}>
                Save
              </Button>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-between content-center">
              <FormField
                name={`questions.${question}.skill_level`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills Level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px] rounded-[var(--cruto-input-rounded)]">
                          <SelectValue placeholder="Select a skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Skill level</SelectLabel>
                            <SelectItem value="2">Senior</SelectItem>
                            <SelectItem value="1">Intermediary</SelectItem>
                            <SelectItem value="0">Beginner</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message || ''}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name={`questions.${question}.points`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input {...field} min="0" placeholder="Points assigned" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.duration?.message || ''}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <FormField
              name={`questions.${question}.question`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex : what is the square root of 144"
                      name="description"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.duration?.message || ''}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Question;
