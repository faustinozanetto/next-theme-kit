'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-theme-kit';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-5xl font-extrabold'>🎨Next Theme Kit</h1>
      <h2 className='text-3xl font-medium'>Mode Attribute Example</h2>
      <span className='text-2xl font-semibold mb-2'>v0.1.7</span>
      Theme: {theme}
      <div className='flex gap-2 mt-2'>
        <button
          type='button'
          className='inline-flex items-center justify-center rounded-md font-medium bg-green-300 hover:bg-green-400 h-9 md:h-10 px-4 focus-visible:ring-green-400 dark:bg-green-800 dark:hover:bg-green-900 text-neutral-900 dark:text-neutral-50'
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        >
          Toggle theme
        </button>
        <button
          type='button'
          className='inline-flex items-center justify-center rounded-md font-medium bg-green-300 hover:bg-green-400 h-9 md:h-10 px-4 focus-visible:ring-green-400 dark:bg-green-800 dark:hover:bg-green-900 text-neutral-900 dark:text-neutral-50'
          onClick={() => {
            setTheme('special');
          }}
        >
          Special
        </button>
      </div>
    </main>
  );
}
