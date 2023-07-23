import { ThemeProviderProps } from '../types/theme.types';

export const SYSTEM_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const DEFAULT_THEMES: NonNullable<ThemeProviderProps['themes']> = ['light', 'dark'];
export const DEFAULT_THEME: NonNullable<ThemeProviderProps['defaultTheme']> = 'light';
export const DEFAULT_USE_SYSTEM: NonNullable<ThemeProviderProps['useSystem']> = true;
export const DEFAULT_USE_COLOR_SCHEME: NonNullable<ThemeProviderProps['useColorScheme']> = true;
export const DEFAULT_USE_LOCAL_STORAGE: NonNullable<ThemeProviderProps['useLocalStorage']> = false;
export const DEFAULT_STORAGE_KEY: NonNullable<ThemeProviderProps['storageKey']> = 'theme';
