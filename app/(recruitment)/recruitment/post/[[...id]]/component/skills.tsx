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
import { useStateReducer } from '@/hooks/useStateReducer';
import { TPost } from '@/validations/posts';
import { X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Skills = () => {
  const [state, dispatch] = useStateReducer<{
    skill: string;
    activeSkill: number;
  }>({
    skill: '',
    activeSkill: 0,
  });
  const form = useFormContext<TPost>();

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'idealCandidate.skills',
  });

  const handleNewSkill = () => {
    append({ name: state.skill });
    dispatch({ skill: '', activeSkill: fields.length - 1 });
  };

  const onFocusSkill = (index: number) => {
    dispatch({ activeSkill: index });
  };

  return (
    <>
      <div className="w-full flex items-end content-center align-middle gap-6 border-b border-b-[var(--cruto-border)] pb-4">
        <FormItem className="flex flex-col">
          <FormLabel className="font-light text-md">Skill</FormLabel>
          <FormControl>
            <Input
              value={state.skill}
              placeholder="skill"
              onChange={({ target: { value } }) => dispatch({ skill: value })}
            />
          </FormControl>
          <FormMessage>
            {form.formState.errors?.idealCandidate?.skills?.message || ''}
          </FormMessage>
        </FormItem>

        <Button type="button" variant={'outline'} onClick={handleNewSkill}>
          Add
        </Button>
      </div>
      {!!fields.length && <p className="text-medium font-semibold">Skills</p>}
      <div className="w-full flex flex-wrap gap-1">
        {form.watch('idealCandidate.skills')?.map((skill, index) => {
          return (
            <div
              className="w-fit flex items-center align-middle gap-2 border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] px-2 py-1 cursor-pointer hover:border-[var(--cruto-green)]"
              key={skill.name}
            >
              <div
                className="w-fit"
                defaultValue={skill.name}
                onClick={() => onFocusSkill(index)}
              >
                {skill.name}
              </div>

              <X
                onClick={() => remove(index)}
                className="w-4 h-4 hover:text-red-700"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Skills;
