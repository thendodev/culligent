import { TCaseValidation } from '@/validations/cases';
import { UseFormReturn } from 'react-hook-form';
import { QuestionType } from './components/case-details';

export type TQuestionProps = {
  form: UseFormReturn<TCaseValidation>;
  question: number;
  handleSave: (index: number, type: QuestionType) => void;
  type: QuestionType;
};
