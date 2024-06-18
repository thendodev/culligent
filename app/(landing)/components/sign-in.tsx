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
import { ProjectRoutes } from '@/global/routes';
import { useRouter } from 'next/navigation';
import { loginHandler } from '@/handlers/handleAuth';
import { loginSchema, TLogin } from '@/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { useState } from 'react';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const isFormErrors = form.formState.isDirty && form.formState.isValid;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
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
                <div className="flex items-center align-middle border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]">
                  <Input
                    placeholder="Password"
                    {...field}
                    type={`${!showPassword ? 'password' : ''}`}
                    className=" border-none rounded-none"
                  />
                  <Eye
                    className="cursor-pointer hover:text-[var(--cruto-green)] mx-2"
                    onClick={() => setShowPassword(!showPassword)}
                    size={20}
                  />
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message || ''}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="mt-5">
          <Button type="submit" className="w-full" disabled={!isFormErrors}>
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
