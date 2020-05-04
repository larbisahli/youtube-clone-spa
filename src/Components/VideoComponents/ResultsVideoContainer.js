import React, { useState, useContext, useCallback } from "react";
import "./sass/rvccontainer_style.scss";
import { Link } from "react-router-dom";
import { DotsSvg } from "../Navbar/NavComponents/Svg";
import {
  TextReducer,
  ViewsNumFormatter,
  HandleDuration,
  ReturnTheme,
} from "../../utils";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { TimeSvg, QueueSvg, CheckedSvg } from "./Svg";
import { WLVContext, ThemeContext, QueueContext } from "../../Context";

const ResultVideoContainer = React.memo(
  ({ item, index, HandleShowMessageBox }) => {
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

    // ======================================
    // Check if a video is already in wl list
    // ======================================

    const [IswatchLater, setIsWatchLater] = useState(
      WatchLaterList.some((wl) => wl.videoId === item.videoId)
    );

    // =========================================
    // Check if a video is already in queue list
    // =========================================
    const [IsQueue, setIsQueue] = useState(
      QueueList.some((que) => que.videoId === item.videoId)
    );

    // =========================
    //  FETCH VIDEOS DETAILS
    // =========================
    const GetVideoDetails = async (id) => {
      return await new Promise((resolve) => {
        YouTubeAPI.get("videos", {
          params: {
            part: "contentDetails,statistics",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            id: id,
          },
        }).then((res) => {
          resolve(res);
        });
      });
    };

    // =================================
    // fetch video duration and viewer
    // =================================

    const Fetch_Data = (id, index) => {
      GetVideoDetails(id).then((res) => {
        if (res.data.items.length >= 1) {
          const durationIdElement = document.getElementById(
            `${id}-${index}-duration`
          );

          const viewCountIdElement = document.getElementById(
            `${id}-${index}-viewcount`
          );

          if (durationIdElement) {
            durationIdElement.textContent = HandleDuration(
              res.data.items[0].contentDetails.duration
            );
          }

          if (viewCountIdElement) {
            viewCountIdElement.textContent = `${ViewsNumFormatter(
              res.data.items[0].statistics.viewCount
            )} views`;
          }
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
        HandleShowMessageBox("wl", IswatchLater, item.videoId);

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
      [IswatchLater, HandleShowMessageBox, item, WLdispatch]
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

    const HandleRImg = useCallback((skeleton_id, index) => {
      // BackgroundColor can be red and you can use it as video duration with the width.

      const imgTIdElement = document.getElementById(`${skeleton_id}-${index}`);
      if (imgTIdElement) {
        imgTIdElement.style.backgroundColor = "transparent";
        imgTIdElement.style.height = "auto";
      }
    }, []);

    return (
      <div className="item_section">
        <div className="item_wrap">
          <div className="item_wrap__thumbnail">
            <Link
              to={`/watch/${item.videoId}`}
              className="item_wrap__thumbnail__video"
            >
              <div
                id={`hresultCha-${index}`}
                className={`rv_video_thumb rv_video_thumb--${ReturnTheme(
                  Theme
                )}`}
              >
                <img
                  onLoad={() => HandleRImg("hresultCha", index)}
                  src={item.thumbnail}
                  alt=""
                  className="rv_video_thumb__img"
                />
              </div>
            </Link>
            {/* -------------head svg-------------- */}
            <div
              id={`${item.videoId}-${index}-duration`}
              className="item_wrap__thumbnail__inner_btn item_wrap__thumbnail__inner_btn--duration"
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
              className="item_wrap__thumbnail__inner_btn item_wrap__thumbnail__inner_btn--clock"
            >
              <div className="rv_icon_btn">
                {IswatchLater ? (
                  <div className="rv_icon_btn__check">
                    <CheckedSvg />
                  </div>
                ) : (
                  <TimeSvg />
                )}
              </div>
              <div className="rv_slider">
                {IswatchLater ? (
                  <div className="rv_slider__check">added</div>
                ) : (
                  <div className="rv_slider__normal">watch later</div>
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
              className="item_wrap__thumbnail__inner_btn item_wrap__thumbnail__inner_btn--queue"
            >
              <div className="rv_icon_btn">
                {IsQueue ? <CheckedSvg /> : <QueueSvg />}
              </div>
              <div className="rv_slider">
                {IsQueue ? (
                  <div className="rv_slider__check">added</div>
                ) : (
                  <div className="rv_slider__text">add to queue</div>
                )}
              </div>
            </button>
            {/* -------------body-------------- */}
          </div>
          <div className="item_wrap__body">
            <div className="item_wrap__body__container">
              <div className="item_wrap__body__text_wrap">
                <div className="rv_results_header">
                  <Link
                    to={`watch/${item.videoId}`}
                    className={`rv_results_header__title rv_results_header__title--${ReturnTheme(
                      Theme
                    )}`}
                  >
                    {TextReducer(item.title, 56)}
                  </Link>
                </div>
                <div
                  className={`rv_results_details rv_results_details--${ReturnTheme(
                    Theme
                  )}`}
                >
                  <Link
                    data-scontent={item.channelTitle}
                    className={`rv_results_details__ch_title rv_results_details__ch_title--${ReturnTheme(
                      Theme
                    )}`}
                    to={`/channel/${item.channelId}`}
                  >
                    {item.channelTitle}
                  </Link>
                  <div className="rv_results_details__ch_dot">•</div>
                  <div className="rv_results_details__sv_tt">
                    <span id={`${item.videoId}-${index}-viewcount`}></span>
                    <div className="rv_results_details__ch_dot">•</div>
                    <span>
                      <Moment fromNow>{item.publishedAt}</Moment>
                    </span>
                  </div>
                </div>
              </div>
              <div className="item_wrap__body__container__menu">
                <DotsSvg />
              </div>
            </div>
            <div
              className={`item_wrap__details item_wrap__details--${ReturnTheme(
                Theme
              )}`}
            >
              {TextReducer(item.description, 121)}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ResultVideoContainer;
