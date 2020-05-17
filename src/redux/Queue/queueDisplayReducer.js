import { SHOW_QUEUE, HIDE_QUEUE } from "../actionTypes";

const initialState = false;

const DisplayQueueReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_QUEUE:
      return true;
    case HIDE_QUEUE:
      return false;
    default:
      return state;
  }
};

export default DisplayQueueReducer;
