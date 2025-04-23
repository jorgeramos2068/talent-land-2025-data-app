import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Header } from '@/components/layout';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Providers } from '@/providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Data App',
  description: 'A data app for Talent Land 2025',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col text-base w-full">
            <Header />
            <div className="flex flex-1 flex-row flex-wrap">
              <main className="flex-1 h-[calc(100vh-4em)] px-8 py-5 w-full">{children}</main>
            </div>
          </div>
          <SonnerToaster richColors />
        </Providers>
      </body>
    </html>
  );
}
