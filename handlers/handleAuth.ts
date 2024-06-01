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
  FORGOT_PASSWORD = '/auth/forgot-password',
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

export const forgotPasswordHandler = async (email: string): Promise<void> => {
  try {
    await publicRequest.post(EAuth.FORGOT_PASSWORD, {
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
