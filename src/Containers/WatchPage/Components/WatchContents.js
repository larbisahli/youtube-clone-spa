import React, { memo, useState, useCallback } from "react";
import styles from "./scss/wc.module.scss";
import {
  TextReducer,
  ViewsNumFormatter,
  HandleDuration,
  GetClassName,
} from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  TimeSvg,
  QueueSvg,
  CheckedSvg,
} from "../../ResultsPage/Components/Svg";
import Moment from "react-moment";
import {
  Wl_RemoveOneAtion,
  Wl_AddAction,
  RemoveOneQueueAction,
  ADDInQueueAction,
  CloseMessageAction,
  SetMessageAction,
} from "../../../redux";
import { useHistory } from "react-router-dom";

const WatchContents = ({ index, PopularVideo, HandleShowMessageBox }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // WLV
  const WatchLater = useSelector((state) => state.WLV.WL);

  // Queue list
  const QueueList = useSelector((state) => state.QueueList);

  // dispatch
  const dispatch = useDispatch();

  const [IswatchLater, setIsWatchLater] = useState(() => {
    try {
      return WatchLater.some((wl) => wl.videoId === PopularVideo.videoId);
    } catch {
      return false;
    }
  });

  const [IsQueue, setIsQueue] = useState(false);

  // Slider HandleHoverIn

  const HandleHoverIn = (value) => {
    const slider = document.getElementById(`slider-${value}-${index}`);

    if (slider) {
      slider.style.position = "relative";
      slider.style.zIndex = "1";
      slider.style.transform = "translateX(0px)";
    }
  };

  // Slider HandleHoverOut

  const HandleHoverOut = (value) => {
    const slider = document.getElementById(`slider-${value}-${index}`);

    if (slider) {
      slider.style.zIndex = "0";
      slider.style.transform = "translateX(135px)";
      setTimeout(() => {
        slider.style.position = "absolute";
        // Note: transition: transform 0.35s ease-in-out;
      }, 350);
    }
  };

  // =========================
  //  Handle Watch Later btn
  // =========================

  const HandleWLClick = useCallback(
    (
      title,
      duration,
      videoId,
      channelTitle,
      channelId,
      thumbnail,
      IswatchLater_
    ) => {
      setIsWatchLater(!IswatchLater);
      HandleShowMessageBox("wl", IswatchLater, PopularVideo.videoId);

      if (IswatchLater_) {
        dispatch(Wl_RemoveOneAtion(videoId));
      } else {
        dispatch(
          Wl_AddAction({
            title,
            duration,
            videoId,
            channelTitle,
            channelId,
            thumbnail,
          })
        );
      }
    },
    [IswatchLater, HandleShowMessageBox, PopularVideo, dispatch]
  );

  // =========================
  //    Handle Queue btn
  // =========================

  const HandleQueueClick = useCallback(
    (
      title,
      duration,
      videoId,
      channelTitle,
      channelId,
      thumbnail,
      IsQueue_
    ) => {
      setIsQueue(!IsQueue);

      const playing = QueueList.length === 0;

      if (IsQueue_) {
        dispatch(RemoveOneQueueAction(videoId));
        dispatch(
          SetMessageAction({
            message: "Removed from Queue",
            btnText: "",
            from: "queue",
            id: "",
          })
        );
        setTimeout(() => {
          dispatch(CloseMessageAction());
        }, 2000);
      } else {
        dispatch(
          ADDInQueueAction({
            title,
            duration,
            videoId,
            channelTitle,
            channelId,
            thumbnail,
            playing,
            index: QueueList.length,
          })
        );

        // --- MessageBox

        dispatch(
          SetMessageAction({
            message: "Video added to queue",
            btnText: "",
            from: "queue",
            id: "",
          })
        );
        setTimeout(() => {
          dispatch(CloseMessageAction());
        }, 2000);
      }
    },
    [IsQueue, QueueList, dispatch]
  );

  // ==============

  let history = useHistory();

  const HandleLink = () => {
    if (PopularVideo) {
      history.push(`/watch?v=${PopularVideo.videoId}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.thumbnail}>
          <div
            onClick={HandleLink}
            className={GetClassName(styles, "thumbnail__wrapper", Theme)}
          >
            <img
              className={styles.img}
              width="168"
              // placeholder because it has a small image
              src={PopularVideo && PopularVideo.placeholder}
              alt=""
            />
          </div>
          {/* -------------head svg-------------- */}
          <div
            className={`${styles.inner_btn} ${styles["inner_btn--duration"]}`}
          >
            {HandleDuration(PopularVideo ? PopularVideo.duration : "")}
          </div>
          <button
            onClick={() =>
              PopularVideo
                ? HandleWLClick(
                    PopularVideo.title,
                    PopularVideo.duration,
                    PopularVideo.videoId,
                    PopularVideo.channelTitle,
                    PopularVideo.channelId,
                    PopularVideo.thumbnail,
                    IswatchLater
                  )
                : null
            }
            className={`${styles.inner_btn} ${styles["inner_btn--clock"]}`}
          >
            <div
              onMouseEnter={() => HandleHoverIn("wl")}
              onMouseLeave={() => HandleHoverOut("wl")}
              className={styles.icon_btn}
            >
              {IswatchLater ? (
                <div className={styles.icon_btn__check}>
                  <CheckedSvg />
                </div>
              ) : (
                <TimeSvg />
              )}
            </div>
            <div id={`slider-wl-${index}`} className={styles.slider}>
              {IswatchLater ? (
                <div className={styles.slider__check}>added</div>
              ) : (
                <div className={styles.slider__normal}>watch later</div>
              )}
            </div>
          </button>
          <button
            onClick={() =>
              PopularVideo
                ? HandleQueueClick(
                    PopularVideo.title,
                    PopularVideo.duration,
                    PopularVideo.videoId,
                    PopularVideo.channelTitle,
                    PopularVideo.channelId,
                    PopularVideo.thumbnail,
                    IsQueue
                  )
                : null
            }
            className={`${styles.inner_btn} ${styles["inner_btn--queue"]}`}
          >
            <div
              onMouseEnter={() => HandleHoverIn("q")}
              onMouseLeave={() => HandleHoverOut("q")}
              className={styles.icon_btn}
            >
              {IsQueue ? <CheckedSvg /> : <QueueSvg />}
            </div>
            <div id={`slider-q-${index}`} className={styles.slider}>
              {IsQueue ? (
                <div className={styles.slider__check}>added</div>
              ) : (
                <div className={styles.slider__text}>add to queue</div>
              )}
            </div>
          </button>
          {/* -------------body-------------- */}
        </div>
        {PopularVideo ? (
          <div className={styles.body}>
            <div className={styles.wrap}>
              <div
                onClick={HandleLink}
                className={GetClassName(styles, "title", Theme)}
              >
                {TextReducer(PopularVideo ? PopularVideo.title : "", 56)}
              </div>
              <div className={GetClassName(styles, "details", Theme)}>
                <div
                  className={GetClassName(styles, "details__cha_title", Theme)}
                >
                  {PopularVideo && PopularVideo.channelTitle}
                </div>

                <div className={GetClassName(styles, "details__stat", Theme)}>
                  <div>
                    {`${ViewsNumFormatter(
                      PopularVideo && PopularVideo.viewCount
                    )} views`}
                  </div>
                  <div className={GetClassName(styles, "details__dot", Theme)}>
                    •
                  </div>
                  <div>
                    <Moment fromNow>
                      {PopularVideo && PopularVideo.publishedAt}
                    </Moment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.skeleton}>
            <div
              className={GetClassName(styles, "skeleton__txt1", Theme)}
            ></div>
            <div
              className={GetClassName(styles, "skeleton__txt2", Theme)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(WatchContents);
