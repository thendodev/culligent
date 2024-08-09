import { toast } from '@/components/ui/use-toast';
import { publicRequest } from '@/lib/requests';
import { MUser } from '@/models/User';
import { TSignUp } from '@/validations/auth';

export const emailSignUphandler = async (newUser: TSignUp) => {
  const { data } = await publicRequest.post<MUser>('auth/sign-up/', {
    ...newUser,
  });
  toast({
    title: 'OTP verified',
    description: 'OTP verified successfully',
  });
  return data;
};
export const resendOtpHandler = async (user: string) => {
  await publicRequest.post('auth/otp', {
    user,
  });
  toast({
    title: 'OTP sent',
    description: 'Please check your email inbox or spam folder',
  });
};

export const verifyOtpHandler = async (otp: string, user: string) => {
  const { status } = await publicRequest.put<any>('auth/otp', {
    otp,
    user,
  });
  toast({
    title: 'OTP verified',
    description: 'OTP verified successfully',
  });
  return true;
};
