import React, { useReducer, createContext } from "react";
import { moveUp, moveDown } from "../config";

export const WLVContext = createContext();

function WatchLater_reducer(state, action) {
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
          thumbnail: action.thumbnail
        }
      ];
    case "removeOne":
      return state.filter(wl => {
        return wl.videoId !== action.videoId;
      });
    case "removeAll":
      return (state = []);
    case "moveUp":
      return moveUp(state, action.index);
    case "moveDown":
      return moveDown(state, action.index);
    default:
      return state;
  }
}

export const WLVProvider = props => {
  // This state (this should be an API call)
  const [WatchLaterList, WLdispatch] = useReducer(WatchLater_reducer, [
    {
      title: "React Native Tutorial for Beginners - Crash Course 2020",
      duration: "PT5H45M44S",
      videoId: "qSRrxpdMpVc",
      channelTitle: "Academind",
      channelId: "UCSJbGtTlrDami-tDGPUV9-w",
      thumbnail: "https://i.ytimg.com/vi/qSRrxpdMpVc/mqdefault.jpg"
    }
  ]);

  // Liked videos state

  return (
    <WLVContext.Provider
      value={{
        WatchLaterState: [WatchLaterList, WLdispatch]
      }}
    >
      {props.children}
    </WLVContext.Provider>
  );
};
