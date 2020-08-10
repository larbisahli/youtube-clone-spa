import React, { useState, useCallback, memo } from "react";
import styles from "./scss/rv.module.scss";
import { Link, useHistory } from "react-router-dom";
import { DotsSvg } from "../../Components/CompSvg";
import { ViewsNumFormatter, HandleDuration } from "../../utils";
import Moment from "react-moment";
import { QueueSvg } from "../../Components/CompSvg";
import { ReactComponent as TimeSvg } from "../../assets/icon/Time.svg";
import { ReactComponent as CheckedSvg } from "../../assets/icon/Checked.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveOneQueueAction,
  ADDInQueueAction,
  ShowQueueAction,
  Wl_RemoveOneAtion,
  Wl_AddAction,
  HideQueueAction,
  CloseMessageAction,
  SetMessageAction,
  PlayQueueAction,
  HideGuideAction,
  SetGuideModeAction,
  SetUrlLocationAction,
} from "../../redux";
import { useFetch } from "../../Components/Hooks/useFetch";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const ResultsVideoContainer = ({ item, index, HandleShowMessageBox }) => {
  const WatchLater = useSelector((state) => state.WLV.WL);
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);
  const dispatch = useDispatch();
  let history = useHistory();

  // Check if a video is already in wl list
  const [IswatchLater, setIsWatchLater] = useState(
    WatchLater.some((wl) => {
      if (wl) return wl.videoId === item.videoId;
      return false;
    })
  );

  // Check if a video is already in queue list
  const [IsQueue, setIsQueue] = useState(
    QueueList.some((que) => {
      if (que) return que.videoId === item.videoId;
      return false;
    })
  );

  //  Fetch video duration and viewer
  const snippet = useFetch(item.videoId, "videos", "contentDetails,statistics");

  const Fetch_Data = (id, index) => {
    if (Object.keys(snippet).length !== 0) {
      const durationIdElement = document.getElementById(
        `${id}-${index}-duration`
      );

      const viewCountIdElement = document.getElementById(
        `${id}-${index}-viewcount`
      );

      if (durationIdElement) {
        durationIdElement.textContent = HandleDuration(
          snippet.contentDetails.duration
        );
      }

      if (viewCountIdElement) {
        viewCountIdElement.textContent = `${ViewsNumFormatter(
          snippet.statistics.viewCount
        )} views`;
      }
    }
  };

  //  Handle Watch Later btn
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
      HandleShowMessageBox("wl", IswatchLater, item.videoId);

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
    [IswatchLater, HandleShowMessageBox, item, dispatch]
  );

  //    Handle Queue btn
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

      if (!ShowQueue) {
        dispatch(ShowQueueAction());
      }

      const playing = QueueList.length === 0;

      if (IsQueue_) {
        dispatch(RemoveOneQueueAction(videoId));

        // --- MessageBox

        if (QueueList.length - 1 === 0 && ShowQueue) {
          dispatch(HideQueueAction());

          dispatch(
            SetMessageAction({
              message: "Close Queue",
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
        }
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
    [IsQueue, QueueList, dispatch, ShowQueue]
  );

  const HandleRImg = useCallback((skeleton_id, index) => {
    // BackgroundColor can be red and you can use it as video duration with the width.

    const imgTIdElement = document.getElementById(`${skeleton_id}-${index}`);
    if (imgTIdElement) {
      imgTIdElement.style.backgroundColor = "transparent";
      imgTIdElement.style.height = "auto";
    }
  }, []);

  //  redirect with params
  const HandleLink = useCallback(() => {
    if (ShowQueue) {
      const exist = QueueList.filter((obj) => {
        return obj.videoId === item.videoId;
      });

      if (exist.length === 0) {
        HandleQueueClick(
          item.title,
          snippet.contentDetails.duration,
          item.videoId,
          item.channelTitle,
          item.channelId,
          item.thumbnail
        );
        dispatch(PlayQueueAction(item.videoId));
      }
    } else {
      // for a smooth guide transition
      dispatch(HideGuideAction());
      dispatch(SetGuideModeAction(2));
      dispatch(SetUrlLocationAction("watch"));
      history.push(`/watch?v=${item.videoId}`);
    }
  }, [
    item,
    history,
    snippet,
    HandleQueueClick,
    ShowQueue,
    dispatch,
    QueueList,
  ]);

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

  return (
    <div className={styles.item_section}>
      <div className={styles.item_wrap}>
        <div className={styles.thumbnail}>
          <div onClick={HandleLink} className={styles.video}>
            <div id={`hresultCha-${index}`} className={styles.vid_thumb}>
              <img
                onLoad={() => HandleRImg("hresultCha", index)}
                src={item.thumbnail}
                alt=""
                className={styles.vid_thumb__img}
              />
            </div>
          </div>
          {/* -------------head svg-------------- */}
          <div
            id={`${item.videoId}-${index}-duration`}
            className={cx("inner_btn", "inner_btn--duration")}
          >
            {Fetch_Data(item.videoId, index)}
          </div>
          <button
            onClick={() =>
              HandleWLClick(
                item.title,
                document.getElementById(`${item.videoId}-${index}-duration`)
                  .innerHTML,
                item.videoId,
                item.channelTitle,
                item.channelId,
                item.thumbnail,
                IswatchLater
              )
            }
            className={cx("inner_btn", "inner_btn--clock")}
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
              HandleQueueClick(
                item.title,
                document.getElementById(`${item.videoId}-${index}-duration`)
                  .innerHTML,
                item.videoId,
                item.channelTitle,
                item.channelId,
                item.thumbnail,
                IsQueue
              )
            }
            className={cx("inner_btn", "inner_btn--queue")}
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
        <div className={styles.body}>
          <div className={styles.body__container}>
            <div className={styles.body__text_wrap}>
              <div className={styles.results_header}>
                <div
                  onClick={HandleLink}
                  className={styles.results_header__title}
                >
                  {item.title}
                </div>
              </div>
              <div className={styles.details}>
                <Link
                  data-scontent={item.channelTitle}
                  className={styles.details__ch_title}
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div className={styles.details__ch_dot}>•</div>
                <div className={styles.details__sv_tt}>
                  <span id={`${item.videoId}-${index}-viewcount`}></span>
                  <div className={styles.details__ch_dot}>•</div>
                  <span>
                    <Moment fromNow>{item.publishedAt}</Moment>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.body__container__menu}>
              <DotsSvg />
            </div>
          </div>
          <div className={styles.item_wrap__details}>{item.description}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ResultsVideoContainer);
