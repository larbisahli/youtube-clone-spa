import React, { useEffect, memo, useCallback } from "react";
import styles from "./home.module.scss";
import HomeVideoContainer from "../../Containers/HomeContainer/HomeVideoContainer";
import { VidAspectSkeleton } from "../../Components";
import { PageLocation } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  SetMessageAction,
  CloseMessageAction,
  SetUrlLocationAction,
  ShowApiMessageAction,
} from "../../redux";

const Home = () => {
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);
  const PopularVideos = useSelector((state) => state.VideosRequest.items);
  const Loading = useSelector((state) => state.VideosRequest.loading);
  const errorMessage = useSelector((state) => state.VideosRequest.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const UrlLoc = PageLocation(true);
    if (UrlLoc !== UrlLocation) {
      dispatch(SetUrlLocationAction(UrlLoc));
    }
  }, [dispatch, UrlLocation]);

  useEffect(() => {
    // Error Setup
    let message;

    if ((errorMessage.status !== 200) & (errorMessage.status !== 0)) {
      // if (errorMessage.status === 403 && errorMessage.status === 404) {
      //   message = `Error code: 403. Try to insert your api key.`;
      // } else {
      // message = `Error: ${errorMessage.message}`;
      // }
      message = `Error: ${errorMessage.message}`;

      dispatch(
        SetMessageAction({
          message: message,
          btnText: "dismiss",
          from: "error",
          id: "",
        })
      );

      if (errorMessage.status === 403 || errorMessage.status === 400) {
        dispatch(ShowApiMessageAction());
      }
    }
  }, [errorMessage, dispatch]);

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
          <span className={styles.title}>Most Popular</span>
        </div>
        <div className={styles.video_wrapper}>
          {Loading
            ? [...Array(8)].map((e, i) => {
                return <VidAspectSkeleton key={i} />;
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
