'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAxiosInterceptors } from '@/hooks/useInterceptors';
import { TUser } from '@/validations/auth';

interface IUser {
  user: TUser;
}

const SideBarFooter = ({ user }: IUser) => {
  const router = useRouter();
  const { isMobile } = useSidebar();
  useAxiosInterceptors();

  const logout = async () => {
    Cookies.remove('cruto-user');
    router.push('/');
  };
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <Avatar className="w-fit h-fit max-w-8 max-h-8 rounded-lg">
                  <AvatarFallback className="border border-[var(--cruto-border)] text-[var(--cruto-black)] w-8 h-8 rounded-lg">
                    {user?.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                {user?.email}
                <ChevronsUpDown className="ml-auto w-4 h-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={isMobile ? 'bottom' : 'right'}
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="end"
              sideOffset={14}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {' '}
                      {user?.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <span className="flex items-center">
                  <LogOut className="mr-1 h-4 w-4 flex-shrink-0" />
                  Sign out
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default SideBarFooter;
