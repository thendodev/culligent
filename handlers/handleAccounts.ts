import { toast } from '@/components/ui/use-toast';
import { publicRequest } from '@/lib/requests';
import { TSignUp } from '@/validations/auth';

export const emailSignUphandler = async (newUser: TSignUp) => {
  try {
    const { data } = await publicRequest.post('auth/sign-up/', {
      ...newUser,
    });
    return data;
  } catch (e) {
    toast({
      title: 'Error',
      description: 'Please check your login credentials',
    });
  }
};

export const resendOtpHandler = async (email: string) => {
  try {
    await publicRequest.post('auth/otp', {
      email: email,
    });
    toast({
      title: 'OTP sent',
      description: 'Please check your email inbox or spam folder',
    });
  } catch (e) {
    toast({
      title: 'Error',
      description: 'Please try again or contact support',
    });
  }
};

export const verifyOtpHandler = async (otp: string, email: string) => {
  try {
    await publicRequest.put<any>('auth/otp', {
      otp: otp,
      email: email,
    });
    toast({
      title: 'OTP verified',
      description: 'OTP verified successfully',
    });
    return true;
  } catch (e) {
    console.log(e);
    toast({
      title: 'Error',
      description: 'Please try again or contact support',
    });
  }
};
