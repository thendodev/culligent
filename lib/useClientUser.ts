import { TWithId } from '@/global/types';
import { TUser } from '@/validations/auth';
import Cookies from 'js-cookie';

export const useUser = () => {
  if (!Cookies.get('cruto-user')) return null;
  const currentUser = Cookies.get('cruto-user');
  if (!currentUser) return null;
  const user = JSON.parse(currentUser) as TWithId<TUser>;
  return user;
};
