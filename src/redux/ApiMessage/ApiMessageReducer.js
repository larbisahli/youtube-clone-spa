import { SHOW_API_MESSAGE, HIDE_API_MESSAGE } from "../actionTypes";

const initialState = false;

export const ApiMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_API_MESSAGE:
      return true;

    case HIDE_API_MESSAGE:
      return false;
    default:
      return state;
  }
};

export default ApiMessageReducer;
