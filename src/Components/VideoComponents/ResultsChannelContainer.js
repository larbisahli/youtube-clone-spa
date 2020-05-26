import React, { Fragment, useState, memo, useCallback } from "react";
import styles from "./sass/rv.module.scss";
import { Link } from "react-router-dom";
import {
  TextReducer,
  ViewsNumFormatter,
  numberWithCommas,
  ReturnTheme,
  GetClassName,
} from "../../utils";
import { SubBellSvg } from "./Svg";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/useFetch";

const ResultChannelContainer = ({
  item,
  index,
  HandleShowMessageBox,
  FilterState,
}) => {
  // sub btn state
  const [subed, setSubed] = useState(false);

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // =================================
  //     FETCH CHANNELS SNIPPET
  // =================================

  const snippet = useFetch(item.channelId, "channels", "statistics");

  const Fetch_Data = (id, index) => {
    if (snippet) {
      const totalVideoIdElement = document.getElementById(
        `${id}-${index}-totalvideo`
      );
      const subsIdElement = document.getElementById(
        `${id}-${index}-subscribers`
      );

      if (totalVideoIdElement && Object.keys(snippet).length !== 0) {
        const vidcount = snippet.statistics.videoCount;

        totalVideoIdElement.textContent = `${numberWithCommas(vidcount)} ${
          vidcount > 1 ? "videos" : "video"
        } `;
      }

      if (subsIdElement && Object.keys(snippet).length !== 0) {
        const subcount = snippet.statistics.subscriberCount;
        subsIdElement.textContent = `${ViewsNumFormatter(subcount)} ${
          subcount > 1 ? "subscribers" : "subscriber"
        }`;
      }
    }
  };

  const IsNotChannel = () => {
    if (FilterState) return !(FilterState.type === "channel");
    return true;
  };

  const HandleSub = useCallback(() => {
    setSubed((prev) => !prev);
    HandleShowMessageBox("", subed, item.videoId, true);
  }, [setSubed, subed, HandleShowMessageBox, item]);

  return (
    <Fragment>
      <div className={styles.item_section}>
        <div className={styles.item_wrap}>
          <div className={styles.thumbnail}>
            <Link to={`/watch/${item.videoId}`} className={styles.channel}>
              <div className={GetClassName(styles, "ch_thumb", Theme)}>
                <img
                  src={item.thumbnail}
                  alt=""
                  className={styles.ch_thumb__img}
                />
              </div>
            </Link>
          </div>
          {/* -------------body------------- */}
          <div className={styles.channel_wrap}>
            <div className={styles.channel_wrap__header}>
              <div className={styles.body__text_wrap}>
                <div className={styles.results_header}>
                  <Link
                    to={`watch/${item.videoId}`}
                    className={GetClassName(
                      styles,
                      "results_header__title",
                      Theme
                    )}
                  >
                    {item.title}
                  </Link>
                </div>
                <div style={{ paddingTop: "10px" }} className={styles.details}>
                  <div
                    data-scontent={item.channelTitle}
                    className={GetClassName(styles, "details__ch_title", Theme)}
                    id={`${item.channelId}-${index}-subscribers`}
                  >
                    {Fetch_Data(item.channelId, index)}
                  </div>
                  <div
                    className={GetClassName(styles, "details__ch_dot", Theme)}
                  >
                    •
                  </div>
                  <div
                    className={GetClassName(styles, "details__sv_tt", Theme)}
                  >
                    <span id={`${item.channelId}-${index}-totalvideo`}></span>
                  </div>
                </div>
              </div>
              <div
                className={GetClassName(styles, "item_wrap__details", Theme)}
              >
                {TextReducer(item.description, 121)}
              </div>
            </div>
            <div className={styles.subbtn}>
              {subed ? (
                <Fragment>
                  <div onClick={HandleSub} className={styles.subbtn__subed}>
                    <span className={GetClassName(styles, "span_subed", Theme)}>
                      SUBSCRIBED
                    </span>
                    <div className={styles.subbell}>
                      <SubBellSvg />
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div onClick={HandleSub} className={styles.subbtn__sub}>
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
            className={`${styles.cha_uniq__line} line line--${ReturnTheme(
              Theme
            )}`}
          ></div>
          <div className={GetClassName(styles, "cha_uniq__title", Theme)}>
            Latest from {item.channelTitle}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default memo(ResultChannelContainer);
