# 🎨 Next Theme Kit - Theme Management for Next.js

[next-theme-kit](https://www.npmjs.com/package/next-theme-kit) is a powerful and easy-to-use wrapper for handling dark and light themes in your Next.js applications. Elevate your user experience with stunning themes and effortless style!

## Features 🎨

- 🌗 Dark and Light Themes: Switch between dark and light themes effortlessly.
- 🎨 Custom Themes: Define your own custom themes.
- 🌈 System Color Scheme Priority: Prioritize system color scheme for automatic theme switching.
- 💾 LocalStorage Support: Remember user's theme preference across sessions.
- ⚡️ SSR and SSG Compatibility: Works seamlessly with server-side rendering (SSR) and static site generation (SSG).
- 📷 Flash Free: No theme flashing tanks to a custom script to prevent this issue.

## 🚀 Live Preview

You can check out the Live Preview of Next Theme Kit to see it in action!

### Pages Router

You can check out the [Live Preview](https://next-theme-kit-pages-router.vercel.app) with Pages Router of Next Theme Kit to see it in action!

### App Router

You can also explore the [Live Preview](https://next-theme-kit-app-router.vercel.app) with App Router of Next Theme Kit to see it in action!

### Attribute Mode

You can check out the [Live Preview](https://next-theme-kit-attribute-example.vercel.app/) with the Attribute Mode of Next Theme kit in action!.

## 📦 Installation

To install next-theme-kit, simply use npm:

```bash
npm install next-theme-kit
```

Or with yarn:

```bash
yarn add next-theme-kit
```

## 🧪 Usage

### With App Router

To integrate next-theme-kit onto a NextJS project that uses the app router, we need to use a workaround for adding React Context onto the `layout.tsx` of our project. To do this we need to create a [`providers.tsx`](https://nextjs.org/docs/getting-started/react-essentials#rendering-third-party-context-providers-in-server-components) file in our app directory as follows:

```tsx
// app/providers.tsx
'use client';

import React from 'react';
import { ThemeProvider } from 'next-theme-kit';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return <ThemeProvider>{children}</ThemeProvider>;
};
```

Once we have created this file we can use it to wrap our children in the app layout file.

```tsx
// app/layout.tsx
import React from 'react';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### With Pages Router

To integrate next-theme-kit onto a NextJS project that uses the pages router, simply wrap your `_app.tsx` with the `ThemeProvider`.

```tsx
// pages/_app.tsx
import React from 'react';

import type { AppProps } from 'next/app';

import { ThemeProvider } from 'next-theme-kit';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### 🪝 Theme Hook

The following code shows an example of using the `useTheme` hook in a NextJs application:

```tsx
'use client';

import React, { useEffect, useState } from 'react';

import { useTheme } from 'next-theme-kit';

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='flex flex-col items-center justify-center'>
      Theme: {theme}
      <button
        type='button'
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        Toggle theme
      </button>
    </div>
  );
}
```

## 🎆 Examples

Check out the [examples](./examples/) directory to see how you can implement next-theme-kit in your Next.js projects!

## ⏲️ API

### ThemeProvider

Below is the api description of both the **ThemeProvider** and the **useTheme** hook.

- `defaultTheme?: string`: **Optional** - The default theme to be used if no theme is specified. Defaults to **'light'**.
- `mode?: 'class' | 'attribute'`: **Optional** - Theme mode, can be set to 'class' or 'attribute'. If attribute is enabled, the attribute is **'data-theme'**. Defaults to **'class'**.
- `storageKey?: string`: **Optional** - The key used for storing the theme in local storage. Defaults to **theme**.
- `themes?: string[]`: **Optional** - An array of available themes for the application. Defaults to **['dark', 'light']**.
- `useColorScheme?: boolean`: **Optional** - Whether to use the color scheme for the theme. Defaults to **true**.
- `useLocalStorage?: boolean`: **Optional** - Whether to use local storage to save the theme. Defaults to **false**.
- `useSystem?: boolean`: **Optional** - Whether to use the system's preferred color scheme. Defaults to **true**.

## useTheme

- `setTheme(theme: string): void`: A function that allows you to update the current theme of the application.
- `theme: string | undefined`: Represents the current theme of the application.
- `themes: string[]`: An array containing the available themes that can be used in the application.

## 🤝 Contributing

We welcome contributions and feedback! Feel free to open issues and submit pull requests.

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).
