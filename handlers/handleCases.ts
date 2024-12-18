import { toast } from '@/components/ui/use-toast';
import { dateFormat } from '@/global/config';
import { TWithId } from '@/global/types';
import { privateRequest } from '@/lib/requests';
import { TCase } from '@/validations/cases';

enum ECaseRoutes {
  CASES = '/recruitment/cases',
}

export const createCaseHandler = async (newCase: TCase) => {
  try {
    const { data } = await privateRequest.post(ECaseRoutes.CASES, newCase);
    if (!data) return;
    toast({ title: 'Case', description: 'Case created' });
  } catch {
    return null;
  }
};

export const getCasesHandler = async (): Promise<TWithId<TCase>[] | null> => {
  try {
    const { data } = await privateRequest.get<TWithId<TCase>[]>(
      ECaseRoutes.CASES,
    );
    return data;
  } catch {
    return null;
  }
};

export const getCaseHandler = async (id: string) => {
  const { data } = await privateRequest.get(`${ECaseRoutes.CASES}/${id}`);
  return {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleDateString('en-us', dateFormat),
  };
};

export const updateCaseHandler = async (id: string, updatedCase: TCase) => {
  try {
    const { status } = await privateRequest.put(
      `${ECaseRoutes.CASES}/${id}`,
      updatedCase,
    );
    if (status !== 200) return;
    toast({ title: 'Case', description: 'Case updated' });
  } catch {}
};
export const deleteCaseHandler = async (id: string) => {
  await privateRequest.put(`${ECaseRoutes.CASES}/?id=${id}`, {});

  toast({ title: 'Case', description: 'Case updated' });
};
