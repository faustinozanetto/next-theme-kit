import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';
import { ThemeContextData } from '../types/theme.types';

/**
 * Use theme hook.
 * @returns An object with the theme and the setter.
 */
export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('Tried to use ThemeContext with no context avaiable!');

  return context;
};
