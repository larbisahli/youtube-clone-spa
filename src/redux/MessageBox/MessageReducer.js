import { SET_MESSAGE, CLOSE_MESSAGE } from "../actionTypes";

const initialState = {
  show: false,
  message: "",
  btnText: "",
  from: "",
  id: "",
};

const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MESSAGE:
      return {
        ...state,
        show: false,
      };
    case SET_MESSAGE:
      return {
        show: true,
        message: action.payload.message,
        btnText: action.payload.btnText,
        from: action.payload.from,
        id: action.payload.id,
      };

    default:
      return state;
  }
};

export default MessageReducer;
