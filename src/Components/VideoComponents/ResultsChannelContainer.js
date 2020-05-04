import React, { Fragment, useState, useContext, useCallback } from "react";
import "./sass/rvccontainer_style.scss";
import { Link } from "react-router-dom";
import {
  TextReducer,
  ViewsNumFormatter,
  numberWithCommas,
  ReturnTheme,
} from "../../utils";
import { YouTubeAPI } from "../api/YoutubeApi";
import { SubBellSvg } from "./Svg";
import { ThemeContext } from "../../Context";

const ResultChannelContainer = React.memo(
  ({ item, index, HandleShowMessageBox, FilterState }) => {
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

          const totalVideoIdElement = document.getElementById(
            `${id}-${index}-totalvideo`
          );
          const subsIdElement = document.getElementById(
            `${id}-${index}-subscribers`
          );

          if (totalVideoIdElement) {
            totalVideoIdElement.textContent = `${numberWithCommas(vidcount)} ${
              vidcount > 1 ? "videos" : "video"
            } `;
          }

          if (subsIdElement) {
            subsIdElement.textContent = `${ViewsNumFormatter(subcount)} ${
              subcount > 1 ? "subscribers" : "subscriber"
            }`;
          }
        }
      });
    };

    const IsNotChannel = () => {
      if (FilterState) {
        if (FilterState.type === "channel") {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };

    const HandleSub = useCallback(() => {
      setSubed((prev) => !prev);
      HandleShowMessageBox("", subed, item.videoId, true);
    }, [setSubed, subed, HandleShowMessageBox, item]);

    return (
      <Fragment>
        <div className="item_section">
          <div className="item_wrap">
            <div className="item_wrap__thumbnail">
              <Link
                to={`/watch/${item.videoId}`}
                className="item_wrap__thumbnail__channel"
              >
                <div
                  className={`rv_ch_thumb rv_ch_thumb--${ReturnTheme(Theme)}`}
                >
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="rv_ch_thumb__img"
                  />
                </div>
              </Link>
            </div>
            {/* -------------body------------- */}
            <div className="item_wrap__channel_wrap">
              <div className="item_wrap__channel_wrap__header">
                <div className="item_wrap__body__text_wrap">
                  <div className="rv_results_header">
                    <Link
                      to={`watch/${item.videoId}`}
                      className={`rv_results_header__title rv_results_header__title--${ReturnTheme(
                        Theme
                      )}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div
                    style={{ paddingTop: "10px" }}
                    className="rv_results_details"
                  >
                    <div
                      data-scontent={item.channelTitle}
                      className={`rv_results_details__ch_title rv_results_details__ch_title--${ReturnTheme(
                        Theme
                      )}`}
                      id={`${item.channelId}-${index}-subscribers`}
                    >
                      {Fetch_Data(item.channelId, index)}
                    </div>
                    <div
                      className={`rv_results_details__ch_dot rv_results_details__ch_dot--${ReturnTheme(
                        Theme
                      )}`}
                    >
                      •
                    </div>
                    <div
                      className={`rv_results_details__sv_tt rv_results_details__sv_tt--${ReturnTheme(
                        Theme
                      )}`}
                    >
                      <span
                        id={`${item.channelId}-${index}-totalvideo`}
                        className="numv"
                      ></span>
                    </div>
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
              <div className="channel_subbtn_container">
                {subed ? (
                  <Fragment>
                    <div
                      onClick={HandleSub}
                      className="channel_subbtn_container__subed"
                    >
                      <span
                        className={`span_subed span_subed--${ReturnTheme(
                          Theme
                        )}`}
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
                  <div
                    onClick={HandleSub}
                    className="channel_subbtn_container__sub"
                  >
                    <span>SUBSCRIBE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {IsNotChannel() && (
          <Fragment>
            <div
              className={`cha_uniq--line line line--${ReturnTheme(Theme)}`}
            ></div>
            <div
              className={`cha_uniq--title cha_uniq--title--${ReturnTheme(
                Theme
              )}`}
            >
              Latest from {item.channelTitle}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
);

export default ResultChannelContainer;
