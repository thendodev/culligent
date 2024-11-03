'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toast } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useStateReducer } from '@/hooks/useStateReducer';
import { TPostValidation } from '@/validations/posts';
import { X } from 'lucide-react';
import { FocusEventHandler } from 'react';
import { useFieldArray, useFormContext, UseFormReturn } from 'react-hook-form';

const Certifications = () => {
  const form = useFormContext<TPostValidation>();
  const [state, dispatch] = useStateReducer<{
    certificate: string;
    level: string;
  }>({
    certificate: '',
    level: '',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'idealCandidate.certifications',
  });

  const onAddCertificate = () => {
    append(
      {
        name: state.certificate,
        level: state.level,
      },
      { shouldFocus: true },
    );
    dispatch({
      certificate: '',
      level: '',
    });
  };

  //TODO : add a toast when a change is saved

  // const onUnFocus = (e: FocusEventHandler<HTMLInputElement>) => {
  //   toast({
  //     title: 'Saved',
  //     description: 'Change saved successfully',
  //   });
  // };

  return (
    <div className="space-y-4 border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] p-5">
      <div className="w-full flex items-end content-center align-middle gap-6 border-b border-b-[var(--cruto-border)] pb-4">
        <FormItem className="flex flex-col">
          <FormLabel className="font-light text-md">Certifications</FormLabel>
          <FormControl>
            <Input
              value={state.certificate}
              onChange={({ target: { value } }) =>
                dispatch({
                  certificate: value,
                })
              }
              placeholder="Candidate certifications"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors?.idealCandidate?.certifications?.message ||
              ''}
          </FormMessage>
        </FormItem>

        <FormItem className="flex flex-col">
          <FormLabel className="font-light text-md">Level</FormLabel>
          <FormControl>
            <Input
              value={state.level}
              onChange={({ target: { value } }) => dispatch({ level: value })}
              placeholder="Certifications level"
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors?.idealCandidate?.certifications?.message ||
              ''}
          </FormMessage>
        </FormItem>

        <Button
          type="button"
          onClick={onAddCertificate}
          variant={'outline'}
          value={'add'}
        >
          Add
        </Button>
      </div>
      {!!fields.length && (
        <p className="text-medium font-semibold">Certifications</p>
      )}
      <Form {...form}>
        <form className="w-full flex flex-row flex-wrap gap-1">
          {form.watch('idealCandidate.certifications')?.map((cert, index) => {
            return (
              <div
                className="flex items-center gap-2 rounded-[var(--cruto-radius)]"
                key={cert.name}
              >
                {index + 1}.
                <FormField
                  name={`idealCandidate.certifications.${index}.name`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input
                          className="border-x-[0px] border-t-[0px] border-b-[1px] rounded-none"
                          placeholder="Certification"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors?.idealCandidate?.certifications
                          ?.message || ''}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name={`idealCandidate.certifications.${index}.level`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input
                          className="border-x-[0px] border-t-[0px] border-b-[1px] rounded-none"
                          placeholder="Certification level"
                          {...field}
                        />
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
                  variant={'ghost'}
                  onClick={() => remove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </form>
      </Form>
    </div>
  );
};

export default Certifications;
