import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "../actionTypes";

const initialState = {
  loading: true,
  items: [],
  error: { status: 0, message: "" },
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
        error: { status: 200, message: "" },
      };
    case FETCH_DATA_FAILURE:
      let message;
      if (
        typeof action.payload.data === "string" ||
        action.payload.data instanceof String
      ) {
        // it's a string
        message = action.payload.data;
      } // it's an object
      else {
        message = action.payload.data.error.message;
      }

      return {
        loading: true,
        items: [],
        error: {
          status: action.payload.status,
          message: message,
        },
      };

    default:
      return state;
  }
};

export default ApiCallReducer;
