import React from 'react';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        payload: M[Key];
        type: Key;
      };
};

export enum ThemeActionTypeEnum {
  SET_THEME,
}

export type ThemePayload = {
  [ThemeActionTypeEnum.SET_THEME]: {
    theme: string;
  };
};

export type ThemeActions = ActionMap<ThemePayload>[keyof ActionMap<ThemePayload>];

export type ThemeContextState = {
  theme: string;
  themes: string[];
};

export type ThemeContextData = {
  dispatch: React.Dispatch<ThemeActions>;
  state: ThemeContextState;
};

export type ThemeProviderProps = {
  children?: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  themes?: string[];
  useColorScheme?: boolean;
  useSystem?: boolean;
};
