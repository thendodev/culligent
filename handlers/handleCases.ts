import { toast } from '@/components/ui/use-toast';
import { ETimeFormat } from '@/global/config';
import { ClientErrorResponse } from '@/global/response.types';
import { privateRequest } from '@/lib/requests';
import { MCase } from '@/models/Cases';
import { TCase } from '@/validations/cases';
import { AxiosError } from 'axios';

enum ECaseRoutes {
  CASES = '/recruitment/cases',
}

export const createCaseHandler = async (newCase: TCase) => {
  try {
    await privateRequest.post(ECaseRoutes.CASES, newCase);
    toast({ title: 'Case', description: 'Case created' });
  } catch (e) {
    const { response } = e as AxiosError<ClientErrorResponse>;
    toast({
      title: 'Error',
      description: response?.data.message,
    });
  }
};

export const getCasesHandler = async () => {
  try {
    const { data } = await privateRequest.get(ECaseRoutes.CASES);
    //remap data to match the case column schema
    return data.map((item: MCase) => ({
      ...item,
      questions: item?.questions?.length,
      status: item.isFeatured ? 'Featured' : 'Draft',
      createdAt: item.createdAt.toLocaleString(ETimeFormat.dayFirstWithTime),
    }));
  } catch (e) {
    const { response, message } = e as AxiosError<ClientErrorResponse>;

    toast({
      title: 'Error',
      description: response?.data.message,
    });
    return [];
  }
};
