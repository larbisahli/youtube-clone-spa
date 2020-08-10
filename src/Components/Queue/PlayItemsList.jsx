import React, { memo, useState, useEffect } from "react";
import styles from "./scss/playitemslist.module.scss";
import { useDispatch } from "react-redux";
import { HandleDuration } from "../../utils";
import { useHistory } from "react-router-dom";
import classNames from "classnames/bind";
import { useFetch } from "../Hooks/useFetch";
import { DRSvg, TrashSvg } from "../CompSvg";
import { PlayQueueAction, Queue_Replace } from "../../redux";

let cx = classNames.bind(styles);

let QDcurrent = 0;

export const PlayItemsList = memo(
  ({
    plv,
    HandlePlayingVideo,
    HandleDelClick,
    isQueue,
    UrlParam = false,
    isPlayList = false,
    isWatch = false,
    index,
  }) => {
    const [VidDetailState, setVidDetailState] = useState("");
    const dispatch = useDispatch();
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

      if (VideoDetails) {
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
      }
    };

    useEffect(() => {
      const draggable = document.querySelectorAll(`.${styles.block}`);
      draggable.forEach((draggable) => {
        draggable.addEventListener("dragstart", () => {
          draggable.classList.add(styles.dragging);
          QDcurrent = draggable.id;
        });
        draggable.addEventListener("dragend", () => {
          draggable.classList.remove(styles.dragging);
          QDcurrent = 0;
        });
      });
    }, []);

    const onDragOver = (event) => {
      const CurrentTarget = event.currentTarget;
      dispatch(Queue_Replace(QDcurrent, CurrentTarget.id));
    };

    return (
      <div
        id={plv.videoId}
        draggable={isWatch ? "false" : "true"}
        onDragEnter={onDragOver}
        onClick={() => Action()}
        className={cx("block", {
          isplaying: HandlePlayingVideo() === plv.videoId,
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
              <div className={styles.text_area__title}>{plv.title}</div>
              <div className={styles.text_area__chtitle}>
                {plv.channelTitle}
              </div>
            </div>
            <div className={styles.btncon}>
              <div
                onClick={() => HandleDelClick(plv.videoId)}
                className={cx("btncon__del", "btncon__del", {
                  btncon__hide: HandlePlayingVideo() === plv.videoId,
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
