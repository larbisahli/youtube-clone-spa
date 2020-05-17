import { SHOW_QUEUE, HIDE_QUEUE } from "../actionTypes";

export const ShowQueueAction = () => {
  return {
    type: SHOW_QUEUE,
  };
};

export const HideQueueAction = () => {
  return {
    type: HIDE_QUEUE,
  };
};
