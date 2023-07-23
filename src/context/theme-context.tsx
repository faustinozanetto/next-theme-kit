import React, { useMemo, useReducer } from 'react';
import { ThemeContextData, ThemeProviderProps } from '../types/theme.types';
import { reducer } from './reducer';

const initialState: ThemeContextData = {
  state: {
    theme: '',
    themes: [],
  },
  dispatch: () => {},
};

export const ThemeContext = React.createContext<ThemeContextData>(initialState);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    ...initialState.state,
  });

  const value = useMemo(() => ({ state, dispatch }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
