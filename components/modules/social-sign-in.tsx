'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { LinkedinIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProjectRoutes } from '@/global/routes';
import { linkedinHandler } from '@/handlers/handle-auth';

const DASHBOARD = `${ProjectRoutes.recruitment}/${ProjectRoutes.dashboard}`;

const SocialSignIn = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        redirect: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLinkedinSignIn = async () => {
    await linkedinHandler();
  };

  return (
    <div className="w-[60%] sm:w-full mx-auto flex gap-2 content-center items-center justify-centerrounded-lg">
      <Button
        variant="outline"
        className="w-[100%] hover:text-[var(--cruto-green)]"
        onClick={handleGoogleSignIn}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-[100%] hover:text-[var(--cruto-green)]"
        onClick={handleLinkedinSignIn}
      >
        <LinkedinIcon className="mr-2 h-4 w-4" />
        Linkedin
      </Button>
    </div>
  );
};

export default SocialSignIn;
