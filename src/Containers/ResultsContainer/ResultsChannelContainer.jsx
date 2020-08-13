import React, { Fragment, useState, memo, useCallback } from "react";
import styles from "./scss/rv.module.scss";
import { Link } from "react-router-dom";
import { ViewsNumFormatter, numberWithCommas } from "../../utils";
import { ReactComponent as SubBellSvg } from "../../assets/icon/SubBell.svg";
import { useFetch } from "../../Components/Hooks/useFetch";
import { ProfileImg } from "../../Components/CompUtils";

const ResultsChannelContainer = ({
  item,
  index,
  HandleShowMessageBox,
  FilterState,
}) => {
  const [subed, setSubed] = useState(false);

  // FETCH CHANNELS SNIPPET
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
            <Link to={`/channel/${item.channelId}`} className={styles.channel}>
              <ProfileImg width={"136"} height={"136"} src={item.thumbnail} />
            </Link>
          </div>
          {/* -------------body------------- */}
          <div className={styles.channel_wrap}>
            <div className={styles.channel_wrap__header}>
              <div className={styles.body__text_wrap}>
                <div className={styles.results_header}>
                  <Link
                    to={`/channel/${item.channelId}`}
                    className={styles.results_header__title}
                  >
                    {item.title}
                  </Link>
                </div>
                <div style={{ paddingTop: "10px" }} className={styles.details}>
                  <div
                    data-scontent={item.channelTitle}
                    className={styles.details__ch_title}
                    id={`${item.channelId}-${index}-subscribers`}
                  >
                    {Fetch_Data(item.channelId, index)}
                  </div>
                  <div className={styles.details__ch_dot}>•</div>
                  <div className={styles.details__sv_tt}>
                    <span id={`${item.channelId}-${index}-totalvideo`}></span>
                  </div>
                </div>
              </div>
              <div className={styles.item_wrap__details}>
                {item.description}
              </div>
            </div>
            <div className={styles.subbtn}>
              {subed ? (
                <Fragment>
                  <div onClick={HandleSub} className={styles.subbtn__subed}>
                    <span className={styles.span_subed}>SUBSCRIBED</span>
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
          <div className={`${styles.cha_uniq__line} line`}></div>
          <div className={styles.cha_uniq__title}>
            Latest from {item.channelTitle}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default memo(ResultsChannelContainer);
