import React, { Fragment, useState, useContext, useCallback } from "react";
import "./rvccontainer_style.scss";
import { Link } from "react-router-dom";
import {
  TextReducer,
  ViewsNumFormatter,
  numberWithCommas,
  ReturnTheme,
} from "../../config";
import { YouTubeAPI } from "../api/YoutubeApi";
import { SubBellSvg } from "./Svg";
import { ThemeContext } from "../../Context/ThemeContext";

const ResultChannelContainer = React.memo(
  ({ item, index, HandleShowMessageBox }) => {
    // sub btn state
    const [subed, setSubed] = useState(false);

    // Theme context
    const [YtTheme] = useContext(ThemeContext);
    const Theme = YtTheme.isDarkTheme;
    // =========================
    //  FETCH CHANNEL DETAILS
    // =========================
    const GetChannelsDetails = async (id) => {
      return await new Promise((resolve) => {
        YouTubeAPI.get("channels", {
          params: {
            part: "statistics",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            id: id,
          },
        }).then((res) => {
          resolve(res);
        });
      });
    };

    const Fetch_Data = (id, index) => {
      GetChannelsDetails(id).then((res) => {
        if (res.data.items.length >= 1) {
          const vidcount = res.data.items[0].statistics.videoCount;
          const subcount = res.data.items[0].statistics.subscriberCount;
          document.getElementById(
            `${id}-${index}-totalvideo`
          ).textContent = `${numberWithCommas(vidcount)} ${
            vidcount > 1 ? "videos" : "video"
          } `;

          document.getElementById(
            `${id}-${index}-subscribers`
          ).textContent = `${ViewsNumFormatter(subcount)} ${
            subcount > 1 ? "subscribers" : "subscriber"
          }`;
        }
      });
    };

    const HandleSub = useCallback(() => {
      setSubed((prev) => !prev);
      HandleShowMessageBox("", subed, item.videoId, true);
    }, [setSubed, subed, HandleShowMessageBox, item]);

    return (
      <div className="item_section">
        <div className="rv_container">
          <div className="rv_thumbnail_container">
            <Link to={`/watch/${item.videoId}`} className="rv_ch_link_wrap">
              <div className={`rv_ch_thumb rv_ch_thumb-${ReturnTheme(Theme)}`}>
                <img src={item.thumbnail} alt="" className="rv_ch_img" />
              </div>
            </Link>
          </div>
          <div className="ch_text_wrapper">
            <div className="rvch_search_header">
              <div className="search_wrap">
                <h3 className="search_header_title">
                  <Link
                    to={`watch/${item.videoId}`}
                    className={`search_title_h search_title_h-${ReturnTheme(
                      Theme
                    )}`}
                  >
                    {item.title}
                  </Link>
                </h3>
                <div className="search_cv_details ch_padding">
                  <div
                    data-scontent={item.channelTitle}
                    className={`rvch_title rvch_title-${ReturnTheme(Theme)}`}
                    id={`${item.channelId}-${index}-subscribers`}
                  >
                    {Fetch_Data(item.channelId, index)}
                  </div>
                  <div className={`rvch_dot rvch_dot-${ReturnTheme(Theme)}`}>
                    •
                  </div>
                  <div className={`sv_tt sv_tt-${ReturnTheme(Theme)}`}>
                    <span
                      id={`${item.channelId}-${index}-totalvideo`}
                      className="numv"
                    ></span>
                  </div>
                </div>
              </div>
              <div className={`svw_details svw_details-${ReturnTheme(Theme)}`}>
                {TextReducer(item.description, 121)}
              </div>
            </div>
            <div className="rvch_sub_container">
              {subed ? (
                <Fragment>
                  <div onClick={HandleSub} className="rv_subedbtn">
                    <span
                      className={`span_subed span_subed-${ReturnTheme(Theme)}`}
                    >
                      SUBSCRIBED
                    </span>
                    <div className="subbell">
                      <SubBellSvg />
                    </div>
                  </div>
                  <div className="rv_bell_icon"></div>
                </Fragment>
              ) : (
                <div onClick={HandleSub} className="rv_subbtn">
                  <span>SUBSCRIBE</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ResultChannelContainer;
