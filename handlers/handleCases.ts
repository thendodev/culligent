import { toast } from '@/components/ui/use-toast';
import { dateFormat } from '@/global/config';
import { TWithId } from '@/global/types';
import { privateRequest } from '@/lib/requests';
import { TCase } from '@/validations/cases';

enum ECaseRoutes {
  CASES = '/recruitment/cases',
}

export const createCaseHandler = async (newCase: TCase) => {
  await privateRequest.post(ECaseRoutes.CASES, newCase);
};

export const getCasesHandler = async (): Promise<TWithId<TCase>[] | null> => {
  const { data } = await privateRequest.get<TWithId<TCase>[]>(
    ECaseRoutes.CASES,
  );
  return data;
};

export const getCaseHandler = async (id: string) => {
  const { data } = await privateRequest.get<TWithId<TCase>>(
    `${ECaseRoutes.CASES}/${id}`,
  );
  return data;
};

export const updateCaseHandler = async (data: TWithId<TCase>) => {
  await privateRequest.put(`${ECaseRoutes.CASES}/${data._id}`, data);
};
export const deleteCaseHandler = async (id: string) => {
  await privateRequest.put(`${ECaseRoutes.CASES}/?id=${id}`, {});
};
