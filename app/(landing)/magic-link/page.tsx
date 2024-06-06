'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { verifyOtpHandler } from '@/handlers/handleAccounts';
import { useParams, useRouter } from 'next/navigation';
import culligent from '@/public/logo/logo.svg';
import { loginMagicLinkHandler } from '@/handlers/handleAuth';
import { ProjectRoutes } from '@/global/routes';

const OtpPage = () => {
  const { email, otp } = useParams<{ email: string; otp: string }>();

  const router = useRouter();

  //send the otp to the user's email on load if we have an email in the url

  useEffect(() => {
    const handleMagicLink = async () => {
      const user = await loginMagicLinkHandler(otp, email);
      if (!user) return router.push('/');

      if (user && !user.isVerified) {
        router.push(`${ProjectRoutes.sign_up}/otp?email=${user.email}`);
      }

      router.push(`/`);
    };

    handleMagicLink();
  }, [router, otp, email]);

  return (
    <div className="h-full w-full flex-1 sm:flex">
      <Image
        src={culligent}
        alt="logo"
        fill
        objectFit="contain"
        className="backdrop-filter backdrop-blur-[10px] w-full h-full"
      />
    </div>
  );
};

export default OtpPage;
