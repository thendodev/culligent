import { cookies } from 'next/headers';
import { EUserCookies } from '@/global/config';
import { TUser } from '@/validations/auth';
import { TWithId } from '@/global/types';

export const useUserServer = async () => {
  if (!cookies().get(EUserCookies.user)) return null;
  const currentUser = JSON.parse(
    cookies().get(EUserCookies.user)?.value as string,
  ) as TWithId<TUser>;

  return currentUser;
};
