import React from 'react';

export type ThemeContextScriptProps = {
  defaultTheme: NonNullable<ThemeProviderProps['defaultTheme']>;
  storageKey: NonNullable<ThemeProviderProps['storageKey']>;
  themes: NonNullable<ThemeProviderProps['themes']>;
};

export type ThemeContextData = {
  /**
   * Theme update function.
   * @param theme New theme.
   * @returns Void
   */
  setTheme: (theme: string) => void;
  /** Current theme */
  theme: string;
  /** Available themes */
  themes: string[];
};

export type ThemeProviderProps = {
  children?: React.ReactNode;
  /** Optional: Default theme. Default: 'light' */
  defaultTheme?: string;
  /** Optional: Storage key. Default: 'theme' */
  storageKey?: string;
  /** Optional: Available themes. Default: '[light,  dark]' */
  themes?: string[];
  /** Optional: Use color scheme. Default: 'true' */
  useColorScheme?: boolean;
  /** Optional: Use locale storage. Default: 'false' */
  useLocalStorage?: boolean;
  /** Optional: Use system. Default: 'true' */
  useSystem?: boolean;
};
