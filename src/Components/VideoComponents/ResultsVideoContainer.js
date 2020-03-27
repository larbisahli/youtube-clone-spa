import React, { useState, useContext, useCallback } from "react";
import "./rvccontainer_style.scss";
import { Link } from "react-router-dom";
import { DotsSvg } from "../Navbar/NavComponents/Svg";
import {
  TextReducer,
  ViewsNumFormatter,
  HandleDuration,
  ReturnTheme
} from "../../config";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { TimeSvg, QueueSvg, CheckedSvg } from "./Svg";
import { ThemeContext } from "../../Context/ThemeContext";

const ResultVideoContainer = React.memo(
  ({ item, index, HandleShowMessageBox }) => {
    // Watch later state
    const [IswatchLater, setIsWatchLater] = useState(false);

    // Theme context
    const [YtTheme] = useContext(ThemeContext);
    const Theme = YtTheme.isDarkTheme;

    // =========================
    //  FETCH VIDEOS DETAILS
    // =========================
    const GetVideoDetails = async id => {
      return await new Promise(resolve => {
        YouTubeAPI.get("videos", {
          params: {
            part: "contentDetails,statistics",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            id: id
          }
        }).then(res => {
          resolve(res);
        });
      });
    };

    const Fetch_Data = (id, index) => {
      GetVideoDetails(id).then(res => {
        if (res.data.items.length >= 1) {
          document.getElementById(
            `${id}-${index}-duration`
          ).textContent = HandleDuration(
            res.data.items[0].contentDetails.duration
          );

          document.getElementById(
            `${id}-${index}-viewcount`
          ).textContent = `${ViewsNumFormatter(
            res.data.items[0].statistics.viewCount
          )} views`;
        }
      });
    };

    const HandleWLClick = useCallback(() => {
      setIsWatchLater(!IswatchLater);
      HandleShowMessageBox(IswatchLater);
    }, [IswatchLater, HandleShowMessageBox]);

    const HandleRImg = useCallback((skeleton_id, index) => {
      // BackgroundColor can be red and you can use it as video duration with the width.

      document.getElementById(`${skeleton_id}-${index}`).style.backgroundColor =
        "transparent";
      document.getElementById(`${skeleton_id}-${index}`).style.height = "auto";
    }, []);

    return (
      <div className="item_section">
        <div className="rv_container">
          <div className="rv_thumbnail_container">
            <Link to={`/watch/${item.videoId}`} className="rv_vid_link_wrap">
              <div
                id={`hresultCha-${index}`}
                className={`rv_v_thumb rv_v_thumb-${ReturnTheme(Theme)}`}
              >
                <img
                  onLoad={() => HandleRImg("hresultCha", index)}
                  src={item.thumbnail}
                  alt=""
                  className="rv_v_img"
                />
              </div>
            </Link>
            {/* -------------head svg-------------- */}
            <div
              id={`${item.videoId}-${index}-duration`}
              className="rv_video_ab rv_video_ab-duration"
            >
              {Fetch_Data(item.videoId, index)}
            </div>
            <button
              onClick={HandleWLClick}
              className="rv_video_ab rv_video_ab-clock"
            >
              <div className="rv_icon">
                {IswatchLater ? (
                  <div className="rv_checked_icon">
                    <CheckedSvg />
                  </div>
                ) : (
                  <TimeSvg />
                )}
              </div>
              <div className="rv_slider_text">
                {IswatchLater ? (
                  <div className="rv_checkedtxt">added</div>
                ) : (
                  <div className="rv_normaltxt">watch later</div>
                )}
              </div>
            </button>
            <button className="rv_video_ab rv_video_ab-queue">
              <div className="rv_icon">
                <QueueSvg />
              </div>
              <div className="rv_slider_text">
                <div className="rv_normaltxt">add to queue</div>
              </div>
            </button>
            {/* -------------Text Area-------------- */}
          </div>
          <div className="search_text_wrapper">
            <div className="search_header">
              <div className="search_wrap">
                <h3 className="search_header_title">
                  <Link
                    to={`watch/${item.videoId}`}
                    className={`search_title_h search_title_h-${ReturnTheme(
                      Theme
                    )}`}
                  >
                    {TextReducer(item.title, 56)}
                  </Link>
                </h3>
                <div
                  className={`search_cv_details search_cv_details-${ReturnTheme(
                    Theme
                  )}`}
                >
                  <Link
                    data-scontent={item.channelTitle}
                    className={`rvch_title rvch_title-${ReturnTheme(Theme)}`}
                    to={`/channel/${item.channelId}`}
                  >
                    {item.channelTitle}
                  </Link>
                  <div className="rvch_dot">•</div>
                  <div className="sv_tt">
                    <span
                      id={`${item.videoId}-${index}-viewcount`}
                      className="numv"
                    ></span>
                    <div className="rvch_dot">•</div>
                    <span>
                      <Moment fromNow>{item.publishedAt}</Moment>
                    </span>
                  </div>
                </div>
              </div>
              <div className="search_menu_h">
                <DotsSvg />
              </div>
            </div>
            <div className={`svw_details svw_details-${ReturnTheme(Theme)}`}>
              {TextReducer(item.description, 121)}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ResultVideoContainer;
