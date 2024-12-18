'use client';

import { useEffect, useState } from 'react';
import culligent from '@/public/logo/logo.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { resendOtpHandler, verifyOtpHandler } from '@/handlers/handleAccounts';
import { useRouter, useParams } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const OtpPage = () => {
  const router = useRouter();
  const { otp, user } = useParams<{ user: string; otp: string }>();
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

  //send the otp to the user's email on load if we have an email in the url
  useEffect(() => {
    if (!user || otp) return;
    resendOtpHandler(user);
  }, [user, otp]);

  const handleResendOtp = async () => {
    if (!user) return;
    await resendOtpHandler(user);
    setOtpResend(true);
  };

  useEffect(() => {
    const handleVerifyOtp = async ({ user, otp }: any) => {
      const isSuccessful = await verifyOtpHandler(otp, user);
      if (isSuccessful) return router.push('/');
    };
    if (user && enterOtp?.length === 4) {
      handleVerifyOtp({ user, otp: enterOtp });
    }
  }, [enterOtp, user, router]);

  return (
    <div className="w-full h-full flex flex-col-reverse sm:flex-row sm:items-center relative sm:static">
      <div className="w-full  h-full flex flex-col gap-2 justify-center items-center content-center bg-[var(--cruto-black)] ">
        <InputOTP maxLength={4} onChange={(value) => setEnterOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          variant="ghost"
          className="text-sm hover:text-[var(--cruto-green)] text-[var(--cruto-text-light)]"
          onClick={handleResendOtp}
          disabled={otpResend}
        >
          Resend
          {otpResend &&
            `(${new Date(resendTimer * 1000).toISOString().substr(14, 5)})`}
        </Button>
      </div>
      <div className="absolute sm:static top-[0%] z-[-1]  w-full h-[60%] sm:h-full flex justify-center items-center content-center">
        <Image src={culligent} alt="Enter OTP" objectFit="contain" />
      </div>
    </div>
  );
};

export default OtpPage;
