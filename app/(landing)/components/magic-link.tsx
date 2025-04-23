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
import { createMagicLinkHandler } from '@/handlers/handle-auth';
import { magicLinkSchema, TForgotPassword } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const form = useForm<TForgotPassword>({
    resolver: zodResolver(magicLinkSchema),
  });

  const onSubmit = async (data: TForgotPassword) => {
    if (!data.email) return;
    await createMagicLinkHandler(data.email);
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
              <FormDescription className="p-1 mb-8 border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] text-center text-sm">
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
