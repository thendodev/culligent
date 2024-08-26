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
import { useFieldArray, UseFormReturn } from 'react-hook-form';

type TTagsProps = {
  form: UseFormReturn<TPostValidation>;
};

const Tags = ({ form }: TTagsProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'tags',
  });

  const handleNewTag = () => {
    const tag = form.getValues('tags')?.[fields?.length - 1];
    if (!tag) return;
    append(tag);
  };

  return (
    <div className="space-y-4 ">
      <div className="w-full flex items-end content-center align-middle gap-6 border-b border-b-[var(--cruto-border)] pb-4">
        <FormField
          name={`tags.${fields.length - 1}.name`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-light text-md">Tag</FormLabel>
              <FormControl>
                <Input placeholder="Post tag" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.tags?.message || ''}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button
          type="button"
          onClick={handleNewTag}
          variant={'outline'}
          value={'add'}
        >
          Add
        </Button>
      </div>
      {!!fields.length && <p className="text-medium font-semibold">Tags</p>}
      <div className="w-full flex flex-wrap gap-1">
        {form.watch('tags')?.map((tag, index) => {
          return (
            <div
              className=" w-fit flex items-center gap-2 border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]"
              key={tag.name}
            >
              <Input
                className="w-fit border-none"
                defaultValue={tag.name}
                onChange={({ target: { value } }) =>
                  debounce(update(index, { name: value }) as any, 500)
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

export default Tags;
