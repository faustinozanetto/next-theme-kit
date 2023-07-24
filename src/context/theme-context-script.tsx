import React, { memo } from 'react';
import { ThemeContextScriptProps } from '../types/theme.types';
import { SYSTEM_MEDIA_QUERY } from '../lib/constants';

export const ThemeContextScript = memo(
  (props: ThemeContextScriptProps) => {
    const { themes, storageKey, useSystem, useColorScheme, useLocalStorage, defaultTheme } = props;

    const source = (() => `
      !function () {
        try {
          const documentNode = document.documentElement;
          const themes = [${themes.map((theme) => `'${theme}'`).join(',')}];
          documentNode.classList.remove(...themes);

          const localValue = localStorage.getItem('${storageKey}');
          if (!localValue) {
            localStorage.setItem('${storageKey}', ${defaultTheme});
            document.classList.add(${defaultTheme});
            return;
          }

          let theme = ${useLocalStorage} ? localValue : ${defaultTheme};
          document.documentElement.classList.add(theme);

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
