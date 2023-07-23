'use client';

import React from 'react';
import { useTheme } from 'next-theme-kit';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center dark:text-neutral-50 bg-neutral-50 text-neutral-900 dark:bg-neutral-900'>
      <h1 className='text-5xl font-extrabold'>Next Theme Kit</h1>
      <h2 className='text-3xl font-medium'>App Router Example</h2>
      Theme: {theme}
      <button
        type='button'
        className='inline-flex items-center justify-center rounded-md font-medium bg-green-300 hover:bg-green-400 h-9 md:h-10 px-4 focus-visible:ring-green-400 dark:bg-green-800 dark:hover:bg-green-900 text-neutral-900 dark:text-neutral-50'
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        Toggle theme
      </button>
    </main>
  );
}
