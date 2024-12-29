import React from 'react';
import Otp from './components/otp';

const OtpPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  return <Otp userId={searchParams?.userId} otp={searchParams?.otp} />;
};

export default OtpPage;
