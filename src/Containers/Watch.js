import React, { useEffect, useState, useCallback, memo } from "react";
import style from "./Sass/watch.module.scss";
import { PageLocation, GetClassName } from "../utils";
import { useLocation } from "react-router";
import { VideoPlayer } from "../Components";
import { Seek, DestroyIframe } from "../Components/ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  SetUrlLocationAction,
  RemoveAllQueueAction,
  SetGuideModeAction,
  HideGuideAction,
  ShowGuideAction,
} from "../redux";
import { useFetch } from "../Components/hooks/useFetch";
import WatchContents from "../Components/VideoComponents/WatchContents";
import { Like, DisLike } from "../Containers/Svg";

let SeekSeen = false;

const Watch = memo(() => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // urlLocation
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);

  // Guide
  const Guide = useSelector((state) => state.Guide);

  // Queue
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);

  // dispatch
  const dispatch = useDispatch();

  //
  const [VideoLoaded, setVideoLoaded] = useState(false);

  const [fade, setFade] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  // A custom hook that builds on useLocation to parse
  // the query string for you.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const videoId = query.get("v");

  const HandleQueryParams = useCallback(
    (param) => {
      const q = query.get(param);
      if (q) {
        return q;
      } else {
        return 0;
      }
    },
    [query]
  );

  useEffect(() => {
    return () => {
      if (window.innerWidth < 1340 && Guide.guideMode === 1) {
        dispatch(HideGuideAction());
        dispatch(SetGuideModeAction(2));
      }

      if (window.innerWidth > 1340) {
        dispatch(ShowGuideAction());
        dispatch(SetGuideModeAction(1));
      }
    };
  }, [dispatch, Guide]);

  // ================
  //   Handle Click
  // ================

  const HundleClick = () => {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 300);
  };

  // toggle

  const handleCheckboxChange = (event) => {
    setAutoPlay(event.target.checked);
  };

  const onPlayerStateChange = useCallback(
    (event) => {
      console.log("event.data :----->> ", event.data);
      switch (event.data) {
        case 3:
          setVideoLoaded(true);
          break;
        case 1:
          // 1 means the player is ready to play
          if (!SeekSeen) {
            if (HandleQueryParams("t") !== 0) {
              Seek(HandleQueryParams("t"));
              SeekSeen = true;
            }
          }
          break;
        default:
          break;
      }
    },
    [HandleQueryParams]
  );

  // const data = useFetch(videoId, "videos", "player");

  // console.log("data :>> ", data);

  useEffect(() => {
    return () => {
      // Clean Up
      DestroyIframe();

      if (QueueList.length !== 0) {
        dispatch(RemoveAllQueueAction());
      }
      // restore the global var to default for the next video seek
      SeekSeen = false;
    };
  }, [dispatch, QueueList]);

  return (
    <div className={style.container}>
      {/* ============== primary ============== */}
      <div className={style.primary}>
        {/* ====== player ====== */}
        <div className={style.player_container}>
          <div className={style.player_wrap}>
            <div
              className={`${style.player_wrap__inner} ${
                style[
                  `player_container__inner--${
                    VideoLoaded ? "visible" : "hidden"
                  }`
                ]
              }`}
            >
              <VideoPlayer
                PlayerId="watch-player"
                check={true}
                HandlePlayingVideo={() => HandleQueryParams("v")}
                onPlayerStateChange={onPlayerStateChange}
                //onPlayerError={onPlayerError}
              />
            </div>
          </div>
        </div>
        {/* ====== body ====== */}
        <div className={style.info}>
          <div className={style.info_contents}>
            <div className={style.main_title}>
              TCL Makes Cheap TVs and... Phones?? - 10L & 10 Pro
            </div>
            <div className={style.stat_info}>
              <div className={style.info_text}>
                <div className={style.count}>414 views</div>
                <div className={style.date}>
                  <div className={style.dot}>•</div>
                  <span>May 16, 2020</span>
                </div>
              </div>
              <div className={style.menu_container}>
                <div className={style.menu}>
                  <div className={style.likearea}>
                    <div className={style.iconcon}>
                      <div className={style.icon}>
                        <Like />
                      </div>
                      <span>28k</span>
                    </div>
                    <div className={style.iconcon}>
                      <div className={style.icon}>
                        <DisLike />
                      </div>
                      <span>370</span>
                    </div>
                  </div>
                  <div className={style.iconcon}>
                    <div className={style.icon}>
                      <DisLike />
                    </div>
                    <span>share</span>
                  </div>
                  <div className={style.iconcon}>
                    <div className={style.icon}>
                      <DisLike />
                    </div>
                    <span>save</span>
                  </div>
                  <div className={style.iconcon}>
                    <div className={style.icon}>
                      <DisLike />
                    </div>
                  </div>
                </div>
                <div className={style.sentiment}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.meta}>meta</div>
        <div className={style.comments}>comments</div>
      </div>
      {/* ============== secondary ============== */}
      <div className={style.secondary}>
        <div className={style.header}>
          <div className={style.head}>
            <div className={style.upne_text}>Up next</div>
            <div className={style.toggle}>
              <div className={style.toggle__txt}>AUTOPLAY</div>
              <label className={GetClassName(style, "switch", Theme)}>
                <input
                  type="checkbox"
                  className={style.switch__toggle}
                  checked={autoPlay}
                  onChange={handleCheckboxChange}
                />
                <span className={style.switch__btn} onClick={HundleClick}>
                  <div
                    className={
                      style.circle +
                      (fade
                        ? autoPlay
                          ? ` ${style["circle--on"]}`
                          : ` ${style["circle--off"]}`
                        : "")
                    }
                  ></div>
                </span>
              </label>
            </div>
          </div>
          <WatchContents />
          <div className={style.line}></div>
          {[...Array(8)].map((e, i) => {
            return <WatchContents key={i} />;
          })}
        </div>
      </div>
    </div>
  );
});

export default Watch;
