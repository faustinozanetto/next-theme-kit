import React from 'react';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider } from 'next-theme-kit';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider useLocalStorage useSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
