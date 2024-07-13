import React from 'react';
import SearchBar from '../modules/search-bar';
import ProfileMenu from '../modules/profile-menu';
import { UserProps } from '@/models/User.types';
import { useUserServer } from '@/lib/useUserServer';
import { redirect } from 'next/navigation';
import LoadingBar from '@/app/(recruitment)/recruitment/components/loading-bar';

const NavBar = async () => {
  const user = await useUserServer();
  if (!user) return redirect('/');
  return (
    <>
      <div className="sticky top-0 bottom-0 z-10 w-full px-8 bg-white flex justify-between items-center mx-auto h-[70px]">
        <SearchBar />
        <div className="flex items-center gap-5">
          <p>{user.email}</p>
          <ProfileMenu user={user} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
