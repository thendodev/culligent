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
import { SaveAll } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useFieldArray } from 'react-hook-form';
import { SkillsCombobox } from '../components/skills-combobox';
import { TQuestionProps } from '../types';

type TOpenEndedProps = {} & TQuestionProps;
const OpenEnded = ({ form, question, handleSave, type }: TOpenEndedProps) => {
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
                variant="outline"
                type="button"
                onClick={() => handleSave(question, type)}
              >
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

export default OpenEnded;
