'use client';

import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, SaveAll, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SkillsCombobox } from '../components/skills-combobox';
import { TCase } from '@/validations/cases';

type TSingleChoiceProps = {
  form: UseFormReturn<TCase>;
  question: number;
  handleSave: (index: number) => void;
};
const SingleChoice = ({ form, question, handleSave }: TSingleChoiceProps) => {
  const { fields, append, replace } = useFieldArray({
    control: form?.control,
    name: `questions.${question}.answers`,
  });

  const handleCorrectAnswer = (id: string) => {
    const updatedAnswers = fields.map((answer, i) => {
      if (id === answer.id) {
        return {
          ...answer,
          correct: true,
        };
      }
      return { ...answer, correct: false };
    });
    replace(updatedAnswers);
  };

  return (
    <Form {...form}>
      <form className="h-full space-y-10 overflow-hidden bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border-[var(--cruto-border)] border">
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
              <Button
                variant="ghost"
                type="button"
                onClick={() => handleSave(question)}
              >
                <SaveAll size={20} />
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
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Intermediary">
                              Intermediary
                            </SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
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
            <div className="w-full flex flex-row mt-2 justify-end">
              <Button
                type="button"
                variant="outline"
                className="hover:scale-105 hover:border-[color:var(--cruto-green)]"
                onClick={() => append({ answer: '', correct: false })}
              >
                <Plus size={20} /> Add answer
              </Button>
            </div>
            <div className="w-full">
              <RadioGroup onValueChange={handleCorrectAnswer}>
                {fields.map(({ id }, index) => {
                  return (
                    <div
                      key={id}
                      className="w-full flex flex-row content-center items-center"
                    >
                      <FormField
                        name={`questions.${question}.answers.${index}.correct`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="mr-5">
                            <FormControl>
                              <RadioGroupItem
                                checked={field.value}
                                value={id}
                                id={id}
                              />
                            </FormControl>
                            <FormMessage>
                              {form.formState.errors.name?.message || ''}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`questions.${question}.answers.${index}.answer`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-[90%] mr-2">
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Case name" />
                            </FormControl>
                            <FormMessage>
                              {form.formState.errors.name?.message || ''}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SingleChoice;
