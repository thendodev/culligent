'use server';

import { toast } from '@/components/ui/use-toast';
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
      createdAt: new Date(item.createdAt).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    }));
  } catch {
    return [];
  }
};

export const getCaseHandler = async (id: string) => {
  try {
    const { data } = await privateRequest.get(`${ECaseRoutes.CASES}/${id}`);

    return {
      ...data,
      createdAt: new Date(data.createdAt).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
  } catch {}
};

export const updateCaseHandler = async (id: string, updatedCase: TCase) => {
  try {
    await privateRequest.put(`${ECaseRoutes.CASES}/${id}`, updatedCase);
    toast({ title: 'Case', description: 'Case updated' });
  } catch {}
};
export const deleteCaseHandler = async (id: string) => {
  try {
    await privateRequest.put(`${ECaseRoutes.CASES}/?id=${id}`, {});
    toast({ title: 'Case', description: 'Case updated' });
  } catch {}
};
