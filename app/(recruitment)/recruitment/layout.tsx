import type { Metadata } from 'next';
import '../../globals.css';
import SideBar from '@/components/layout/sidebar';
import { Toaster } from '@/components/ui/toaster';
import NavBar from '@/components/layout/nav-bar';
import AlertModal from '@/components/modules/alert-modal';
import Providers from '@/app/providers/query-provider';

export const metadata: Metadata = {
  title: 'Culligrant - AI Recruitment Platform',
  description: 'A.I Recruitment Partner',
  icons: {
    icon: '/public/favicon_io/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--cruto-background)] min-w-screen min-h-screen">
        <div className="flex flex-row w-full h-full">
          <div className="w-[60px]">
            <SideBar />
          </div>
          <div className="w-[calc(100%-60px)] h-full flex flex-col">
            <NavBar />
            <Toaster />
            <AlertModal />
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
