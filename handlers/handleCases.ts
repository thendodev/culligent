import { toast } from '@/components/ui/use-toast';
import { privateRequest } from '@/lib/requests';
import { TCase } from '@/validations/cases';
import { AxiosError } from 'axios';

export const createCaseHandler = async (newCase: TCase) => {
  try {
    await privateRequest.post('/recruitment/case', newCase);
    toast({ title: 'Case', description: 'Case created' });
  } catch (e) {
    const error = e as AxiosError<any>;
    toast({
      title: 'Error',
      description: error.message,
    });
  }
};
