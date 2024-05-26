'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ProfileDetailsSchema } from '../profile.types';
import { cn } from '@/lib/utils';
import { profileHandler } from '@/handlers/handleProfile';
import { useState } from 'react';
import { MProfile } from '@/models/Profile';
import { useUserClientSide } from '@/hooks/useUser';

type Props = {
  profile: MProfile | null;
};

const ProfileForm = ({ profile }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserClientSide();
  const form = useForm<MProfile>({
    defaultValues: {
      ...profile,
    },
    resolver: zodResolver(ProfileDetailsSchema),
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'urls',
  });

  const onSubmit = async (data: MProfile) => {
    setIsLoading(true);
    !profile
      ? await profileHandler.createProfile({
          ...data,
          user: user.email,
        })
      : await profileHandler.mutateProfile(data);
    setIsLoading(false);
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-[600px] sm:w-[400px] w-full grid gap-5 "
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Your Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 bg-[var(--cruto-black)] text-[var(--cruto-white)]"
            onClick={() => append({ url: '' })}
          >
            Add URL
          </Button>
        </div>
        <Button
          disabled={isLoading}
          className="bg-[var(--cruto-black)] text-[var(--cruto-white)] md:w-1/3"
        >
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
