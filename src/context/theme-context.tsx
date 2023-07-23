import React, { useEffect, useMemo, useReducer } from 'react';
import { ThemeActionTypeEnum, ThemeContextData, ThemeProviderProps } from '../types/theme.types';
import { reducer } from './reducer';
import { useMediaQuery } from '../hooks/use-media-query';
import { SYSTEM_MEDIA_QUERY } from '../lib/constants';

const initialState: ThemeContextData = {
  state: {
    theme: '',
    themes: [],
  },
  dispatch: () => {},
};

export const ThemeContext = React.createContext<ThemeContextData>(initialState);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children, useSystem } = props;

  const [state, dispatch] = useReducer(reducer, {
    ...initialState.state,
  });

  const systemPreference = useMediaQuery(SYSTEM_MEDIA_QUERY);

  // System prioritazion handling
  useEffect(() => {
    if (!useSystem) return;

    const systemTheme = systemPreference ? 'dark' : 'light';
    dispatch({
      type: ThemeActionTypeEnum.SET_THEME,
      payload: { theme: systemTheme },
    });
  }, [systemPreference]);

  const memoizedValue = useMemo(() => ({ state, dispatch }), [state]);

  return <ThemeContext.Provider value={memoizedValue}>{children}</ThemeContext.Provider>;
};
