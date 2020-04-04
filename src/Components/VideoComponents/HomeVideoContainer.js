import React, { useCallback, useState, useContext } from "react";
import "./hvcontainer_style.scss";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { DotsSvg } from "../Navbar/NavComponents/Svg";
import {
  ViewsNumFormatter,
  HandleDuration,
  TextReducer,
  ReturnTheme
} from "../../config";
import { Link } from "react-router-dom";
import { TimeSvg, QueueSvg, CheckedSvg } from "./Svg";
import { ThemeContext } from "../../Context/ThemeContext";
import { WLVContext } from "../../Context/WLVContext";
import { QueueContext } from "../../Context/QueueContext";

const HomeVideoContainer = React.memo(
  ({ PopularVideo, index, HandleShowMessageBox }) => {
    // Watch later state
    const [IswatchLater, setIsWatchLater] = useState(false);
    // Watch later state
    const [IsQueue, setIsQueue] = useState(false);

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

    // =========================
    //  FETCH CHANNELS SNIPPET
    // =========================

    const GetChannelsthumbnail = async id => {
      return await new Promise(resolve => {
        YouTubeAPI.get("channels", {
          params: {
            part: "snippet",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            id: id
          }
        }).then(res => {
          resolve(res);
        });
      });
    };

    const Fetch_Data = (id, index) => {
      GetChannelsthumbnail(id).then(res => {
        const sgix = document.getElementById(`${id}_${index}`);
        if (sgix !== null) {
          sgix.src = res.data.items[0].snippet.thumbnails.medium.url;
        }
      });
    };

    const CheckWatchLaterList = useCallback(
      videoId => {
        return WatchLaterList.some(wl => wl.videoId === videoId);
      },
      [WatchLaterList]
    );

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
        HandleShowMessageBox(IswatchLater);

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
            thumbnail
          });
        }
      },
      [IswatchLater, HandleShowMessageBox, WLdispatch]
    );

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
        HandleShowMessageBox(IsQueue);

        if (!ShowQueue) {
          setShowQueue(true);
        }

        const playing = QueueList.length === 0;
        console.log("playing :", playing);

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
            index: QueueList.length
          });
        }
      },
      [
        IsQueue,
        HandleShowMessageBox,
        QueueList,
        QueueListDispatch,
        ShowQueue,
        setShowQueue
      ]
    );

    const HandleImg = useCallback((skeleton_id, index) => {
      // BackgroundColor can be red and you can use it as video duration with the width value.

      document.getElementById(`${skeleton_id}-${index}`).style.backgroundColor =
        "transparent";
      document.getElementById(`${skeleton_id}-${index}`).style.height = "auto";
    }, []);

    return (
      <div className="hvideo_container">
        <div className="hvideo_wrapper">
          <div className="hvideo_thumbnail_container">
            <Link to={`/watch/${PopularVideo.videoId}`} className="vh_th_link">
              <div
                id={`hvideoImg-${index}`}
                className={`skltn_thumb skltn_thumb-${ReturnTheme(Theme)}`}
              >
                <img
                  className="hvideo_thumbnail_img"
                  onLoad={() => HandleImg("hvideoImg", index)}
                  src={PopularVideo.thumbnail}
                  alt=""
                />
              </div>
            </Link>
            <div className="hvideo_ab hvideo_ab-duration">
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
              className="hvideo_ab hvideo_ab-clock"
            >
              <div className="tt_icon">
                {IswatchLater || CheckWatchLaterList(PopularVideo.videoId) ? (
                  <div className="checked_icon">
                    <CheckedSvg />
                  </div>
                ) : (
                  <TimeSvg />
                )}
              </div>
              <div className="slider_text">
                {IswatchLater ? (
                  <div className="checkedtxt">added</div>
                ) : (
                  <div className="normaltxt">watch later</div>
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
              className="hvideo_ab hvideo_ab-queue"
            >
              <div className="tt_icon">
                {IsQueue ? <CheckedSvg /> : <QueueSvg />}
              </div>
              <div className="slider_text">
                {IsQueue ? (
                  <div className="checkedtxt">added</div>
                ) : (
                  <div className="normaltxt">add to queue</div>
                )}
              </div>
            </button>
          </div>
          <div className="hvideo_title_container">
            <div className="hvideo_ch_wrapper">
              <Link
                to={`/channel/${PopularVideo.channelId}`}
                className="hvideo_ch_img"
              >
                <div
                  id={`hvideoCha-${index}`}
                  className={`skltn_ch skltn_ch-${ReturnTheme(Theme)}`}
                >
                  <img
                    // making sure the id is unique
                    className="hvideo_img"
                    id={`${PopularVideo.channelId}_${index}`}
                    onLoad={() => HandleImg("hvideoCha", index)}
                    src=""
                    alt=""
                  />
                  {Fetch_Data(PopularVideo.channelId, index)}
                </div>
              </Link>
            </div>
            <div className="text_area">
              <Link
                to={`/watch/${PopularVideo.videoId}`}
                className={`video_title_wrap video_title_wrap-${ReturnTheme(
                  Theme
                )}`}
              >
                <div title={PopularVideo.title} className="title_txt">
                  {TextReducer(PopularVideo.title, 56)}
                </div>
              </Link>
              <Link
                data-content={PopularVideo.channelTitle}
                className={`ch_title ch_title-${ReturnTheme(Theme)}`}
                to={`/channel/${PopularVideo.channelId}`}
              >
                {PopularVideo.channelTitle}
              </Link>
              <div className={`vduration vduration-${ReturnTheme(Theme)}`}>
                <span className="vnum">{`${ViewsNumFormatter(
                  PopularVideo.viewCount
                )} views`}</span>
                <span>
                  <Moment fromNow>{PopularVideo.publishedAt}</Moment>
                </span>
              </div>
            </div>
            <div className={`hvideo_dots hvideo_dots-${ReturnTheme(Theme)}`}>
              <DotsSvg />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default HomeVideoContainer;
