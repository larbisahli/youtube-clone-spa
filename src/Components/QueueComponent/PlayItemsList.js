import React, { memo, useState } from "react";
import styles from "./scss/playitemslist.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  HandleDuration,
  TextReducer,
  ReturnTheme,
  GetClassName,
} from "../../utils";
import { useHistory } from "react-router-dom";
import classNames from "classnames/bind";
import { useFetch } from "../hooks/useFetch";
import { DRSvg, TrashSvg } from "../../Containers/Svg";
import { PlayQueueAction } from "../../redux";

let cx = classNames.bind(styles);

export const PlayItemsList = memo(
  ({
    plv,
    HandlePlayingVideo,
    HandleDelClick,
    isQueue,
    UrlParam = false,
    isPlayList = false,
    index,
  }) => {
    // Theme
    const Theme = useSelector((state) => state.Theme.isDarkTheme);

    //
    const [VidDetailState, setVidDetailState] = useState("");

    // dispatch
    const dispatch = useDispatch();
    //
    let history = useHistory();

    const Action = () => {
      if (isQueue) {
        dispatch(PlayQueueAction(plv.videoId));
      } else {
        handleLink();
      }
    };

    const handleLink = () => {
      history.push(`/watch?v=${plv.videoId}&list=${UrlParam()}`);
    };

    const IsPlaying = () => {
      if (isQueue) return plv.playing;
      return HandlePlayingVideo() === plv.videoId;
    };

    // =========================
    //  FETCH VIDEOS DETAILS
    // =========================

    const FetchStat = (id, index) => {
      if (!VidDetailState) {
        // To prevent too many re-renders
        setVidDetailState(id);
      }

      const VideoDetails = useFetch(
        VidDetailState,
        "videos",
        "contentDetails,statistics"
      );

      if (Object.keys(VideoDetails).length !== 0) {
        const durationIdElement = document.getElementById(
          `pl-${id}-${index}-duration`
        );

        if (durationIdElement) {
          durationIdElement.textContent = HandleDuration(
            VideoDetails.contentDetails.duration
          );
        }
      }
    };

    return (
      <div
        onClick={() => Action()}
        className={cx("block", {
          [`block--${ReturnTheme(Theme)}`]: true,
          [`isplaying--${ReturnTheme(Theme)}`]:
            HandlePlayingVideo() === plv.videoId,
        })}
      >
        <div className={styles.playbtn}>
          {IsPlaying() ? (
            <div className={styles.playbtn__playing}>▶</div>
          ) : (
            <div className={styles.playbtn__drag}>
              <DRSvg />
            </div>
          )}
        </div>
        <div className={styles.itemwrap}>
          <div className={styles.thumbnail}>
            <div>
              <img
                width="100"
                className={styles.thumbnail__img}
                src={plv.thumbnail}
                alt=""
              />
            </div>
            <div
              id={`pl-${plv.videoId}-${index}-duration`}
              className={styles.thumbnail__duration}
            >
              {isPlayList
                ? FetchStat(plv.videoId, index)
                : HandleDuration(plv.duration)}
            </div>
          </div>
          <div className={styles.body_container}>
            <div className={styles.text_area}>
              <div className={styles.text_area__title}>
                {TextReducer(plv.title, 40)}
              </div>
              <div
                className={GetClassName(styles, "text_area__chtitle", Theme)}
              >
                {plv.channelTitle}
              </div>
            </div>
            <div className={styles.btncon}>
              <div
                onClick={() => HandleDelClick(plv.videoId)}
                className={cx("btncon__del", {
                  [`btncon__del--${ReturnTheme(Theme)}`]: true,
                  [`btncon__hide`]: HandlePlayingVideo() === plv.videoId,
                })}
              >
                <TrashSvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
