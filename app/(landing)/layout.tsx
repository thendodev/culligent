import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Culligent - Smart recruitment',
  description: 'Join the A.I recruitment revolution',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
