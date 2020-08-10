import React, { useCallback, useState, useEffect, memo, useMemo } from "react";
import styles from "./scss/hv.module.scss";
import Moment from "react-moment";
import { DotsSvg, QueueSvg } from "../../Components/CompSvg";
import { ViewsNumFormatter, HandleDuration } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as TimeSvg } from "../../assets/icon/Time.svg";
import { ReactComponent as CheckedSvg } from "../../assets/icon/Checked.svg";
import { useSelector, useDispatch } from "react-redux";
import ProgressiveImage from "react-progressive-image";
import {
  RemoveOneQueueAction,
  PlayQueueAction,
  ADDInQueueAction,
  SetMessageAction,
  ShowQueueAction,
  CloseMessageAction,
  Wl_RemoveOneAtion,
  Wl_AddAction,
  HideGuideAction,
  SetGuideModeAction,
  SetUrlLocationAction,
  HideQueueAction,
} from "../../redux";
import { useFetch } from "../../Components/Hooks/useFetch";
import classNames from "classnames/bind";
import { ProfileImg } from "../../Components/CompUtils";

let cx = classNames.bind(styles);

const HomeVideoContainer = ({ PopularVideo, index, HandleShowMessageBox }) => {
  const WatchLater = useSelector((state) => state.WLV.WL);
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);
  const dispatch = useDispatch();
  const [Isplaying, setIsplayingNow] = useState([]);
  let history = useHistory();

  // Check if a video is already in wl list
  const memoizedWLValue = useMemo(
    () =>
      WatchLater.some((wl) => {
        if (wl) return wl.videoId === PopularVideo.videoId;
        return false;
      }),
    [WatchLater, PopularVideo.videoId]
  );
  const [IswatchLater, setIsWatchLater] = useState(memoizedWLValue);

  // Check if a video is already in queue list
  const memoizedQValue = useMemo(
    () =>
      QueueList.some((que) => {
        if (que) return que.videoId === PopularVideo.videoId;
        return false;
      }),
    [QueueList, PopularVideo.videoId]
  );
  const [IsQueue, setIsQueue] = useState(memoizedQValue);

  // FETCH CHANNELS SNIPPET
  const snippet = useFetch(PopularVideo.channelId, "channels", "snippet");

  //  fetching for thumbnails
  const Fetch_Data = (id, index) => {
    const imgThumbIdElement = document.getElementById(`${id}_${index}`);
    if (imgThumbIdElement && Object.keys(snippet).length !== 0) {
      imgThumbIdElement.src = snippet.snippet.thumbnails.medium.url;
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
      HandleShowMessageBox("wl", IswatchLater, videoId);

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
    [IswatchLater, HandleShowMessageBox, dispatch]
  );

  //    Handle Queue btn
  const HandleQueueClick = useCallback(
    (title, duration, videoId, channelTitle, channelId, thumbnail) => {
      setIsQueue(!IsQueue);

      if (!ShowQueue) {
        dispatch(ShowQueueAction());
      }

      const playing = QueueList.length === 0;

      if (IsQueue) {
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
    [IsQueue, dispatch, QueueList, ShowQueue]
  );

  useEffect(() => {
    // clean up
    if (!ShowQueue) {
      setIsQueue(false);
    }
  }, [ShowQueue]);

  //   Check if the video is playing now on queue
  const IsplayingNow = useCallback(() => {
    return QueueList.filter((plv) => {
      if (plv) {
        if (plv.playing) {
          return plv.videoId;
        } else {
          return "";
        }
      }
      return false;
    });
  }, [QueueList]);

  useEffect(() => {
    const value = IsplayingNow();
    if (value.length > 0) {
      setIsplayingNow(() => {
        return value[0].videoId;
      });
    }
  }, [QueueList, IsplayingNow]);

  //  redirect with params
  const HandleLink = useCallback(() => {
    if (ShowQueue) {
      HandleQueueClick(
        PopularVideo.title,
        PopularVideo.duration,
        PopularVideo.videoId,
        PopularVideo.channelTitle,
        PopularVideo.channelId,
        PopularVideo.thumbnail
      );
      dispatch(PlayQueueAction(PopularVideo.videoId));
    } else {
      // for a smooth guide transition
      dispatch(HideGuideAction());
      dispatch(SetGuideModeAction(2));
      dispatch(SetUrlLocationAction("watch"));
      history.push(`/watch?v=${PopularVideo.videoId}`);
    }
  }, [PopularVideo, history, HandleQueueClick, ShowQueue, dispatch]);

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
    <div className={styles.hvcontainer}>
      <div className={styles.wrapper}>
        <div className={styles.thumbnail_container}>
          <div className={styles.thumbnail} onClick={HandleLink}>
            <div className={styles.thumbnail__wrapper}>
              <ProgressiveImage
                src={PopularVideo.thumbnail}
                placeholder={PopularVideo.placeholder}
              >
                {(src, loading) => (
                  <img
                    className={cx("img", {
                      "img--gs100": loading,
                      "img--gs0": !loading,
                    })}
                    src={src}
                    alt=""
                  />
                )}
              </ProgressiveImage>
            </div>
          </div>
          {ShowQueue && Isplaying === PopularVideo.videoId && (
            <div className={cx("innerbtn", "innerbtn--playing")}>
              Now playing
            </div>
          )}

          <div className={cx("innerbtn", "innerbtn--duration")}>
            {HandleDuration(PopularVideo.duration)}
          </div>
          <button
            onClick={() =>
              HandleWLClick(
                PopularVideo.title,
                PopularVideo.duration,
                PopularVideo.videoId,
                PopularVideo.channelTitle,
                PopularVideo.channelId,
                PopularVideo.thumbnail,
                IswatchLater
              )
            }
            className={cx("innerbtn", "innerbtn--clock")}
          >
            <div
              onMouseEnter={() => HandleHoverIn("wl")}
              onMouseLeave={() => HandleHoverOut("wl")}
              className={styles.innerbtn__btn_area}
            >
              {IswatchLater ? <CheckedSvg /> : <TimeSvg />}
            </div>

            <div id={`slider-wl-${index}`} className={styles.innerbtn__slider}>
              {IswatchLater ? (
                <div className={styles.checked_txt}>added</div>
              ) : (
                <div className={styles.normal_txt}>watch later</div>
              )}
            </div>
          </button>
          <button
            onClick={() =>
              HandleQueueClick(
                PopularVideo.title,
                PopularVideo.duration,
                PopularVideo.videoId,
                PopularVideo.channelTitle,
                PopularVideo.channelId,
                PopularVideo.thumbnail
              )
            }
            className={cx("innerbtn", "innerbtn--queue")}
          >
            <div
              onMouseEnter={() => HandleHoverIn("q")}
              onMouseLeave={() => HandleHoverOut("q")}
              className={styles.innerbtn__btn_area}
            >
              {ShowQueue && IsQueue ? <CheckedSvg /> : <QueueSvg />}
            </div>

            <div id={`slider-q-${index}`} className={styles.innerbtn__slider}>
              {ShowQueue && IsQueue ? (
                <div className={styles.checked_txt}>added</div>
              ) : (
                <div className={styles.normal_txt}>add to queue</div>
              )}
            </div>
          </button>
        </div>
        <div className={styles.body_container}>
          <Link
            to={`/channel/${PopularVideo.channelId}`}
            className={styles.pronail__wrap}
          >
            <ProfileImg
              width={"36"}
              height={"36"}
              id={`${PopularVideo.channelId}_${index}`}
              src=""
              classname={styles.pronail}
            />
            {Fetch_Data(PopularVideo.channelId, index)}
          </Link>

          <div className={styles.text_area}>
            <div onClick={HandleLink} className={styles.titlewrap}>
              <div
                title={PopularVideo.title}
                className={styles.titlewrap__title}
              >
                {PopularVideo.title}
              </div>
            </div>
            <Link
              data-content={PopularVideo.channelTitle}
              className={styles.ch_titlewrap}
              to={`/channel/${PopularVideo.channelId}`}
            >
              {PopularVideo.channelTitle}
            </Link>
            <div className={styles.duration}>
              {PopularVideo.viewCount && (
                <span className={styles.views}>{`${ViewsNumFormatter(
                  PopularVideo.viewCount
                )} views`}</span>
              )}
              <span>
                <Moment fromNow>{PopularVideo.publishedAt}</Moment>
              </span>
            </div>
          </div>
          <div className={styles.dots}>
            <DotsSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeVideoContainer);
