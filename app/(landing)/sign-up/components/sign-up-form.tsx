'use client';

import { BaseSyntheticEvent, useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { emailSignUpHandler } from '@/handlers/handle-accounts';
import Link from 'next/link';
import { ProjectRoutes } from '@/global/routes';
import { TSignUp, signUpSchema } from '@/validations/auth';
import { Loader2Icon } from 'lucide-react';

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TSignUp>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (
    data: TSignUp,
    e: BaseSyntheticEvent<object, any, any> | undefined,
  ) => {
    e?.preventDefault();
    setIsLoading(true);
    const user = await emailSignUpHandler(data);
    setIsLoading(false);
    if (user) {
      router.push(
        `${ProjectRoutes.sign_up}/${ProjectRoutes.otp_verify}?user=${user._id}`,
      );
    }
  };

  return (
    <div className="mx-auto w-[90%] lg:w-[45%] sm:w-[80%] my-10 sm:border border-[var(--cruto-border)] bg-[var(--cruto-foreground)] rounded-[0.5rem] p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" type="text" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.name?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="surname"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Surname" type="text" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.surname?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
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
                <FormLabel>
                  Password{' '}
                  <p className="text-[0.6rem] text-[var(--cruto-pale-grey)]">
                    (uppercase, lowercase, number and special characters)
                  </p>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message || ''}
                </FormMessage>
              </FormItem>
            )}
          />

          <div>
            <Button className="mt-2 w-full">
              {!isLoading ? (
                <p>Sign Up</p>
              ) : (
                <Loader2Icon className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex justify-center w-full my-4 mx-auto text-sm text-center">
        <Link
          href={'/'}
          className="flex gap-2 hover:text-[color:var(--cruto-green)] w-fit"
        >
          Back to the login page
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
