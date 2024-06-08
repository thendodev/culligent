'use client';

import React, { useEffect } from 'react';
import EnterOtpPic from '@/assets/Enter-OTP-bro.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { resendOtpHandler, verifyOtpHandler } from '@/handlers/handleAccounts';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const OtpPage = () => {
  const otp = useSearchParams().get('otp');
  const user = useSearchParams().get('user');
  const [resendTimer, setResendTimer] = React.useState(60);
  const [otpResend, setOtpResend] = React.useState(false);
  const [enterOtp, setEnterOtp] = React.useState(otp);

  const router = useRouter();

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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-full flex flex-col-reverse sm:flex-row sm:items-center relative sm:static">
        <div className="w-full  h-[48%] flex flex-col gap-2 justify-center items-center content-center bg-[var(--cruto-white)] rounded-t-[1rem]">
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
            className="text-sm text-[var(--cruto-green)] hover:text-[var(--cruto-black)]"
            onClick={handleResendOtp}
          >
            Resend OTP
            {otpResend &&
              `(${new Date(resendTimer * 1000).toISOString().substr(14, 5)})`}
          </Button>
        </div>
        <div className="absolute sm:static top-[0%] z-[-1]  w-full h-[60%] sm:h-full flex justify-center items-center content-center">
          <Image src={EnterOtpPic} alt="Enter OTP" objectFit="contain" />
        </div>
      </div>
    </Suspense>
  );
};

export default OtpPage;
