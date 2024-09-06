'use client';
import { getPostHandler } from '@/handlers/handlePosts';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { postsValidationSchema, TPostValidation } from '@/validations/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Certifications from './certifications';
import Skills from './skills';
import {
  FormCollection,
  FormFooter,
  FormWrapper,
} from '@/components/modules/forms';
type TPostProps = {
  id: string;
  queryKey: string[];
};

const Post = ({ id, queryKey }: TPostProps) => {
  const { data } = useQuery({
    queryKey,
    queryFn: () => getPostHandler(id),
    enabled: !!id,
  });

  const form = useForm<TPostValidation>({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      role: data?.role,
      idealCandidate: {
        experience: data?.idealCandidate.experience,
        skills: data?.idealCandidate.skills,
        education: data?.idealCandidate.education,
        certifications: data?.idealCandidate.certifications,
      },
      isFeatured: data?.isFeatured ?? true,
      isArchived: data?.isArchived,
    },
    resolver: zodResolver(postsValidationSchema),
  });

  return (
    <Form {...form}>
      <FormWrapper title={id ? 'Edit post' : 'Create post'}>
        <FormCollection
          section="Post information"
          description="General information related to the post"
        >
          <FormField
            name={'title'}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-light text-md">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name={'description'}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-light text-md">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Post description" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name={'role'}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-light text-md">Role</FormLabel>
                <FormControl>
                  <Input placeholder="Post role" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <Skills />
          <FormField
            name={'isFeatured'}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-light text-md">Published</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
        </FormCollection>
        <FormCollection
          section="Candidate information"
          description="General information related to the ideal candidate"
        >
          <FormField
            name={'idealCandidate.experience'}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-light text-md">Experience</FormLabel>
                <FormControl>
                  <Input placeholder="Candidate experience" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name={'idealCandidate.education'}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-light text-md">
                  Education level
                </FormLabel>
                <FormControl>
                  <Input placeholder="Candidate experience" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <Certifications />
        </FormCollection>
        <FormFooter>
          <Button variant={'outline'} type="button">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </FormFooter>
      </FormWrapper>
    </Form>
  );
};

export default Post;
