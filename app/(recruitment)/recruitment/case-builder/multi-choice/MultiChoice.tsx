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
import { Plus, SaveAll } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { SkillsCombobox } from '../components/skills-combobox';
import { Checkbox } from '@/components/ui/checkbox';
import { TCase } from '@/validations/cases';

interface TMultiChoiceProps {
  form: UseFormReturn<TCase>;
  question: number;
  handleSave: (index: number) => void;
}
const MultiChoice = ({ form, question, handleSave }: TMultiChoiceProps) => {
  const { fields, append } = useFieldArray({
    control: form?.control,
    name: `questions.${question}.answers`,
  });

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
              {fields.map(({ id }, index) => {
                return (
                  <div key={id} className="w-full h-fit flex  items-center">
                    <FormField
                      name={`questions.${question}.answers.${index}.correct`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mr-5">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
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
                        <FormItem className="w-[90%] m-2">
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
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MultiChoice;
