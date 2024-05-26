'use client';

import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProjectRoutes } from '@/global/routes';
import { useRouter } from 'next/navigation';
import { loginHandler } from '@/handlers/handleAuth';
import { loginSchema, TLogin } from '@/validations/auth';

const UserAuthForm = () => {
  const router = useRouter();
  const form = useForm<TLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLogin, e: any) => {
    if (!data.email || !data.password) return;
    e?.preventDefault();
    const user = await loginHandler(data);
    if (user && user.isVerified) {
      router.push(`${ProjectRoutes.recruitment}/${ProjectRoutes.dashboard}`);
    }
    if (user && !user.isVerified) {
      router.push(`${ProjectRoutes.sign_up}/otp?email=${user.email}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:border border-[var(--cruto-off-white)] rounded-[0.5rem] p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="mt-5">
            <Button
              type="submit"
              variant={'green'}
              className="mt-5 w-[100%] text-[color:var(--cruto-white)]"
            >
              Log in
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-full text-center text-sm text-[color:var(--cruto-black)]">
        <Link className=" hover:text-[var(--cruto-green)]" href={'/sign-up'}>
          Sign up
        </Link>{' '}
        |{' '}
        <Link
          className=" hover:text-[var(--cruto-green)]"
          href={'/forget-password'}
        >
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default UserAuthForm;
