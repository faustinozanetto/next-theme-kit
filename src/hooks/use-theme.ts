import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';
import { ThemeActionTypeEnum, ThemeContextState } from '../types/theme.types';

/**
 * Hook that returns the theme context.
 * @returns The context if valid.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('Tried to use ThemeContext with no context avaiable!');

  const { state, dispatch } = context;
  const { theme } = state;

  const setTheme = (theme: ThemeContextState['theme']) => {
    dispatch({ type: ThemeActionTypeEnum.SET_THEME, payload: { theme } });
  };

  return { theme, setTheme };
};
