'use client';
import { getPostHandler } from '@/handlers/handlePosts';
import { QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import PageWrapper from '../../components/page-wrapper';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { SkillsCombobox } from '../../case/[[...id]]/components/skills-combobox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Certifications from './component/certifications';
import { Switch } from '@/components/ui/switch';
import Tags from './component/tags';

type TPostProps = {
  params: {
    id: string;
  };
};

const Post = ({ params: { id } }: TPostProps) => {
  const queryKey = ['posts'];

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
      tags: data?.tags,
      isFeatured: data?.isFeatured,
      isArchived: data?.isArchived,
    },
    resolver: zodResolver(postsValidationSchema),
  });

  return (
    <PageWrapper title="Post" description="Post">
      <Form {...form}>
        <form className="w-full border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] bg-[var(--cruto-foreground)]">
          <div className="w-full text-xl font-bold p-4">
            {!id ? 'Create Post' : 'Update Post'}
          </div>
          <div className="w-full space-y-1 p-2 border border-[var(--cruto-border)]">
            <div className="w-full flex">
              <div className="w-1/3 p-4 bg-[var(--cruto-background)]">
                <div>
                  <p className="text-xl font-bold">Post information</p>
                  <span>General information related to the post</span>
                </div>
              </div>
              <div className="w-2/3 p-4 space-y-2">
                <FormField
                  name={'title'}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-light text-md">
                        Title
                      </FormLabel>
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
                {/* <Tags form={form} /> */}
                <FormField
                  name={'isFeatured'}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-light text-md">
                        Published
                      </FormLabel>
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
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-1/3 p-4 bg-[var(--cruto-background)]">
                <div>
                  <p className="text-xl font-bold">Candidate information</p>
                  <span>
                    General information related to the ideal candidate
                  </span>
                </div>
              </div>
              <div className="w-2/3 p-4 space-y-2">
                <FormField
                  name={'idealCandidate.experience'}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-light text-md">
                        Experience
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
                <Certifications form={form} />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-2 p-2 border border-[var(--cruto-border)] bg-[var(--cruto-background)]">
            <Button variant={'outline'} type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </PageWrapper>
  );
};

export default Post;
