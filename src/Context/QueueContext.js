import React, { useState, createContext, useReducer } from "react";

export const QueueContext = createContext();

function Queue_reducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          title: action.title,
          duration: action.duration,
          videoId: action.videoId,
          channelTitle: action.channelTitle,
          channelId: action.channelId,
          thumbnail: action.thumbnail,
          playing: action.playing,
          index: action.index
        }
      ];
    case "removeOne":
      return state.filter(wl => {
        return wl.videoId !== action.videoId;
      });
    case "removeAll":
      return (state = []);

    case "play":
      return state.map(plv => {
        plv.playing = false;
        if (plv.videoId === action.videoId) {
          plv.playing = true;
        }
        return plv;
      });

    case "play_next":
      if (action.index !== state.length - 1) {
        return state.map(plv => {
          plv.playing = false;
          if (plv.index === action.index + 1) {
            plv.playing = !plv.playing;
          }
          return plv;
        });
      } else {
        return state;
      }

    case "play_prev":
      if (action.index !== 0) {
        return state.map(plv => {
          plv.playing = false;
          if (plv.index === action.index - 1) {
            plv.playing = !plv.playing;
          }
          return plv;
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}

export const QueueProvider = props => {
  // This state (this should be an API call)

  const [ShowQueue, setShowQueue] = useState(false);

  const [QueueList, QueueListDispatch] = useReducer(Queue_reducer, []);

  return (
    <QueueContext.Provider
      value={{
        QueueState: [QueueList, QueueListDispatch],
        ShowQueueState: [ShowQueue, setShowQueue]
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
};
