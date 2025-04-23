import { toast } from '@/components/ui/use-toast';
import { TWithId } from '@/global/types';
import { publicRequest } from '@/lib/requests';
import { TSignUp, TUser } from '@/validations/auth';

enum EAccountRoutes {
  sign_up = '/auth/sign-up',
  otp_verify = '/auth/otp',
}
export const emailSignUpHandler = async (newUser: TSignUp) => {
  try {
    const { data } = await publicRequest.post<TWithId<TUser>>(
      EAccountRoutes.sign_up,
      {
        ...newUser,
      },
    );

    return data;
  } catch (e) {
    return;
  }
};
export const resendOtpHandler = async (user: string) => {
  console.log(user);
  await publicRequest.post(EAccountRoutes.otp_verify, {
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
