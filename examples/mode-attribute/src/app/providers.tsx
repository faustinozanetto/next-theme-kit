'use client';

import React from 'react';
import { ThemeProvider } from 'next-theme-kit';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider useLocalStorage useSystem={false} mode='attribute'>
      {children}
    </ThemeProvider>
  );
};
