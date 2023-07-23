import React, { useEffect, useMemo, useReducer } from 'react';
import { ThemeActionTypeEnum, ThemeContextData, ThemeProviderProps } from '../types/theme.types';
import { reducer } from './reducer';
import { useMediaQuery } from '../hooks/use-media-query';
import { DEFAULT_THEME, DEFAULT_THEMES, SYSTEM_MEDIA_QUERY } from '../lib/constants';

export const ThemeContext = React.createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children, themes = DEFAULT_THEMES, defaultTheme = DEFAULT_THEME, useSystem } = props;

  const systemPreference = useMediaQuery(SYSTEM_MEDIA_QUERY);

  const [state, dispatch] = useReducer(reducer, {
    themes,
    theme: useSystem ? (systemPreference ? 'dark' : 'light') : defaultTheme,
  });

  // System prioritazion handling
  useEffect(() => {
    if (!useSystem) return;

    const systemTheme = systemPreference ? 'dark' : 'light';
    dispatch({
      type: ThemeActionTypeEnum.SET_THEME,
      payload: { theme: systemTheme },
    });
  }, [systemPreference]);

  // Handle theme changes and remove old theme classes
  useEffect(() => {
    const { theme } = state;

    document.documentElement.classList.remove(...state.themes);

    if (theme) {
      document.documentElement.classList.add(theme);
    }

    document.documentElement.style.colorScheme = theme;
  }, [state.theme]);

  const memoizedValue = useMemo(() => ({ state, dispatch }), [state]);

  return <ThemeContext.Provider value={memoizedValue}>{children}</ThemeContext.Provider>;
};
