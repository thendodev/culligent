import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TCase } from '@/validations/cases';

type TAnswer = {
  question: number;
};
const Answers = ({ question }: TAnswer) => {
  const form = useFormContext<TCase>();

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
    <div>
      {' '}
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
                          {...field}
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
  );
};

export default Answers;
