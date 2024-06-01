import { Button } from '@/components/ui/button';
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
import { forgotPasswordHandler } from '@/handlers/handleAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type TEmail = z.infer<typeof EmailSchema>;

const ForgotPassword = () => {
  const form = useForm<TEmail>({
    resolver: zodResolver(EmailSchema),
  });

  const onSubmit = async (data: TEmail) => {
    if (!data.email) return;
    await forgotPasswordHandler(data.email);
  };

  const isFormErrors = form.formState.isDirty && form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription className="p-1 border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] text-center">
                An email will be sent to your email address for a one time login
              </FormDescription>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. JaneDoe@culligent.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email?.message || ''}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="mt-5 w-full">
          <Button type="submit" disabled={!isFormErrors}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
