import React, { useState } from "react";
import "./RVContainer.scss";
import { Link } from "react-router-dom";
import { Dots } from "../Navbar/NavComponents/Icons";
import { TextReducer, NumFormatter, HandleDuration } from "../../config";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { TimeIcon, QueueIcon, CheckedVIcon } from "./Icons";

const ResultVideoContainer = React.memo(({ item, index }) => {
  // Watch later state

  const [watchLater, setWatchLater] = useState(false);
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
        ).textContent = `${NumFormatter(
          res.data.items[0].statistics.viewCount
        )} views`;
      }
    });
  };

  return (
    <div className="item_section">
      <div className="rv_container">
        <div className="rv_thumbnail_container">
          <Link to={`/watch/${item.videoId}`} className="rvh_link_wrap">
            <div className="scw">
              <img src={item.thumbnail} alt="thumbnail" className="scw_img" />
            </div>
          </Link>
          {/* --------------------------- */}
          <div
            id={`${item.videoId}-${index}-duration`}
            className="rv_video_ab rv_video_ab-duration"
          >
            {Fetch_Data(item.videoId, index)}
          </div>
          <button
            //onClick={HandleWLClick}
            className="rv_video_ab rv_video_ab-clock"
          >
            <div className="rv_icon">
              {watchLater ? (
                <div className="rv_checked_icon">
                  <CheckedVIcon />
                </div>
              ) : (
                <TimeIcon />
              )}
            </div>
            <div className="rv_slider_text">
              {watchLater ? (
                <div className="rv_checkedtxt">added</div>
              ) : (
                <div className="rv_normaltxt">watch later</div>
              )}
            </div>
          </button>
          <button className="rv_video_ab rv_video_ab-queue">
            <div className="rv_icon">
              <QueueIcon />
            </div>
            <div className="rv_slider_text">
              <div className="rv_normaltxt">add to queue</div>
            </div>
          </button>
          {/* --------------------------- */}
        </div>
        <div className="search_text_wrapper">
          <div className="search_header">
            <div className="search_wrap">
              <h3 className="search_header_title">
                <Link to={`watch/${item.videoId}`} className="search_title_h">
                  {TextReducer(item.title, 56)}
                </Link>
              </h3>
              <div className="search_cv_details">
                <Link
                  data-scontent={item.channelTitle}
                  className="rvch_title"
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
              <Dots />
            </div>
          </div>
          <div className="svw_details">
            {TextReducer(item.description, 121)}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultVideoContainer;
