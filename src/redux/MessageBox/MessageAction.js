import { SET_MESSAGE, CLOSE_MESSAGE } from "../actionTypes";

export const SetMessageAction = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};

export const CloseMessageAction = () => {
  return {
    type: CLOSE_MESSAGE,
  };
};
