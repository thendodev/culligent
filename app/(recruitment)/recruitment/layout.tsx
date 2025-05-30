import type { Metadata } from 'next';
import '../../globals.css';
import SideBar from '@/components/layout/sidebar';
import { Toaster } from '@/components/ui/toaster';
import NavBar from '@/components/layout/nav-bar';
import AlertModal from '@/components/modules/alert-modal';
import Providers from '@/app/providers/query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSideBar from '@/components/layout/side-bar/app-sidebar';
import { cookies } from 'next/headers';
export const metadata: Metadata = {
  title: 'Culligent - Smart Recruitment',
  description: 'A.I Recruitment Partner',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html lang="en">
      <body className="bg-[var(--cruto-background)] min-w-screen min-h-screen">
        <SidebarProvider defaultOpen={defaultOpen}>
          <div className="flex flex-row w-full h-full">
            {/* <SideBar /> */}
            <div className="w-[60px] h-full">
              <AppSideBar />
            </div>

            <div className="w-full h-full flex flex-col">
              <Toaster />
              <AlertModal />
              <Providers>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </Providers>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
