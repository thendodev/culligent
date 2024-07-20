import { toast } from '@/components/ui/use-toast';

import { privateRequest } from '@/lib/requests';
import { MCase } from '@/models/Cases';
import { TCase } from '@/validations/cases';

enum ECaseRoutes {
  CASES = 'recruitment/cases',
}

export const createCaseHandler = async (newCase: TCase) => {
  const { data } = await privateRequest.post(ECaseRoutes.CASES, newCase);
  if (!data) return;
  toast({ title: 'Case', description: 'Case created' });
};

export const getCasesHandler = async () => {
  const { data } = await privateRequest.get(ECaseRoutes.CASES);
  if (!data) return [];
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
};

export const getCaseHandler = async (id: string) => {
  const { data } = await privateRequest.get(`${ECaseRoutes.CASES}/${id}`);
  if (!data) return;
  return {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  };
};

export const updateCaseHandler = async (id: string, updatedCase: TCase) => {
  const { status } = await privateRequest.put(
    `${ECaseRoutes.CASES}/${id}`,
    updatedCase,
  );
  if (status !== 200) return;
  toast({ title: 'Case', description: 'Case updated' });
};
export const deleteCaseHandler = async (id: string) => {
  await privateRequest.put(`${ECaseRoutes.CASES}/?id=${id}`, {});

  toast({ title: 'Case', description: 'Case updated' });
};
