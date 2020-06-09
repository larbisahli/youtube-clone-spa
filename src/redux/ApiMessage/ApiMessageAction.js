import { SHOW_API_MESSAGE, HIDE_API_MESSAGE } from "../actionTypes";

export const ShowApiMessageAction = () => {
  return {
    type: SHOW_API_MESSAGE,
  };
};

export const HideApiMessageAction = () => {
  return {
    type: HIDE_API_MESSAGE,
  };
};
