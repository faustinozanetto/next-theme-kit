import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const interFont = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={interFont.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
