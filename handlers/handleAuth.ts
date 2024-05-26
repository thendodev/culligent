import { toast } from '@/components/ui/use-toast';
import { TAuthResponse } from '@/global/types';
import { storeLoginCookiesUtil } from '@/lib/cookiesUtil';
import { publicRequest } from '@/lib/requests';
import { MUser } from '@/models/User';
import { TLogin } from '@/validations/auth';
import { AxiosError } from 'axios';

export const loginHandler = async (userData: TLogin): Promise<MUser | void> => {
  try {
    const { data } = await publicRequest.post<TAuthResponse>('/auth/login', {
      ...userData,
    });

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

export const linkedinHandler = async (): Promise<MUser | void> => {
  try {
    const { data } = await publicRequest.get<TAuthResponse>('/auth/linkedin');

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
