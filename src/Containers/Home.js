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
  ApiContext,
} from "../Context";
import { UrlLocation, ReturnTheme } from "../utils";

const Home = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Message Box Context
  const [, setMessageBox] = useContext(MessageBoxContext);

  // Guide Context
  const [ShowGuide, HundleShowGuide] = useContext(GuideContext);
  //

  const [PopularVideos, isLoading, errorMessage] = useContext(ApiContext);

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
    //
    if (window.innerWidth > 810) {
      HundleShowGuide(true);
    }
    // home location set to true
    const UrlLoc = UrlLocation(true);
    if (UrlLoc !== UrlLocationState) {
      setUrlLocationState(() => UrlLoc);
    }
  }, [UrlLocationState, setUrlLocationState, HundleShowGuide]);

  // ===========================
  //  FETCH MOST POPULAR VIDEOS
  // ===========================
  useEffect(() => {
    // Error Setup
    if (errorMessage) {
      setMessageBox({
        show: true,
        message: `${errorMessage}`,
        btnMessage: "dismiss",
        MassageFrom: "error",
        id: "",
      });
    }
  }, [errorMessage, setMessageBox]);

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
