import React, { useEffect, useMemo, useReducer } from 'react';
import { ThemeActionTypeEnum, ThemeContextData, ThemeProviderProps } from '../types/theme.types';
import { reducer } from './reducer';
import { useMediaQuery } from '../hooks/use-media-query';
import {
  DEFAULT_STORAGE_KEY,
  DEFAULT_THEME,
  DEFAULT_THEMES,
  DEFAULT_USE_COLOR_SCHEME,
  DEFAULT_USE_LOCAL_STORAGE,
  DEFAULT_USE_SYSTEM,
  SYSTEM_MEDIA_QUERY,
} from '../lib/constants';
import { useLocalStorage as useLocalStorageHook } from '../hooks/use-local-storage';

const initialState: ThemeContextData = {
  state: {
    theme: DEFAULT_THEME,
    themes: DEFAULT_THEMES,
  },
  dispatch: () => {},
};

export const ThemeContext = React.createContext<ThemeContextData>(initialState);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const {
    children,
    useColorScheme = DEFAULT_USE_COLOR_SCHEME,
    useSystem = DEFAULT_USE_SYSTEM,
    useLocalStorage = DEFAULT_USE_LOCAL_STORAGE,
    themes = DEFAULT_THEMES,
    defaultTheme = DEFAULT_THEME,
  } = props;

  const [localStorageValue, setLocalStorageValue] = useLocalStorageHook<string>(DEFAULT_STORAGE_KEY, defaultTheme);

  const systemPreference = useMediaQuery(SYSTEM_MEDIA_QUERY);

  const [state, dispatch] = useReducer(reducer, {
    themes,
    theme: useSystem ? (systemPreference ? 'dark' : 'light') : defaultTheme,
  });

  // Load theme from local storage if enabled
  useEffect(() => {
    if (!useLocalStorage) return;

    dispatch({
      type: ThemeActionTypeEnum.SET_THEME,
      payload: {
        theme: localStorageValue,
      },
    });
  }, []);

  // System prioritazion handling
  useEffect(() => {
    if (!useSystem) return;

    const systemTheme = systemPreference ? 'dark' : 'light';
    dispatch({
      type: ThemeActionTypeEnum.SET_THEME,
      payload: { theme: systemTheme },
    });
  }, [systemPreference]);

  // Handle theme changed
  useEffect(() => {
    const { theme } = state;

    // Remove the themes from the class list and add the new theme
    document.documentElement.classList.remove(...state.themes);
    if (theme) document.documentElement.classList.add(theme);

    if (useColorScheme) document.documentElement.style.colorScheme = theme;

    if (useLocalStorage) setLocalStorageValue(theme);
  }, [state.theme]);

  const memoizedValue = useMemo(() => ({ state, dispatch }), [state]);

  return <ThemeContext.Provider value={memoizedValue}>{children}</ThemeContext.Provider>;
};
