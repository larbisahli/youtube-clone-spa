import React, { useCallback, useState, Fragment } from "react";
import "./HVContainer.scss";
import Moment from "react-moment";
import { YouTubeAPI } from "../api/YoutubeApi";
import { Dots } from "../Navbar/NavComponents/Icons";
import { NumFormatter, HandleDuration, TextReducer } from "../../config";
import { Link } from "react-router-dom";
import { TimeIcon, QueueIcon, CheckedVIcon } from "./Icons";

const HomeVideoContainer = React.memo(
  ({ PopularVideo, index, HandleShowMessageBox }) => {
    // Watch later state

    const [watchLater, setWatchLater] = useState(false);

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

    const HandleWLClick = useCallback(() => {
      setWatchLater(!watchLater);
      HandleShowMessageBox(watchLater);
    }, [watchLater, HandleShowMessageBox]);

    return (
      <div className="hvideo_container">
        <div className="hvideo_wrapper">
          <div className="hvideo_thumbnail_container">
            <Link to={`/watch/${PopularVideo.videoId}`}>
              <Fragment>
                <img
                  id={`hvideoImg-${index}`}
                  className="hvideo_thumbnail_img"
                  onLoad={() => {
                    document.getElementById(`hvideoImg-${index}`).style.height =
                      "auto";
                  }}
                  src={PopularVideo.thumbnail}
                  alt=""
                />
              </Fragment>
            </Link>
            <div className="hvideo_ab hvideo_ab-duration">
              {HandleDuration(PopularVideo.duration)}
            </div>
            <button
              onClick={HandleWLClick}
              className="hvideo_ab hvideo_ab-clock"
            >
              <div className="tt_icon">
                {watchLater ? (
                  <div className="checked_icon">
                    <CheckedVIcon />
                  </div>
                ) : (
                  <TimeIcon />
                )}
              </div>
              <div className="slider_text">
                {watchLater ? (
                  <div className="checkedtxt">added</div>
                ) : (
                  <div className="normaltxt">watch later</div>
                )}
              </div>
            </button>
            <button className="hvideo_ab hvideo_ab-queue">
              <div className="tt_icon">
                <QueueIcon />
              </div>
              <div className="slider_text">
                <div className="normaltxt">add to queue</div>
              </div>
            </button>
          </div>
          <div className="hvideo_title_container">
            <div className="hvideo_pro_wrapper">
              <Link
                to={`/channel/${PopularVideo.channelId}`}
                className="hvideo_pro_img"
              >
                <Fragment>
                  <img
                    // making sure the id is unique
                    className="hvideo_img"
                    id={`${PopularVideo.channelId}_${index}`}
                    src={Fetch_Data(PopularVideo.channelId, index)}
                    alt=""
                  />
                </Fragment>
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
  }
);

export default HomeVideoContainer;
