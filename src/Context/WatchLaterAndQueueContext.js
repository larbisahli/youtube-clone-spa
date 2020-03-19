import React, { useState, createContext } from "react";

export const WatchLaterAndQueueContext = createContext();

export const WatchLaterAndQueueProvider = props => {
  // This state (this should be an API call)
  const [WatchLaterList, setWatchLaterList] = useState([
    {
      duration: "",
      videoId: "",
      channelTitle: "",
      channelId: ""
    }
  ]);

  const [QueueShow, setQueueShow] = useState(false);

  const [QueueList, setQueueList] = useState([
    {
      duration: "",
      videoId: "",
      channelTitle: "",
      channelId: "",
      play: false
    }
  ]);

  return (
    <WatchLaterAndQueueContext.Provider
      value={{
        WatchLaterState: [WatchLaterList, setWatchLaterList],
        QueueState: [QueueList, setQueueList],
        QueueShowState: [QueueShow, setQueueShow]
      }}
    >
      {props.children}
    </WatchLaterAndQueueContext.Provider>
  );
};
