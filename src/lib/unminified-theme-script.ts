import { ThemeContextScriptProps } from '../types/theme.types';

// This section contains the original code for the context script but not minfied. It basically removes all themes from classlist and tries to retrieve current theme from local storage and applies the theme.
{
  const { themes, defaultTheme, storageKey }: ThemeContextScriptProps = {
    themes: [''],
    defaultTheme: '',
    storageKey: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const UNMINIFIED_CODE = `
  !function () {
          try {
              const documentNode = document.documentElement;
              const themes = [${themes.map((theme) => `'${theme}'`).join(',')}];
  
              documentNode.classList.remove(...themes);
  
              const theme = localStorage.getItem('${storageKey}') ?? '${defaultTheme}';
              document.documentElement.classList.add(theme);
              documentNode.style.colorScheme = theme;
          } catch (e) {}
        }();
  `;
}
