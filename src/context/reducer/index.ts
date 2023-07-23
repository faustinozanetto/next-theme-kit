import { ThemeContextState, ThemeActions, ThemeActionTypeEnum } from '../../types/theme.types';

export const reducer = (state: ThemeContextState, action: ThemeActions): ThemeContextState => {
  switch (action.type) {
    case ThemeActionTypeEnum.SET_THEME: {
      return {
        ...state,
        theme: action.payload.theme,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
