import { DARK_THEME, LIGHT_THEME } from "../actionTypes";

export const darken = () => {
  return {
    type: DARK_THEME,
  };
};
export const lighten = () => {
  return {
    type: LIGHT_THEME,
  };
};
