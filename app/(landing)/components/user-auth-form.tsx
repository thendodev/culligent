'use client';

import Link from 'next/link';
import MagicLink from './magic-link';
import SignIn from './sign-in';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';

const UserAuthForm = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div className="relative overflow-hidden w-full flex flex-col gap-5 sm:border bg-[var(--cruto-foreground)] border-[var(--cruto-border)] rounded-[0.5rem] p-5">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: showForgotPassword ? 0 : 1,
          x: showForgotPassword ? -50 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <SignIn />
      </motion.div>

      <motion.div
        className="p-6 absolute top-0 left-0 right-0"
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: showForgotPassword ? 1 : 0,
          x: showForgotPassword ? 0 : '100%',
        }}
        transition={{ duration: 0.3 }}
      >
        <MagicLink />
      </motion.div>
      <div className="w-full flex gap-2 justify-center items-center text-center text-sm text-[color:var(--cruto-black)]">
        <Link className=" hover:text-[var(--cruto-green)]" href={'/sign-up'}>
          Sign up
        </Link>
        |
        <Button
          isLoading
          onClick={toggleForgotPassword}
          variant="ghost"
          className=" hover:text-[var(--cruto-green)] w-fit m-0 p-0"
        >
          {showForgotPassword ? 'Back to Sign In' : 'Forgot Password'}
        </Button>
      </div>
    </div>
  );
};

export default UserAuthForm;
