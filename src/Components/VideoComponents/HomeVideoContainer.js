import React, { useCallback, useState, useContext, useEffect } from "react";
import "./sass/hvcontainer_style.scss";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { DotsSvg } from "../Navbar/NavComponents/Svg";
import {
  ViewsNumFormatter,
  HandleDuration,
  TextReducer,
  ReturnTheme,
} from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { TimeSvg, QueueSvg, CheckedSvg } from "./Svg";
import { WLVContext, ThemeContext, QueueContext } from "../../Context";

const HomeVideoContainer = React.memo(
  ({ PopularVideo, index, HandleShowMessageBox }) => {
    // Theme context
    const [YtTheme] = useContext(ThemeContext);
    const Theme = YtTheme.isDarkTheme;

    // WLV Context
    const { WatchLaterState } = useContext(WLVContext);
    const [WatchLaterList, WLdispatch] = WatchLaterState;

    // Queue Context
    const { QueueState, ShowQueueState } = useContext(QueueContext);
    const [ShowQueue, setShowQueue] = ShowQueueState;
    const [QueueList, QueueListDispatch] = QueueState;

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
      WatchLaterList.some((wl) => wl.videoId === PopularVideo.videoId)
    );

    // =========================================
    // Check if a video is already in queue list
    // =========================================
    const [IsQueue, setIsQueue] = useState(
      QueueList.some((que) => que.videoId === PopularVideo.videoId)
    );

    // =========================
    //  FETCH CHANNELS SNIPPET
    // =========================

    const GetChannelsthumbnail = async (id) => {
      return await new Promise((resolve) => {
        YouTubeAPI.get("channels", {
          params: {
            part: "snippet",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            id: id,
          },
        }).then((res) => {
          resolve(res);
        });
      });
    };

    // =========================
    //  fetching for thumbnails
    // =========================

    const Fetch_Data = (id, index) => {
      GetChannelsthumbnail(id).then((res) => {
        const imgThumbIdElement = document.getElementById(`${id}_${index}`);
        if (imgThumbIdElement) {
          imgThumbIdElement.src =
            res.data.items[0].snippet.thumbnails.medium.url;
        }
      });
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
          WLdispatch({ type: "removeOne", videoId });
        } else {
          WLdispatch({
            type: "add",
            title,
            duration,
            videoId,
            channelTitle,
            channelId,
            thumbnail,
          });
        }
      },
      [IswatchLater, HandleShowMessageBox, WLdispatch]
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
        //HandleShowMessageBox(IsQueue);

        if (!ShowQueue) {
          setShowQueue(true);
        }

        const playing = QueueList.length === 0;

        if (IsQueue_) {
          QueueListDispatch({ type: "removeOne", videoId });
        } else {
          QueueListDispatch({
            type: "add",
            title,
            duration,
            videoId,
            channelTitle,
            channelId,
            thumbnail,
            playing,
            index: QueueList.length,
          });
        }
      },
      [
        IsQueue,
        //HandleShowMessageBox,
        QueueList,
        QueueListDispatch,
        ShowQueue,
        setShowQueue,
      ]
    );

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
          PopularVideo.thumbnail,
          IsQueue
        );
        QueueListDispatch({
          type: "play",
          videoId: PopularVideo.videoId,
        });
      } else {
        history.push(`/watch?v=${PopularVideo.videoId}`);
      }
    }, [
      PopularVideo,
      history,
      HandleQueueClick,
      ShowQueue,
      IsQueue,
      QueueListDispatch,
    ]);

    return (
      <div className="home_video_container">
        <div className="hvc_wrapper">
          <div
            className={`hvc_wrapper__thumbnail hvc_wrapper__thumbnail--${ReturnTheme(
              Theme
            )}`}
          >
            <div className="video_thumbnail" onClick={HandleLink}>
              <div className="video_thumbnail__img_wrapper">
                <img
                  className={`video_thumbnail__img_wrapper__img video_thumbnail__img_wrapper__img--${
                    imageLoaded ? "visible" : "hidden"
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
              <div className="vh_inner_btn vh_inner_btn--playing">
                Now playing
              </div>
            )}

            <div className="vh_inner_btn vh_inner_btn--duration">
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
              className="vh_inner_btn vh_inner_btn--clock"
            >
              <div className="vh_inner_btn__btn_area">
                {IswatchLater ? (
                  <div className="hv_checked_icon">
                    <CheckedSvg />
                  </div>
                ) : (
                  <TimeSvg />
                )}
              </div>
              <div className="vh_inner_btn__slider_txt">
                {IswatchLater ? (
                  <div className="vh_checked_txt">added</div>
                ) : (
                  <div className="vh_normal_txt">watch later</div>
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
                  PopularVideo.thumbnail,
                  IsQueue
                )
              }
              className="vh_inner_btn vh_inner_btn--queue"
            >
              <div className="vh_inner_btn__btn_area">
                {ShowQueue && IsQueue ? <CheckedSvg /> : <QueueSvg />}
              </div>
              <div className="vh_inner_btn__slider_txt">
                {ShowQueue && IsQueue ? (
                  <div className="vh_checked_txt">added</div>
                ) : (
                  <div className="vh_normal_txt">add to queue</div>
                )}
              </div>
            </button>
          </div>
          <div className="hvc_wrapper__body_container">
            <div className="vh_ch_thumbnail">
              <Link
                to={`/channel/${PopularVideo.channelId}`}
                className="vh_ch_thumbnail__wrap"
              >
                <div className={`ch_skltn ch_skltn--${ReturnTheme(Theme)}`}>
                  <img
                    // making sure the id is unique
                    className="ch_skltn__img"
                    id={`${PopularVideo.channelId}_${index}`}
                    src=""
                    alt=""
                  />
                  {Fetch_Data(PopularVideo.channelId, index)}
                </div>
              </Link>
            </div>
            <div className="vh_text_area">
              <div
                onClick={HandleLink}
                className={`vh_text_area__vid_title vh_text_area__vid_title--${ReturnTheme(
                  Theme
                )}`}
              >
                <div
                  title={PopularVideo.title}
                  className="vh_text_area__vid_title__title"
                >
                  {TextReducer(PopularVideo.title, 56)}
                </div>
              </div>
              <Link
                data-content={PopularVideo.channelTitle}
                className={`vh_text_area__ch_title vh_text_area__ch_title--${ReturnTheme(
                  Theme
                )}`}
                to={`/channel/${PopularVideo.channelId}`}
              >
                {PopularVideo.channelTitle}
              </Link>
              <div
                className={`vh_text_area__duration vh_text_area__duration--${ReturnTheme(
                  Theme
                )}`}
              >
                <span className="vid_view_num">{`${ViewsNumFormatter(
                  PopularVideo.viewCount
                )} views`}</span>
                <span>
                  <Moment fromNow>{PopularVideo.publishedAt}</Moment>
                </span>
              </div>
            </div>
            <div className={`vh_dot_btn vh_dot_btn--${ReturnTheme(Theme)}`}>
              <DotsSvg />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default HomeVideoContainer;
