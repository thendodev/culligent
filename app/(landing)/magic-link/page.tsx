'use client';

import React, { Suspense, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import culligent from '@/public/logo/logo.svg';
import { loginMagicLinkHandler } from '@/handlers/handle-auth';
import { ProjectRoutes } from '@/global/routes';

const OtpPage = () => {
  const { user, otp } = useParams<{ user: string; otp: string }>();

  const router = useRouter();

  //send the otp to the user's email on load if we have an email in the url

  useEffect(() => {
    const handleMagicLink = async () => {
      if (!user || !otp) return;
      const data = await loginMagicLinkHandler(user, otp);

      if (data && !data.isVerified) {
        router.push(`${ProjectRoutes.sign_up}/otp?user=${data._id}`);
      }

      router.push(`${ProjectRoutes.recruitment}/${ProjectRoutes.dashboard}`);
    };

    handleMagicLink();
  }, [router, otp, user]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-full w-full flex-1 sm:flex">
        <Image
          src={culligent}
          alt="logo"
          fill
          objectFit="contain"
          className="backdrop-filter backdrop-blur-[10px] w-full h-full"
        />
      </div>
    </Suspense>
  );
};

export default OtpPage;
