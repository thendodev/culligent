import { toast } from '@/components/ui/use-toast';
import { TAuthResponse } from '@/global/types';
import { storeLoginCookiesUtil } from '@/lib/cookiesUtil';
import { publicRequest } from '@/lib/requests';
import { MUser } from '@/models/User';
import { TLogin } from '@/validations/auth';
import { AxiosError } from 'axios';

export enum EAuth {
  SIGN_IN = '/auth/login',
  SIGN_UP = 'SIGN_UP',
  CREATE_MAGIC_LINK = '/auth/create-magic-link',
  MAGIC_LINK_LOGIN = '/auth/magic-link',
  OTP = 'OTP',
  LINKEDIN = '/auth/linkedin',
}

export const loginHandler = async (userData: TLogin): Promise<MUser | void> => {
  try {
    const { data } = await publicRequest.post<TAuthResponse>(EAuth.SIGN_IN, {
      ...userData,
    });

    const { user, accessToken, refreshToken } = data;
    if (user.isVerified)
      storeLoginCookiesUtil({ accessToken, user, refreshToken });
    return user;
  } catch (e) {
    const { response, message, ...err } = e as AxiosError<any>;

    toast({
      title: 'Error',
      description: message,
    });
  }
};

export const createMagicLinkHandler = async (email: string): Promise<void> => {
  try {
    const res = await publicRequest.post(EAuth.CREATE_MAGIC_LINK, {
      email,
    });

    toast({
      title: 'Success',
      description: 'Email sent successfully',
    });
  } catch (e) {
    const { response } = e as AxiosError<any>;
    toast({
      title: 'Error',
      description: response?.data,
    });
  }
};
export const loginMagicLinkHandler = async (
  email: string,
  otp: string,
): Promise<MUser | void> => {
  try {
    const { data } = await publicRequest.post<TAuthResponse>(
      EAuth.MAGIC_LINK_LOGIN,
      {
        email,
        otp,
      },
    );
    const { user, accessToken, refreshToken } = data;
    if (user.isVerified)
      storeLoginCookiesUtil({ accessToken, user, refreshToken });

    toast({
      title: 'Success',
      description: 'Email sent successfully',
    });

    return user;
  } catch (e) {
    const { response } = e as AxiosError<any>;
    toast({
      title: 'Error',
      description: response?.data,
    });
  }
};

export const linkedinHandler = async (): Promise<MUser | void> => {
  try {
    const { data } = await publicRequest.get<TAuthResponse>(EAuth.LINKEDIN);

    const { user, accessToken, refreshToken } = data;
    if (user.isVerified)
      storeLoginCookiesUtil({ accessToken, user, refreshToken });
    return user;
  } catch (e) {
    const { response } = e as AxiosError<any>;
    toast({
      title: 'Error',
      description: response?.data,
    });
  }
};
