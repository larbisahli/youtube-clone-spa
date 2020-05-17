import React, { memo, useState, useEffect } from "react";
import style from "./sass/wc.module.scss";
import { GetClassName, TextReducer } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { TimeSvg, QueueSvg, CheckedSvg } from "../VideoComponents/Svg";
import Moment from "react-moment";

const WatchContents = memo(({ item, index, HandleLink }) => {
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
    <div className={style.item}>
      <div className={style.wrapper}>
        <div className={style.thumbnail_con}>
          <div className={style.thumb_wrapper}>
            <img
              className={style.img}
              width="168"
              src="https://i.ytimg.com/vi/navpQnqhwvg/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBqxTyCNPmYRuHHfkuh4BDxEw8gIw"
              alt=""
            />
          </div>
          {/* -------------head svg-------------- */}
          <div
            //id={`${item.videoId}-${index}-duration`}
            className={`${style.inner_btn} ${style["inner_btn--duration"]}`}
          >
            {/* {Fetch_Data(item.videoId, index)} */}
            15:34
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
            className={`${style.inner_btn} ${style["inner_btn--clock"]}`}
          >
            <div
              onMouseEnter={() => HandleHoverIn("wl")}
              onMouseLeave={() => HandleHoverOut("wl")}
              className={style.icon_btn}
            >
              {IswatchLater ? (
                <div className={style.icon_btn__check}>
                  <CheckedSvg />
                </div>
              ) : (
                <TimeSvg />
              )}
            </div>
            <div id={`slider-wl-${index}`} className={style.slider}>
              {IswatchLater ? (
                <div className={style.slider__check}>added</div>
              ) : (
                <div className={style.slider__normal}>watch later</div>
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
            className={`${style.inner_btn} ${style["inner_btn--queue"]}`}
          >
            <div
              onMouseEnter={() => HandleHoverIn("q")}
              onMouseLeave={() => HandleHoverOut("q")}
              className={style.icon_btn}
            >
              {IsQueue ? <CheckedSvg /> : <QueueSvg />}
            </div>
            <div id={`slider-q-${index}`} className={style.slider}>
              {IsQueue ? (
                <div className={style.slider__check}>added</div>
              ) : (
                <div className={style.slider__text}>add to queue</div>
              )}
            </div>
          </button>
          {/* -------------body-------------- */}
        </div>
        <div className={style.body}>
          <div className={style.wrap}>
            <div className={style.title}>
              {TextReducer(
                "The MacBook Pro's Biggest Rival - DELL XPS 15 9500 & 17 9700 Laptops",
                56
              )}
            </div>
            <div className={style.details}>
              <span className={style.details__cha_title}>ShortCircuit</span>
              <div className={style.details__stat}>
                <span
                //id={`${item.videoId}-${index}-viewcount`}
                >
                  534k views
                </span>
                <div className={style.details__dot}>•</div>
                <span>
                  3 days ago
                  {/* <Moment fromNow>{item.publishedAt}</Moment> */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WatchContents;
