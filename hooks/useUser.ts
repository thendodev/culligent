'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { TUser } from '@/validations/auth';

export const useUserClientSide = () => {
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (!Cookies.get('currentUser')) return;
    const user = JSON.parse(Cookies.get('currentUser') as string);
    setCurrentUser(user);
  }, []);

  return { ...currentUser } as TUser;
};
