import { toast } from '@/components/ui/use-toast';
import { TAuthResponse, TWithId } from '@/global/types';
import { storeLoginCookiesUtil } from '@/lib/cookiesUtil';
import { publicRequest } from '@/lib/requests';
import { TLogin, TUser } from '@/validations/auth';

export enum EAuth {
  SIGN_IN = '/auth/login',
  SIGN_UP = 'SIGN_UP',
  CREATE_MAGIC_LINK = '/auth/create-magic-link',
  MAGIC_LINK_LOGIN = '/auth/magic-link',
  OTP = 'OTP',
  LINKEDIN = '/auth/linkedin',
}

export const loginHandler = async (userData: TLogin): Promise<TUser | void> => {
  try {
    const { data } = await publicRequest.post<TAuthResponse>(EAuth.SIGN_IN, {
      ...userData,
    });
    const { user, accessToken, refreshToken } = data;
    if (user.isVerified)
      storeLoginCookiesUtil({ accessToken, user, refreshToken });
    return user;
  } catch {}
};

export const createMagicLinkHandler = async (email: string): Promise<void> => {
  await publicRequest.post(EAuth.CREATE_MAGIC_LINK, {
    email,
  });

  toast({
    title: 'Success',
    description: 'Email sent successfully',
  });
};
export const loginMagicLinkHandler = async (
  id: string,
  otp: string,
): Promise<TWithId<TUser> | void> => {
  const { data } = await publicRequest.put<TAuthResponse>(
    EAuth.MAGIC_LINK_LOGIN,
    {
      user: id,
      otp,
    },
  );
  const { user, accessToken, refreshToken } = data;
  if (!user.isVerified) return;
  storeLoginCookiesUtil({ accessToken, user, refreshToken });

  toast({
    title: 'Success',
    description: 'Login successful',
  });

  return user;
};

export const linkedinHandler = async (): Promise<TUser | void> => {
  try {
    const { data } = await publicRequest.get<TAuthResponse>(EAuth.LINKEDIN);

    const { user, accessToken, refreshToken } = data;
    if (user.isVerified)
      storeLoginCookiesUtil({ accessToken, user, refreshToken });
    return user;
  } catch {}
};
