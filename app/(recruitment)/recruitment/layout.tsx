import type { Metadata } from 'next';
import '../../globals.css';
import { Work_Sans } from 'next/font/google';
import SideBar from '@/components/layout/sidebar';
import { redirect } from 'next/navigation';
import { useUserServer } from '@/lib/useUserServer';
import { Toaster } from '@/components/ui/toaster';
import NavBar from '@/components/layout/nav-bar';
const inter = Work_Sans({
  style: ['normal'],
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Recruto - AI recruitment platform',
  description: 'Your A.I recruiter to find the perfect candidates',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useUserServer();
  if (!user) return redirect('/');
  return (
    <html lang="en">
      <body className="bg-[var(--cruto-background)] min-w-screen min-h-screen">
        <div className="flex flex-row w-full h-full ">
          <div className="w-[60px]">
            <SideBar />
          </div>
          <div className="w-[calc(100%-80px)] h-full mx-auto flex flex-col">
            <NavBar />
            <Toaster />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
