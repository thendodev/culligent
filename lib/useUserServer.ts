import User from '@/models/User';
import { cookies } from 'next/headers';
import { Dbconnect, Dbdisconnect } from './database/papr';

export const useUserServer = async () => {
  try {
    await Dbconnect();
    if (!cookies().get('cruto-user')) return null;
    const currentUser = JSON.parse(
      cookies().get('cruto-user')?.value as string,
    );
    const user = await User.findOne({ email: currentUser.email });
    if (!user) return null;
    return user;
  } catch (e) {
    return null;
  } finally {
    Dbdisconnect();
  }
};
