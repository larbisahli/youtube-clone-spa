import { API_KEY_INSERT } from "../actionTypes";

const initialState = {
  isKey: false,
  key: "",
};

export const ApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_KEY_INSERT:
      return {
        isKey: true,
        key: action.payload,
      };

    default:
      return state;
  }
};

export default ApiKeyReducer;
