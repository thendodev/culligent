import React from 'react';
import SearchBar from '../modules/search-bar';
import ProfileMenu from '../modules/profile-menu';
import { UserProps } from '@/models/User.types';
import { useUserServer } from '@/lib/useUserServer';
import { redirect } from 'next/navigation';

type NavBarProps = {
  user: UserProps;
};
const NavBar = async () => {
  const user = await useUserServer();
  if (!user) return redirect('/');
  return (
    <div className="fixed z-10 w-[calc(100%-80px)] px-5 bg-white border-[var(--cruto-off-white)] flex justify-between items-center mx-auto  h-[70px] border-b-[1px] border-b-[var(--cruto-whitish)]">
      <SearchBar />
      <div className="flex items-center gap-5">
        <p>{user.email}</p>
        <ProfileMenu user={user} />
      </div>
    </div>
  );
};

export default NavBar;
