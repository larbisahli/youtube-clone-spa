import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "../actionTypes";

const initialState = {
  loading: true,
  items: [],
  error: "",
};

export const ApiCallReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        items: [...action.payload],
        error: "",
      };
    case FETCH_DATA_FAILURE:
      return {
        loading: true,
        items: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ApiCallReducer;
