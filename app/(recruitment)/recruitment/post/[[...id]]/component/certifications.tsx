'use client';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/functionUtil';
import { TPostValidation } from '@/validations/posts';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

type TCertificationsProps = {
  form: UseFormReturn<TPostValidation>;
};

const Certifications = ({ form }: TCertificationsProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'idealCandidate.certifications',
  });

  const handleNewCertification = () => {
    const certificate = form.getValues('idealCandidate.certifications')?.[
      fields.length - 1
    ];
    if (!certificate) return;
    append(certificate);
  };

  return (
    <div className="space-y-4 border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] p-5">
      <div className="w-full flex items-end content-center align-middle gap-6 border-b border-b-[var(--cruto-border)] pb-4">
        <FormField
          name={`idealCandidate.certifications.${fields.length - 1}.name`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-light text-md">
                Certifications
              </FormLabel>
              <FormControl>
                <Input placeholder="Candidate certifications" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.idealCandidate?.certifications
                  ?.message || ''}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name={`idealCandidate.certifications.${fields.length - 1}.level`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-light text-md">Level</FormLabel>
              <FormControl>
                <Input placeholder="Certifications level" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.idealCandidate?.certifications
                  ?.message || ''}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={handleNewCertification}
          variant={'outline'}
          value={'add'}
        >
          Add
        </Button>
      </div>
      {!!fields.length && (
        <p className="text-medium font-semibold">Certifications</p>
      )}
      <div className="w-full flex flex-row flex-wrap gap-1">
        {form.watch('idealCandidate.certifications')?.map((cert, index) => {
          return (
            <div
              className="flex items-center gap-2 rounded-[var(--cruto-radius)]"
              key={cert.name}
            >
              {index + 1}.
              <Input
                className="border-x-[0px] border-t-[0px] border-b-[1px] rounded-none"
                defaultValue={cert.name}
                onChange={({ target: { value } }) =>
                  debounce(update(index, { ...cert, level: value }) as any, 500)
                }
              />
              <Input
                className="border-x-[0px] border-t-[0px] border-b-[1px] rounded-none"
                defaultValue={cert.level}
                onChange={({ target: { value } }) =>
                  debounce(update(index, { ...cert, level: value }) as any, 500)
                }
              />
              <Button
                type="button"
                variant={'ghost'}
                onClick={() => remove(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;
