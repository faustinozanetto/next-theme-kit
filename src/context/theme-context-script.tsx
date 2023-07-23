import React, { memo } from 'react';
import { ThemeContextScriptProps } from '../types/theme.types';

export const ThemeContextScript = memo(
  (props: ThemeContextScriptProps) => {
    const { defaultTheme, themes, storageKey } = props;

    const source = (() => `
    !function (){try{let e=document.documentElement,t=[${themes
      .map((e) => `'${e}'`)
      .join(
        ',',
      )}];e.classList.remove(...t);let m=localStorage.getItem('${storageKey}') ?? '${defaultTheme}';document.documentElement.classList.add(m);e.style.colorScheme=m;}catch(m){}}()
  `)();

    // eslint-disable-next-line react/no-danger
    return <script dangerouslySetInnerHTML={{ __html: source }} />;
  },
  () => true,
);
