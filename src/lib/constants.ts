import { ThemeContextState } from '../types/theme.types';

export const SYSTEM_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const DEFAULT_THEMES: ThemeContextState['themes'] = ['light', 'dark'];
export const DEFAULT_THEME: ThemeContextState['theme'] = 'light';
