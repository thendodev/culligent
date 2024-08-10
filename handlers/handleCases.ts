import { toast } from '@/components/ui/use-toast';
import { dateFormat } from '@/global/config';
import { privateRequest } from '@/lib/requests';
import { TCase } from '@/models/Cases';

enum ECaseRoutes {
  CASES = '/recruitment/cases',
}

export const createCaseHandler = async (newCase: TCase) => {
  try {
    const { data } = await privateRequest.post(ECaseRoutes.CASES, newCase);
    if (!data) return;
    toast({ title: 'Case', description: 'Case created' });
  } catch {}
};

export const getCasesHandler = async () => {
  const { data } = await privateRequest.get(ECaseRoutes.CASES);
  //remap data to match the case column schema
  console.log(data);
  return data?.map((item: TCase) => ({
    ...item,
    questions: item?.questions?.length,
    status: item.isFeatured ? 'Featured' : 'Draft',
    createdAt: new Date(item.createdAt).toLocaleDateString('en-us', dateFormat),
  }));
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
