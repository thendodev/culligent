'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import culligent from '@/public/logo/logo.svg';
import { loginMagicLinkHandler } from '@/handlers/handleAuth';
import { ProjectRoutes } from '@/global/routes';

const OtpPage = () => {
  const params = useSearchParams();
  const user = params.get('user');
  const otp = params.get('otp');

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
