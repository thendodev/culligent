import { toast } from '@/components/ui/use-toast';
import { ClientErrorResponse } from '@/global/response.types';
import { publicRequest } from '@/lib/requests';
import { MUser } from '@/models/User';
import { TSignUp } from '@/validations/auth';
import { AxiosError } from 'axios';

export const emailSignUphandler = async (newUser: TSignUp) => {
  try {
    const { data } = await publicRequest.post<MUser>('auth/sign-up/', {
      ...newUser,
    });
    return data;
  } catch (e) {
    const { response } = e as AxiosError<ClientErrorResponse>;
    toast({
      title: 'Error',
      description: response?.data.message,
    });
  }
};
export const resendOtpHandler = async (user: string) => {
  try {
    await publicRequest.post('auth/otp', {
      user,
    });
    toast({
      title: 'OTP sent',
      description: 'Please check your email inbox or spam folder',
    });
  } catch (e) {
    const { response } = e as AxiosError<ClientErrorResponse>;

    toast({
      title: 'Error',
      description: response?.data.message,
    });
  }
};

export const verifyOtpHandler = async (otp: string, user: string) => {
  try {
    await publicRequest.put<any>('auth/otp', {
      otp,
      user,
    });
    toast({
      title: 'OTP verified',
      description: 'OTP verified successfully',
    });
    return true;
  } catch (e) {
    const { response } = e as AxiosError<ClientErrorResponse>;
    toast({
      title: 'Error',
      description: response?.data.message,
    });
  }
};
