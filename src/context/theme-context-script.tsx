import React, { memo } from 'react';
import { ThemeContextScriptProps } from '../types/theme.types';
import { SYSTEM_MEDIA_QUERY, THEME_ATTRIBUTE_KEY } from '../lib/constants';

export const ThemeContextScript = memo(
  (props: ThemeContextScriptProps) => {
    const { themes, mode, storageKey, useSystem, useColorScheme, useLocalStorage, defaultTheme } = props;

    const source = (() => `
      !function () {
        try {
          const documentNode = document.documentElement;
          if ('${mode}' === 'class') {
            const themes = [${themes.map((theme) => `'${theme}'`).join(',')}];
            documentNode.classList.remove(...themes);
          }

          const localValue = localStorage.getItem('${storageKey}');
          if (!localValue) {
            localStorage.setItem('${storageKey}', ${defaultTheme});
            if ('${mode}' === 'class')
              document.classList.add(${defaultTheme});
            else document.documentElement.setAttribute('${THEME_ATTRIBUTE_KEY}', theme);
            return;
          }

          let theme = ${useLocalStorage} ? localValue : ${defaultTheme};
          if ('${mode}' === 'class')
            document.documentElement.classList.add(theme);
          else document.documentElement.setAttribute('${THEME_ATTRIBUTE_KEY}', theme);

          if (${useSystem})
            theme = window.matchMedia('${SYSTEM_MEDIA_QUERY}').matches ? 'dark' : 'light';

          if (${useColorScheme})
            documentNode.style.colorScheme = theme;
        } catch (e) {}
      }();
    `)();

    // eslint-disable-next-line react/no-danger
    return <script dangerouslySetInnerHTML={{ __html: source }} />;
  },
  () => true,
);
