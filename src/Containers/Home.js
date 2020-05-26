import React, { useEffect, memo, useCallback } from "react";
import styles from "./Sass/home.module.scss";
import { HomeVideoContainer } from "../Components";
import { HomeSkeleton } from "../Components";
import { PageLocation, GetClassName } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  SetUrlLocationAction,
} from "../redux";

const Home = () => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // urlLocation
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);

  // Guide
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);

  // fetch data
  const PopularVideos = useSelector((state) => state.VideosRequest.items);
  const Loading = useSelector((state) => state.VideosRequest.loading);
  const errorMessage = useSelector((state) => state.VideosRequest.error);

  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // home location set to true
    const UrlLoc = PageLocation(true);
    if (UrlLoc !== UrlLocation) {
      dispatch(SetUrlLocationAction(UrlLoc));
    }
  }, [dispatch, UrlLocation]);

  // ===========================
  //  FETCH MOST POPULAR VIDEOS
  // ===========================

  useEffect(() => {
    // Error Setup
    console.log("errorMessage :>> ", errorMessage);
    if (errorMessage) {
      dispatch(
        SetMessageAction({
          message: `${errorMessage}`,
          btnText: "dismiss",
          from: "error",
          id: "",
        })
      );
    }
  }, [errorMessage, dispatch]);

  // ====================================
  //           Error Handling
  // ====================================

  const HandleClosingMessageBox = useCallback(() => {
    dispatch(CloseMessageAction());
  }, [dispatch]);

  const HandleShowMessageBox = useCallback(
    (MassageFrom, state, id = "") => {
      let msg;
      let btnMsg;
      if (MassageFrom === "wl") {
        msg = !state ? "Saved to Watch later" : "Removed from Watch later";
        btnMsg = !state ? "UNDO" : "";
      }

      dispatch(
        SetMessageAction({
          message: msg,
          btnText: btnMsg,
          from: MassageFrom,
          id: id,
        })
      );

      setTimeout(() => {
        HandleClosingMessageBox();
      }, 4000);
    },
    [HandleClosingMessageBox, dispatch]
  );

  return (
    <div
      id="page-manager"
      style={{ marginLeft: showGuide && guideMode === 1 ? "240px" : "72px" }}
      className={styles.container}
    >
      <div className={styles.content}>
        <div className={styles.title_wrapper}>
          <span className={GetClassName(styles, "title", Theme)}>
            Most Popular
          </span>
        </div>
        <div className={styles.video_wrapper}>
          {Loading
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
};

export default memo(Home);
