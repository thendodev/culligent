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
import { handleUserAccount } from '@/handlers/handle-user';
import { UserProps } from '@/models/User.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AccountProps = {
  account: UserProps | null;
};

const UserSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().email(),
});

const AccountForm = () => {
  const { data } = useQuery({
    queryKey: ['account'],
    queryFn: handleUserAccount,
  });

  const form = useForm<UserProps>({
    defaultValues: data || {},
    resolver: zodResolver(UserSchema),
  });
  return (
    <div className="w-full sm:500px md:600px h-fit">
      <Form {...form}>
        <form className="w-full sm:w-[500px] md:w-[600px] grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Your Surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="sm:w-1/4">Update</Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
