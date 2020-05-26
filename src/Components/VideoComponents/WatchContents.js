import React, { memo, useState, useEffect } from "react";
import styles from "./sass/wc.module.scss";
import {
  GetClassName,
  TextReducer,
  ViewsNumFormatter,
  HandleDuration,
} from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { TimeSvg, QueueSvg, CheckedSvg } from "../VideoComponents/Svg";
import Moment from "react-moment";

const WatchContents = ({ item, index, HandleLink, PopularVideo }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // WLV
  const WatchLater = useSelector((state) => state.WLV.WL);

  // Queue
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);

  // dispatch
  const dispatch = useDispatch();

  const [IswatchLater, setIsWatchLater] = useState(
    // WatchLater.some((wl) => wl.videoId === item.videoId)
    false
  );

  const [IsQueue, setIsQueue] = useState(
    // QueueList.some((que) => que.videoId === item.videoId)
    false
  );

  // Slider HandleHoverIn

  const HandleHoverIn = (value) => {
    const slider = document.getElementById(`slider-${value}-${index}`);

    if (slider) {
      slider.style.position = "relative";
      slider.style.zIndex = "1";
      slider.style.transform = "translateX(0px)";
    }
  };

  // Slider HandleHoverOut

  const HandleHoverOut = (value) => {
    const slider = document.getElementById(`slider-${value}-${index}`);

    if (slider) {
      slider.style.zIndex = "0";
      slider.style.transform = "translateX(135px)";
      setTimeout(() => {
        slider.style.position = "absolute";
        // Note: transition: transform 0.35s ease-in-out;
      }, 350);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.wrapper}>
        <div className={styles.thumbnail_con}>
          <div className={styles.thumb_wrapper}>
            <img
              className={styles.img}
              width="168"
              // placeholder because it has a small image
              src={PopularVideo && PopularVideo.placeholder}
              alt=""
            />
          </div>
          {/* -------------head svg-------------- */}
          <div
            //id={`${item.videoId}-${index}-duration`}
            className={`${styles.inner_btn} ${styles["inner_btn--duration"]}`}
          >
            {HandleDuration(PopularVideo ? PopularVideo.duration : "")}
          </div>
          <button
            // onClick={() =>
            //   HandleWLClick(
            //     item.title,
            //     document.getElementById(`${item.videoId}-${index}-duration`)
            //       .innerHTML,
            //     item.videoId,
            //     item.channelTitle,
            //     item.channelId,
            //     item.thumbnail,
            //     IswatchLater
            //   )
            // }
            className={`${styles.inner_btn} ${styles["inner_btn--clock"]}`}
          >
            <div
              onMouseEnter={() => HandleHoverIn("wl")}
              onMouseLeave={() => HandleHoverOut("wl")}
              className={styles.icon_btn}
            >
              {IswatchLater ? (
                <div className={styles.icon_btn__check}>
                  <CheckedSvg />
                </div>
              ) : (
                <TimeSvg />
              )}
            </div>
            <div id={`slider-wl-${index}`} className={styles.slider}>
              {IswatchLater ? (
                <div className={styles.slider__check}>added</div>
              ) : (
                <div className={styles.slider__normal}>watch later</div>
              )}
            </div>
          </button>
          <button
            // onClick={() =>
            //   HandleQueueClick(
            //     item.title,
            //     document.getElementById(`${item.videoId}-${index}-duration`)
            //       .innerHTML,
            //     item.videoId,
            //     item.channelTitle,
            //     item.channelId,
            //     item.thumbnail,
            //     IsQueue
            //   )
            // }
            className={`${styles.inner_btn} ${styles["inner_btn--queue"]}`}
          >
            <div
              onMouseEnter={() => HandleHoverIn("q")}
              onMouseLeave={() => HandleHoverOut("q")}
              className={styles.icon_btn}
            >
              {IsQueue ? <CheckedSvg /> : <QueueSvg />}
            </div>
            <div id={`slider-q-${index}`} className={styles.slider}>
              {IsQueue ? (
                <div className={styles.slider__check}>added</div>
              ) : (
                <div className={styles.slider__text}>add to queue</div>
              )}
            </div>
          </button>
          {/* -------------body-------------- */}
        </div>
        {PopularVideo ? (
          <div className={styles.body}>
            <div className={styles.wrap}>
              <div className={styles.title}>
                {TextReducer(PopularVideo ? PopularVideo.title : "", 56)}
              </div>
              <div className={styles.details}>
                <div className={styles.details__cha_title}>
                  {PopularVideo && PopularVideo.channelTitle}
                </div>

                <div className={styles.details__stat}>
                  <div>
                    {`${ViewsNumFormatter(
                      PopularVideo && PopularVideo.viewCount
                    )} views`}
                  </div>
                  <div className={styles.details__dot}>•</div>
                  <div>
                    <Moment fromNow>
                      {PopularVideo && PopularVideo.publishedAt}
                    </Moment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.sklt_con}>
            <div className={styles.sklt_con__txt1}></div>
            <div className={styles.sklt_con__txt2}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(WatchContents);
