'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ProjectRoutes } from '@/global/routes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import penguinProfile from '@/assets/penguin-profile.svg';
import Image from 'next/image';
import { useAxiosInterceptors } from '@/hooks/useInterceptors';
import { TUser } from '@/validations/auth';
import { TWithId } from '@/global/types';

type ProfileMenuProps = {
  user: TWithId<TUser>;
};
const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const router = useRouter();
  useAxiosInterceptors();

  const logout = async () => {
    Cookies.remove('cruto-user');
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="h-[45px] w-[45px] bg-[var(--cruto-white)] rounded-full border border-[var(--cruto-off-white)]">
          <Image
            src={penguinProfile}
            objectFit="contain"
            alt="default profile"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          My Account
          <p className="text-sm text-gray-400">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/${ProjectRoutes.recruitment}/${user._id}/${ProjectRoutes.profile}/`}
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/${ProjectRoutes.recruitment}/${user._id}/${ProjectRoutes.account}/`}
            >
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/${ProjectRoutes.recruitment}/${user._id}/${ProjectRoutes.account}/`}
            >
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
