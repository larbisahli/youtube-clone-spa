import {
  ADD,
  REMOVE_ONE,
  REMOVE_ALL,
  PLAY,
  PLAY_NEXT,
  PLAY_PREV,
  QUEUE_REPLACE_LIST
} from "../actionTypes";

export const ADDInQueueAction = (obj) => {
  return {
    type: ADD,
    payload: obj,
  };
};

export const RemoveOneQueueAction = (videoId) => {
  return {
    type: REMOVE_ONE,
    payload: videoId,
  };
};

export const PlayQueueAction = (videoId) => {
  return {
    type: PLAY,
    payload: videoId,
  };
};

export const RemoveAllQueueAction = () => {
  return {
    type: REMOVE_ALL,
  };
};

export const PlayNextQueueAction = () => {
  return {
    type: PLAY_NEXT,
  };
};
export const PlayPrevQueueAction = () => {
  return {
    type: PLAY_PREV,
  };
};



export const Queue_Replace = (item_id, replace_id) => {
  return {
    type: QUEUE_REPLACE_LIST,
    payload: { item_id, replace_id }
  }
}