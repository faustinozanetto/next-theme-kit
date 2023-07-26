import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContextData, ThemeProviderProps } from '../types/theme.types';
import { useMediaQuery } from '../hooks/use-media-query';
import {
  DEFAULT_MODE,
  DEFAULT_STORAGE_KEY,
  DEFAULT_THEME,
  DEFAULT_THEMES,
  DEFAULT_USE_COLOR_SCHEME,
  DEFAULT_USE_LOCAL_STORAGE,
  DEFAULT_USE_SYSTEM,
  SYSTEM_MEDIA_QUERY,
  THEME_ATTRIBUTE_KEY,
} from '../lib/constants';
import { useLocalStorage as useLocalStorageHook } from '../hooks/use-local-storage';
import { ThemeContextScript } from './theme-context-script';

const initialState: ThemeContextData = {
  theme: DEFAULT_THEME,
  themes: DEFAULT_THEMES,
  setTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextData>(initialState);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const {
    children,
    useColorScheme = DEFAULT_USE_COLOR_SCHEME,
    useSystem = DEFAULT_USE_SYSTEM,
    useLocalStorage = DEFAULT_USE_LOCAL_STORAGE,
    storageKey = DEFAULT_STORAGE_KEY,
    themes = DEFAULT_THEMES,
    defaultTheme = DEFAULT_THEME,
    mode = DEFAULT_MODE,
  } = props;

  const [localStorageValue, setLocalStorageValue] = useLocalStorageHook(storageKey, defaultTheme);

  const systemPreference = useMediaQuery(SYSTEM_MEDIA_QUERY);

  const [themeState, setThemeState] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;

    return localStorageValue || defaultTheme;
  });

  /**
   * Basic function that gets the theme by the system preference.
   * @returns System theme
   */
  const getSystemTheme = () => (systemPreference ? 'dark' : 'light');

  /**
   * Main function that handles the theme setting and updating.
   */
  const setTheme = useCallback((theme: ThemeContextData['theme']) => {
    if (!theme) return;

    const updatedTheme = useSystem ? getSystemTheme() : theme;

    if (mode === 'class') {
      document.documentElement.classList.remove(...themes);
      document.documentElement.classList.add(updatedTheme);
    } else {
      document.documentElement.setAttribute(THEME_ATTRIBUTE_KEY, updatedTheme);
    }

    if (useColorScheme) document.documentElement.style.colorScheme = updatedTheme;

    if (useLocalStorage) setLocalStorageValue(updatedTheme);

    setThemeState(theme);
  }, []);

  // System prioritazion handling
  useEffect(() => {
    if (!useSystem) return;

    const theme = getSystemTheme();
    setTheme(theme);
  }, [systemPreference]);

  const memoizedValue = useMemo(() => ({ themes, theme: themeState, setTheme }), [themeState, setTheme]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      <ThemeContextScript
        defaultTheme={defaultTheme}
        themes={themes}
        storageKey={storageKey}
        useSystem={useSystem}
        useColorScheme={useColorScheme}
        useLocalStorage={useLocalStorage}
        mode={mode}
      />
      {children}
    </ThemeContext.Provider>
  );
};
