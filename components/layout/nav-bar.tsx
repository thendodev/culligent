import React from 'react';
import SearchBar from '../modules/search-bar';
import ProfileMenu from '../modules/profile-menu';
import { useUserServer } from '@/lib/useUserServer';
import { redirect } from 'next/navigation';
import { SidebarTrigger } from '../ui/sidebar';

const NavBar = async () => {
  const user = await useUserServer();
  if (!user) return redirect('/');
  return (
    <>
      <div className="sticky top-0 bottom-0 z-10 w-full px-8 bg-sidebar flex justify-between items-center mx-auto h-[70px]">
        <SearchBar />
        <div className="flex items-center gap-5">
          <ProfileMenu user={user} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
