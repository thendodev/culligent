import React from 'react';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
import { Plus, Trash, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { SkillsCombobox } from '../../components/skills-combobox';
import { TCase } from '@/validations/cases';

type QuestionProps = {
  form: UseFormReturn<TCase>;
  question: number;
};
const CreateQuestion = ({ form, question }: QuestionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${question}.answers`,
  });
  return (
    <div className=" w-full h-400px shadow-sm bg-[color:var(--cruto-white)]">
      <div className="flex flex-col flex-1 justify-around ">
        <div className="flex flex-1 flex-row justify-between content-center">
          <FormField
            name={`questions.${question}.skill`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <SkillsCombobox field={field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.name?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button>
            <Trash2 />
          </Button>
        </div>
        <div className="flex-1 flex flex-row justify-between mr-20 items-center content-center">
          <FormField
            name={`questions.${question}.skill_level`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills Level</FormLabel>
                <FormControl>
                  <Select {...field}>
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
                  <Input
                    {...field}
                    min="0"
                    placeholder="Points assigned"
                    name="name"
                    type="number"
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
      <div className="w-full flex-1">
        <div className="flex-1 flex flex-row w-full">
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
              <div
                key={id}
                className="w-full flex flex-row content-center items-center "
              >
                <FormField
                  name={`questions.${question}.answers.${index}.correct`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mr-5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[4px]"
                          name="answer"
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
                        <Input {...field} placeholder="Case name" type="text" />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.name?.message || ''}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {index > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash size={20} />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
