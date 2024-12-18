'use client';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TCase } from '@/validations/cases';

type TQuestionWrapperProps = {
  form: UseFormReturn<TCase>;
  children: React.ReactNode;
};

const QuestionWrapper = ({ children, form }: TQuestionWrapperProps) => {
  return (
    <Form {...form}>
      <form className="h-full space-y-10 overflow-hidden bg-[var(--cruto-foreground)] rounded-[var(--cruto-radius)] border-[var(--cruto-border)] border">
        <div className="overflow-hidden space-y-10 animate-[pulse_1s_ease-in] p-5 rounded-[0.5rem]">
          {children}
        </div>
      </form>
    </Form>
  );
};

export default QuestionWrapper;
