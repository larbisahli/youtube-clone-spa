import React, { useCallback, useState, useEffect, memo } from "react";
import style from "./sass/hv.module.scss";
import Moment from "react-moment";
import { DotsSvg } from "../Navbar/NavComponents/Svg";
import {
  ViewsNumFormatter,
  HandleDuration,
  TextReducer,
  GetClassName,
} from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { TimeSvg, QueueSvg, CheckedSvg } from "./Svg";
import { useSelector, useDispatch } from "react-redux";
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
import { useFetch } from "../hooks/useFetch";

const HomeVideoContainer = memo(
  ({ PopularVideo, index, HandleShowMessageBox }) => {
    // Theme
    const Theme = useSelector((state) => state.Theme.isDarkTheme);

    // WLV
    const WatchLater = useSelector((state) => state.WLV.WL);

    // Queue
    const ShowQueue = useSelector((state) => state.DisplayQueue);
    const QueueList = useSelector((state) => state.QueueList);

    // dispatch
    const dispatch = useDispatch();

    // image isload state
    const [imageLoaded, setImageLoaded] = useState(false);

    //
    const [Isplaying, setIsplayingNow] = useState([]);

    //
    let history = useHistory();

    // ======================================
    // Check if a video is already in wl list
    // ======================================
    const [IswatchLater, setIsWatchLater] = useState(
      WatchLater.some((wl) => wl.videoId === PopularVideo.videoId)
    );

    // =========================================
    // Check if a video is already in queue list
    // =========================================
    const [IsQueue, setIsQueue] = useState(
      QueueList.some((que) => que.videoId === PopularVideo.videoId)
    );

    // =================================
    //     FETCH CHANNELS SNIPPET
    // =================================

    const snippet = useFetch(PopularVideo.channelId, "channels", "snippet");

    // =========================
    //  fetching for thumbnails
    // =========================
    console.log("snippet :>> ", snippet);

    const Fetch_Data = (id, index) => {
      const imgThumbIdElement = document.getElementById(`${id}_${index}`);
      if (imgThumbIdElement && Object.keys(snippet).length !== 0) {
        imgThumbIdElement.src = snippet.snippet.thumbnails.medium.url;
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

    // =========================
    //    Handle Queue btn
    // =========================

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

    // ===============================================
    //   Check if the video is playing now on queue
    // ===============================================

    const IsplayingNow = useCallback(() => {
      return QueueList.filter((plv) => {
        if (plv.playing) {
          return plv.videoId;
        } else {
          return "";
        }
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

    // ======================
    //  redirect with params
    // ======================

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
      <div className={style.hvcontainer}>
        <div className={style.wrapper}>
          <div className={GetClassName(style, "thumbnail_container", Theme)}>
            <div className={style.thumbnail} onClick={HandleLink}>
              <div className={style.thumbnail__wrapper}>
                <img
                  className={`${style.img} ${
                    style[`img--${imageLoaded ? "visible" : "hidden"}`]
                  }`}
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                  src={PopularVideo.thumbnail}
                  alt=""
                />
              </div>
            </div>
            {ShowQueue && Isplaying === PopularVideo.videoId && (
              <div
                className={`${style.innerbtn} ${style["innerbtn--playing"]}`}
              >
                Now playing
              </div>
            )}

            <div className={`${style.innerbtn} ${style["innerbtn--duration"]}`}>
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
              className={`${style.innerbtn} ${style["innerbtn--clock"]}`}
            >
              <div
                onMouseEnter={() => HandleHoverIn("wl")}
                onMouseLeave={() => HandleHoverOut("wl")}
                className={style.innerbtn__btn_area}
              >
                {IswatchLater ? <CheckedSvg /> : <TimeSvg />}
              </div>

              <div id={`slider-wl-${index}`} className={style.innerbtn__slider}>
                {IswatchLater ? (
                  <div className={style.checked_txt}>added</div>
                ) : (
                  <div className={style.normal_txt}>watch later</div>
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
              className={`${style.innerbtn} ${style["innerbtn--queue"]}`}
            >
              <div
                onMouseEnter={() => HandleHoverIn("q")}
                onMouseLeave={() => HandleHoverOut("q")}
                className={style.innerbtn__btn_area}
              >
                {ShowQueue && IsQueue ? <CheckedSvg /> : <QueueSvg />}
              </div>

              <div id={`slider-q-${index}`} className={style.innerbtn__slider}>
                {ShowQueue && IsQueue ? (
                  <div className={style.checked_txt}>added</div>
                ) : (
                  <div className={style.normal_txt}>add to queue</div>
                )}
              </div>
            </button>
          </div>
          <div className={style.body_container}>
            <div className={style.pronail}>
              <Link
                to={`/channel/${PopularVideo.channelId}`}
                className={style.pronail__wrap}
              >
                <div className={GetClassName(style, "skltn", Theme)}>
                  <img
                    // making sure the id is unique
                    className={style.skltn__img}
                    id={`${PopularVideo.channelId}_${index}`}
                    src=""
                    alt=""
                  />
                  {Fetch_Data(PopularVideo.channelId, index)}
                </div>
              </Link>
            </div>
            <div className={style.text_area}>
              <div
                onClick={HandleLink}
                className={GetClassName(style, "titlewrap", Theme)}
              >
                <div
                  title={PopularVideo.title}
                  className={style.titlewrap__title}
                >
                  {TextReducer(PopularVideo.title, 56)}
                </div>
              </div>
              <Link
                data-content={PopularVideo.channelTitle}
                className={GetClassName(style, "ch_titlewrap", Theme)}
                to={`/channel/${PopularVideo.channelId}`}
              >
                {PopularVideo.channelTitle}
              </Link>
              <div className={GetClassName(style, "duration", Theme)}>
                <span className={style.views}>{`${ViewsNumFormatter(
                  PopularVideo.viewCount
                )} views`}</span>
                <span>
                  <Moment fromNow>{PopularVideo.publishedAt}</Moment>
                </span>
              </div>
            </div>
            <div className={GetClassName(style, "dots", Theme)}>
              <DotsSvg />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default HomeVideoContainer;
