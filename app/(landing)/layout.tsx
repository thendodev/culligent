import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { useUserServer } from '@/lib/useUserServer';
import { redirect } from 'next/navigation';
import { ProjectRoutes } from '@/global/routes';
import favi from '../../public/favicon_io/favicon.ico';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Culligent - AI recruitment platform',
  description: 'Join the A.I recruitment revolution',
  icons: {
    icon: '../../public/favicon_io/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useUserServer();
  if (user)
    return redirect(`${ProjectRoutes.recruitment}/${ProjectRoutes.dashboard}`);
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-[100%] h-[100dvh]">
          <div className="overflow-y-auto h-full w-full">
            <Toaster />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
