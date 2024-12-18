import { TCase } from '@/validations/cases';
import { UseFormReturn } from 'react-hook-form';
import { QuestionType } from './components/case';

export type TQuestionProps = {
  form: UseFormReturn<TCase>;
  question: number;
  handleSave: (index: number, type: QuestionType) => void;
  type: QuestionType;
};
