import React, { useState, createContext, useEffect } from "react";
import { getMostPopularVideos } from "../Components/api/YoutubeApi";

//
export const ApiContext = createContext();

// Creating a global variable to hold all api data
// and then store it in a state to only render once.
let PopularVideosArray = [];

export const ApiProvider = (props) => {
  // API Collector State
  const [PopularVideos, setPopularVideos] = useState([]);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // error message
  const [errorMessage, setErrorMessage] = useState(false);

  // ===========================
  //  FETCH MOST POPULAR VIDEOS
  // ===========================
  useEffect(() => {
    setIsLoading(true);
    getMostPopularVideos()
      .then((data) => {
        data.items.map((res) => {
          return (PopularVideosArray = [
            ...PopularVideosArray,
            {
              thumbnail:
                "maxres" in res.snippet.thumbnails
                  ? res.snippet.thumbnails.maxres.url
                  : res.snippet.thumbnails.medium.url,
              channelTitle: res.snippet.channelTitle,
              channelId: res.snippet.channelId,
              videoId: res.id,
              publishedAt: res.snippet.publishedAt,
              viewCount: res.statistics.viewCount,
              title: res.snippet.localized.title,
              duration: res.contentDetails.duration,
            },
          ]);
        });

        setPopularVideos([...PopularVideosArray], setIsLoading(false));
        PopularVideosArray = [];
      })
      .catch((err) => {
        // Error Setup
        setErrorMessage(err);
        setIsLoading(true);
      });
  }, []);

  return (
    <ApiContext.Provider value={[PopularVideos, isLoading, errorMessage]}>
      {props.children}
    </ApiContext.Provider>
  );
};
