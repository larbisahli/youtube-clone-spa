import { API_KEY_INSERT } from "../actionTypes";

export const ApiKeyInsert = (key) => {
  return {
    type: API_KEY_INSERT,
    payload: key,
  };
};
