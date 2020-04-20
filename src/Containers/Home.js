import React, { useEffect, useState, useCallback, useContext } from "react";
import "./Sass/home_style.scss";
import { HomeVideoContainer } from "../Components";
import { getMostPopularVideos } from "../Components/api/YoutubeApi";
import { HomeSkeleton } from "../Components";
import {
  UrlLocationContext,
  MessageBoxContext,
  ThemeContext,
  GuideContext,
} from "../Context";
import { UrlLocation, ReturnTheme } from "../utils/utils";

// Creating a global variable to hold all api data
// and then store it in a state to only render once.

let PopularVideosArray = [];

const Home = React.memo(() => {
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // API Collector State
  const [PopularVideos, setPopularVideos] = useState([]);

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Message Box Context
  const [, setMessageBox] = useContext(MessageBoxContext);

  // Guide Context
  const { guide } = useContext(GuideContext);
  const [ShowGuide] = guide;

  useEffect(() => {
    const pageManager = document.getElementById("page-manager");
    if (pageManager) {
      pageManager.style.marginLeft = ShowGuide ? "240px" : "72px";
    }
  }, []);

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
  }, [UrlLocationState, setUrlLocationState]);

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
        setMessageBox({
          show: true,
          message: `${err}`,
          btnMessage: "dismiss",
          MassageFrom: "error",
          id: "",
        });
        setIsLoading(true);
      });
  }, []);

  // ====================================
  //           Error Handling
  // ====================================

  const HandleClosingMessageBox = useCallback(() => {
    // Just to make sure isError will not change to false by any chance before doing some logic if true

    setMessageBox((pre) => {
      return {
        show: false,
        message: pre.message,
        btnMessage: pre.btnMessage,
        MassageFrom: "",
        id: "",
      };
    });
  }, [setMessageBox]);

  const HandleShowMessageBox = useCallback(
    (MassageFrom, state, id = "") => {
      let msg;
      let btnMsg;
      if (MassageFrom === "wl") {
        msg = !state ? "Saved to Watch later" : "Removed from Watch later";
        btnMsg = !state ? "UNDO" : "";
      }

      setMessageBox({
        show: true,
        message: msg,
        btnMessage: btnMsg,
        MassageFrom: MassageFrom,
        id: id,
      });

      setTimeout(() => {
        HandleClosingMessageBox();
      }, 4000);
    },
    [HandleClosingMessageBox, setMessageBox]
  );

  return (
    <div id="page-manager" className="home_container">
      <div className="home_content">
        <div className="home_content__title_wrapper">
          <span className={`home_title home_title--${ReturnTheme(Theme)}`}>
            Most Popular
          </span>
        </div>
        <div className="home_content__video_wrapper">
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
    </div>
  );
});

export default Home;
