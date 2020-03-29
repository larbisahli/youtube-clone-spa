import React, { useEffect, useState, useCallback, useContext } from "react";
import "./Sass/home_style.scss";
import { HomeVideoContainer } from "../Components";
import { YouTubeAPI } from "../Components/api/YoutubeApi";
import { HomeSkeleton, MessageBox } from "../Components";
import { UrlLocationContext } from "../Context/UrlLocationContext";
import { UrlLocation } from "../config";

// Creating a global variable to hold all api looped data
// and then store it in a state to only render once.

let PopularVideosArray = [];

const Home = React.memo(() => {
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // API Collector State
  const [PopularVideos, setPopularVideos] = useState([]);

  // Message Error State
  const [
    { show, message, btnMessage, isError },
    setShowErrorMessage
  ] = useState({
    show: false,
    message: "",
    btnMessage: "",
    isError: false
  });

  // ===========================
  //  Handle Location Context
  // ===========================
  const [UrlLocationState, setUrlLocationState] = useContext(
    UrlLocationContext
  );

  useEffect(() => {
    // home location set to true
    const UrlLoc = UrlLocation(true);
    if (UrlLoc !== UrlLocationState) {
      setUrlLocationState(() => UrlLoc);
    }
  }, []);

  // ===========================
  //  FETCH MOST POPULAR VIDEOS
  // ===========================
  const PopularVideosRequest = async () => {
    setIsLoading(true);
    YouTubeAPI.get("videos", {
      params: {
        part: "snippet,statistics,contentDetails",
        maxResults: 3,
        chart: "mostPopular",
        key: process.env.REACT_APP_YOUTUBE_API_KEY
      }
    })
      .then(res => {
        res.data.items.map(res => {
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
              duration: res.contentDetails.duration
            }
          ]);
        });

        setPopularVideos([...PopularVideosArray], setIsLoading(false));
        PopularVideosArray = [];
      })
      .catch(err => {
        // Error Setup
        setShowErrorMessage({
          show: true,
          message: `${err}`,
          btnMessage: "dismiss",
          isError: true
        });
        setIsLoading(true);
      });
  };

  // ====================================
  //           Error Handling
  // ====================================

  const HandleClosingMessageBox = useCallback(() => {
    // Just to make sure isError will not
    // change to false by any chance before doing some logic if true
    try {
      if (isError) {
      }
    } finally {
      setShowErrorMessage(pre => {
        return {
          show: false,
          message: pre.message,
          btnMessage: pre.btnMessage,
          isError: false
        };
      });
    }
  }, [isError]);

  const HandleShowMessageBox = useCallback(
    watchLater => {
      setShowErrorMessage({
        show: true,
        message: !watchLater
          ? "Saved to Watch later"
          : "Removed from Watch later",
        btnMessage: "UNDO",
        isError: false
      });

      setTimeout(() => {
        HandleClosingMessageBox();
      }, 4000);
    },
    [HandleClosingMessageBox]
  );

  useEffect(() => {
    PopularVideosRequest();
  }, []);

  return (
    <div id="hvc" className="home_container">
      <div className="hcontentwrap">
        <div className="home_title_container">
          <span className="home_title">Most Popular</span>
        </div>
        <div className="homevideowrapper">
          {isLoading
            ? [...Array(8)].map((e, i) => {
                return <HomeSkeleton key={i} />;
              })
            : PopularVideos.map((PopularVideo, index) => {
                return (
                  <HomeVideoContainer
                    key={index}
                    index={index}
                    PopularVideo={PopularVideo}
                    HandleShowMessageBox={HandleShowMessageBox}
                    PopularVideos={PopularVideos}
                  />
                );
              })}
        </div>
      </div>
      <MessageBox
        message={message}
        btnMessage={btnMessage}
        show={show}
        HandleMessageBtn={HandleClosingMessageBox}
      />
    </div>
  );
});

export default Home;
