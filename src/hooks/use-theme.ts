import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';

/**
 * Use theme hook.
 * @returns An object with the theme and the setter.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('Tried to use ThemeContext with no context avaiable!');

  return context;
};
