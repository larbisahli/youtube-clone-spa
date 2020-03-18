import React from "react";
import "./HVContainer.scss";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { Dots } from "../Navbar/NavComponents/Icons";
import { NumFormatter, HandleDuration, TextReducer } from "../../config";
import { Link } from "react-router-dom";
import { TimeIcon, QueueIcon } from "./Icons";

const HomeVideoContainer = React.memo(({ PopularVideo, index }) => {
  const GetChannelsthumbnail = async id => {
    // =========================
    //  FETCH CHANNELS SNIPPET
    //=========================

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
      document.getElementById(`${id}_${index}`).src =
        res.data.items[0].snippet.thumbnails.medium.url;
    });
  };

  return (
    <div className="hvideo_container">
      <div className="hvideo_wrapper">
        <Link
          to={`/watch/${PopularVideo.videoId}`}
          className="hvideo_thumbnail_container"
        >
          <img
            id={`hvideoImg-${index}`}
            onLoad={() => {
              document.getElementById(`hvideoImg-${index}`).style.height =
                "auto";
            }}
            className="hvideo_thumbnail_img"
            src={PopularVideo.thumbnail}
            alt=""
          />
          <div className="hvideo_ab hvideo_ab-duration">
            {HandleDuration(PopularVideo.duration)}
          </div>
          <div className="hvideo_ab hvideo_ab-clock">
            <div className="tt_icon">
              <TimeIcon />
            </div>
            <div className="slider_text">watch Later</div>
          </div>
          <div className="hvideo_ab hvideo_ab-queue">
            <div className="tt_icon">
              <QueueIcon />
            </div>
            <div className="slider_text">add to queue</div>
          </div>
        </Link>
        <div className="hvideo_title_container">
          <div className="hvideo_pro_wrapper">
            <Link
              to={`/channel/${PopularVideo.channelId}`}
              className="hvideo_pro_img"
            >
              <img
                // making sure the id is unique
                id={`${PopularVideo.channelId}_${index}`}
                className="hvideo_img"
                height="36"
                width="36"
                src={Fetch_Data(PopularVideo.channelId, index)}
                alt=""
              />
            </Link>
          </div>
          <div className="text_area">
            <Link
              to={`/watch/${PopularVideo.videoId}`}
              className="text_con_txt"
            >
              <div title={PopularVideo.title} className="title_txt">
                {TextReducer(PopularVideo.title)}
              </div>
            </Link>
            <Link
              data-content={PopularVideo.channelTitle}
              className="ch_title"
              to={`/channel/${PopularVideo.channelId}`}
            >
              {PopularVideo.channelTitle}
            </Link>
            <div className="xxs">
              <span className="numv">{`${NumFormatter(
                PopularVideo.viewCount
              )} views`}</span>
              <span>
                <Moment fromNow>{PopularVideo.publishedAt}</Moment>
              </span>
            </div>
          </div>
          <div className="hvideo_dots">
            <Dots />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomeVideoContainer;
