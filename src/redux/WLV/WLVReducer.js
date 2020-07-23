import { moveUp, moveDown, replace } from "../../utils";
import {
  WL_ADD_ITEM,
  LV_ADD_ITEM,
  WL_REMOVE_ONE,
  LV_REMOVE_ONE,
  WL_REMOVE_ALL,
  LV_REMOVE_ALL,
  WL_MOVEUP,
  WL_REPLACE,
  LV_REPLACE,
  PL_REPLACE,
  LV_MOVEUP,
  WL_MOVEDOWN,
  LV_MOVEDOWN,
  FETCH_PLAYLIST_REQUEST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from "../actionTypes";

const initialState = {
  WL: [
    {
      title: "React Native Tutorial for Beginners - Crash Course 2020",
      duration: "PT5H45M44S",
      videoId: "qSRrxpdMpVc",
      channelTitle: "Academind",
      channelId: "UCSJbGtTlrDami-tDGPUV9-w",
      thumbnail: "https://i.ytimg.com/vi/qSRrxpdMpVc/mqdefault.jpg",
    },
  ],
  LV: [
    {
      title: "The $1,000,000 Skill for Blockchain Developers",
      duration: "PT11M14S",
      videoId: "6nHExSfwIYo",
      channelTitle: "Dapp University",
      channelId: "UCY0xL8V6NzzFcwzHCgB8orQ",
      thumbnail:
        "https://i.ytimg.com/vi/6nHExSfwIYo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAOtqT5cphso-ZVjJtaMqLrZd6Ffw",
    },
  ],
  PlayList: {
    loading: true,
    items: [],
    itemCount: 0,
    error: "",
  },
};

const WLVReducer = (state = initialState, action) => {
  switch (action.type) {
    case WL_ADD_ITEM:
      return {
        ...state,
        WL: [
          ...state.WL,
          {
            title: action.payload.title,
            duration: action.payload.duration,
            videoId: action.payload.videoId,
            channelTitle: action.payload.channelTitle,
            channelId: action.payload.channelId,
            thumbnail: action.payload.thumbnail,
          },
        ],
      };
    case LV_ADD_ITEM:
      return {
        ...state,
        LV: [
          ...state.LV,
          {
            title: action.payload.title,
            duration: action.payload.duration,
            videoId: action.payload.videoId,
            channelTitle: action.payload.channelTitle,
            channelId: action.payload.channelId,
            thumbnail: action.payload.thumbnail,
          },
        ],
      };

    case WL_REMOVE_ONE:
      return {
        ...state,
        WL: [
          ...state.WL.filter((wl) => {
            return wl.videoId !== action.payload;
          }),
        ],
      };

    case LV_REMOVE_ONE:
      return {
        ...state,
        LV: [
          ...state.LV.filter((lv) => {
            return lv.videoId !== action.payload;
          }),
        ],
      };
    case WL_REMOVE_ALL:
      return {
        ...state,
        WL: [],
      };

    case LV_REMOVE_ALL:
      return {
        ...state,
        LV: [],
      };

    case WL_MOVEUP:
      return {
        ...state,
        WL: [...moveUp(state.WL, action.payload)],
      };
    case LV_MOVEUP:
      return {
        ...state,
        LV: [...moveUp(state.LV, action.payload)],
      };
    case WL_MOVEDOWN:
      return {
        ...state,
        WL: [...moveDown(state.WL, action.payload)],
      };
    case LV_MOVEDOWN:
      return {
        ...state,
        LV: [...moveDown(state.LV, action.payload)],
      };
    case FETCH_PLAYLIST_REQUEST:
      return {
        ...state,
        PlayList: {
          ...state,
          loading: true,
        },
      };
    case FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        PlayList: {
          loading: false,
          items: [...action.payload.items],
          itemCount: action.payload.count,
          error: "",
        },
      };
    case FETCH_PLAYLIST_FAILURE:
      return {
        ...state,
        PlayList: {
          loading: true,
          itemCount: 0,
          items: [],
          error: action.payload,
        },
      };
    case WL_REPLACE:
      return {
        ...state,
        WL: [...replace(state.WL, action.payload.item_id, action.payload.replace_id)],
      };
    case LV_REPLACE:
      return {
        ...state,
        LV: [...replace(state.LV, action.payload.item_id, action.payload.replace_id)],
      };
    case PL_REPLACE:
      return {
        ...state,
        PlayList: { ...state.PlayList, items: [...replace(state.PlayList.items, action.payload.item_id, action.payload.replace_id)] },
      };
    default:
      return state;
  }
};

export default WLVReducer;
