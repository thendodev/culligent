'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MUser } from '@/models/User';
import { useRouter } from 'next/navigation';

export const useUserClientSide = () => {
  const [currentUser, setCurrentUser] = useState<MUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('currentUser')) return;
    const user = JSON.parse(Cookies.get('currentUser') as string);
    setCurrentUser(user);
  }, []);

  return { ...currentUser } as MUser;
};
