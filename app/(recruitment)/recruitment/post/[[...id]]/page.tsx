'use client';
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
} from '@/handlers/handlePosts';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { postsValidationSchema, TPost } from '@/validations/posts';
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

import {
  FormCollection,
  FormFooter,
  FormWrapper,
} from '@/components/modules/forms';
import { toast } from '@/components/ui/use-toast';
import { TWithId } from '@/global/types';
import Certifications from './components/certifications';
import Skills from './components/skills';
import { useParams, useRouter } from 'next/navigation';
import { setCurrentStage } from '../state/state';
import { ProjectRoutes } from '@/global/routes';
import { objectIdValidator } from '@/validations/mongoose';

const Post = () => {
  const router = useRouter();
  const { id } = useParams();

  const queryKey = ['posts', id];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getPostHandler(id as string),
    enabled: !!id,
  });

  const form = useForm<TWithId<TPost>>({
    values: data,
    resolver: zodResolver(
      postsValidationSchema.extend({ _id: objectIdValidator }).optional(),
    ),
  });

  const { mutate } = useMutation({
    mutationFn: id
      ? form.handleSubmit(updatePostHandler)
      : form.handleSubmit(createPostHandler),
    onSuccess: () => {
      toast({
        title: 'Post saved',
        description: 'Post saved successfully',
      });
      router.push(
        `/${ProjectRoutes.recruitment}/${ProjectRoutes.post}/${ProjectRoutes.pipeline}/${id}`,
      );
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    },
  });

  const formErrors = Object.keys(form.formState.errors);
  useEffect(() => {
    if (!formErrors.length) {
      setCurrentStage(ProjectRoutes.post);
    }
  }, [formErrors.length]);

  return (
    <Form {...form}>
      <FormWrapper action={mutate} title={id ? 'Edit post' : 'Create post'}>
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
          <Button>Submit</Button>
        </FormFooter>
      </FormWrapper>
    </Form>
  );
};

export default Post;
