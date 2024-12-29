import React from 'react';
import Otp from './components/otp';
import culligent from '@/public/logo/logo.svg';
import Image from 'next/image';
const OtpPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  return (
    <div className="w-full h-full flex flex-col-reverse sm:flex-row sm:items-center relative sm:static">
      <Otp userId={searchParams?.userId} otp={searchParams?.otp} />
      <div className="absolute sm:static top-[0%] z-[-1]  w-full h-[60%] sm:h-full flex justify-center items-center content-center">
        <Image src={culligent} alt="Enter OTP" objectFit="contain" />
      </div>
    </div>
  );
};

export default OtpPage;
