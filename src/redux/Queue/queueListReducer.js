import {
  ADD,
  REMOVE_ONE,
  REMOVE_ALL,
  PLAY,
  PLAY_NEXT,
  PLAY_PREV,
  QUEUE_REPLACE_LIST
} from "../actionTypes";
import { replace } from "../../utils";


const initialState = [];

const queueListReducer = (state = initialState, action) => {
  let index = 0;

  if (action.type === PLAY_NEXT || action.type === PLAY_PREV) {
    if (state.length !== 0) {
      try {
        index = state.filter((plv) => {
          return plv.playing;
        })[0].index;
      } catch (error) {
        console.log("queueListReducer-Error :>> ", error);
      }
    }
  }

  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          title: action.payload.title,
          duration: action.payload.duration,
          videoId: action.payload.videoId,
          channelTitle: action.payload.channelTitle,
          channelId: action.payload.channelId,
          thumbnail: action.payload.thumbnail,
          playing: action.payload.playing,
          index: action.payload.index,
        },
      ];

    case REMOVE_ONE:
      return state.filter((wl) => {
        return wl.videoId !== action.payload;
      });
    case REMOVE_ALL:
      return (state = []);

    case PLAY:
      return state.map((plv) => {
        plv.playing = false;
        if (plv.videoId === action.payload) {
          plv.playing = true;
        }
        return plv;
      });

    case PLAY_NEXT:
      if (index !== state.length - 1) {
        return state.map((plv) => {
          plv.playing = false;
          if (plv.index === index + 1) {
            plv.playing = !plv.playing;
          }
          return plv;
        });
      } else {
        return state;
      }

    case PLAY_PREV:
      if (index !== 0) {
        return state.map((plv) => {
          plv.playing = false;
          if (plv.index === index - 1) {
            plv.playing = !plv.playing;
          }
          return plv;
        });
      } else {
        return state;
      }
    case QUEUE_REPLACE_LIST:
      return [...replace(state, action.payload.item_id, action.payload.replace_id)]
    default:
      return state;
  }
};

export default queueListReducer;
