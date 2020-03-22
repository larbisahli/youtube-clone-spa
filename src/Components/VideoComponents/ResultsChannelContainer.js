import React, { Fragment, useState } from "react";
import "./RVContainer.scss";
import { Link } from "react-router-dom";
import { TextReducer, NumFormatter, numberWithCommas } from "../../config";
import { YouTubeAPI } from "../api/YoutubeApi";
import { SubBellIcon } from "./Icons";

const ResultChannelContainer = React.memo(({ item, index }) => {
  const [subed, setSubed] = useState(false);
  // =========================
  //  FETCH CHANNEL DETAILS
  // =========================
  const GetChannelsDetails = async id => {
    return await new Promise(resolve => {
      YouTubeAPI.get("channels", {
        params: {
          part: "statistics",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          id: id
        }
      }).then(res => {
        resolve(res);
      });
    });
  };

  const Fetch_Data = (id, index) => {
    GetChannelsDetails(id).then(res => {
      if (res.data.items.length >= 1) {
        const vidcount = res.data.items[0].statistics.videoCount;
        const subcount = res.data.items[0].statistics.subscriberCount;
        console.log("channels=>", subcount);
        document.getElementById(
          `${id}-${index}-totalvideo`
        ).textContent = `${numberWithCommas(vidcount)} ${
          vidcount > 1 ? "videos" : "video"
        } `;

        document.getElementById(
          `${id}-${index}-subscribers`
        ).textContent = `${NumFormatter(subcount)} ${
          subcount > 1 ? "subscribers" : "subscriber"
        }`;
      }
    });
  };

  return (
    <div className="item_section">
      <div className="rv_container">
        <div className="rv_thumbnail_container">
          <Link to={`/watch/${item.videoId}`} className="rv_link_ch_wrap">
            <div className="scw_pro">
              <img src={item.thumbnail} alt="thumbnail" className="scw_img" />
            </div>
          </Link>
        </div>
        <div className="ch_text_wrapper">
          <div className="rvch_search_header">
            <div className="search_wrap">
              <h3 className="search_header_title">
                <Link to={`watch/${item.videoId}`} className="search_title_h">
                  {item.title}
                </Link>
              </h3>
              <div className="search_cv_details ch_padding">
                <div
                  data-scontent={item.channelTitle}
                  className="rvch_title"
                  id={`${item.channelId}-${index}-subscribers`}
                >
                  {Fetch_Data(item.channelId, index)}
                </div>
                <div className="rvch_dot">•</div>
                <div className="sv_tt">
                  <span
                    id={`${item.channelId}-${index}-totalvideo`}
                    className="numv"
                  ></span>
                </div>
              </div>
            </div>
            <div className="svw_details">
              {TextReducer(item.description, 121)}
            </div>
          </div>
          <div className="rvch_sub_container">
            {subed ? (
              <Fragment>
                <div
                  onClick={() => setSubed(prev => !prev)}
                  className="rv_subedbtn"
                >
                  <span>SUBSCRIBED</span>
                  <div className="subbell">
                    <SubBellIcon />
                  </div>
                </div>
                <div className="rv_bell_icon"></div>
              </Fragment>
            ) : (
              <div
                onClick={() => setSubed(prev => !prev)}
                className="rv_subbtn"
              >
                <span>SUBSCRIBE</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultChannelContainer;
