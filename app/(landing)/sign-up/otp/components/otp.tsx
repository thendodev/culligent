'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { resendOtpHandler, verifyOtpHandler } from '@/handlers/handleAccounts';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';

interface IOtpProps {
  userId: string | undefined;
  otp: string | undefined;
}
const Otp = ({ userId, otp }: IOtpProps) => {
  const router = useRouter();

  const [resendTimer, setResendTimer] = useState(60);
  const [otpResend, setOtpResend] = useState(false);
  const [enterOtp, setEnterOtp] = useState(otp);

  useEffect(() => {
    //set up up timer for otp resend
    if (!otpResend) return;
    if (resendTimer === 0) {
      setResendTimer(60);
      setOtpResend(false);
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [otpResend, resendTimer]);

  //send the otp to the userId's email on load if we have an email in the url
  useEffect(() => {
    if (!userId || !otp) return;
    resendOtpHandler(userId);
  }, [userId, otp]);

  const handleResendOtp = async () => {
    if (!userId) return;
    await resendOtpHandler(userId);
    setOtpResend(true);
  };

  useEffect(() => {
    const handleVerifyOtp = async ({ userId, otp }: any) => {
      const isSuccessful = await verifyOtpHandler(otp, userId);
      if (isSuccessful) return router.push('/');
    };

    const userOtp = enterOtp ?? otp;

    if (userId && userOtp) {
      handleVerifyOtp({ userId, otp: enterOtp });
    }
  }, [enterOtp, userId, otp, router]);

  return (
    <div className="w-full  h-full flex flex-col gap-2 justify-center items-center content-center bg-[var(--cruto-black)] ">
      <InputOTP maxLength={4} onChange={(value) => setEnterOtp(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>

      <Button variant="ghost" onClick={handleResendOtp} disabled={otpResend}>
        Resend
        {otpResend && `(${new Date(resendTimer * 1000).toISOString()})`}
      </Button>
    </div>
  );
};

export default Otp;
