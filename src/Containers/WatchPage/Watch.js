import React, { useEffect, useState, useCallback, memo, Fragment } from "react";
import styles from "./watch.module.scss";
import {
  numberWithCommas,
  GetClassName,
  ViewsNumFormatter,
  TextReducer,
  PageLocation,
} from "../../utils";
import { useLocation } from "react-router";
import { VideoPlayer } from "../../Components";
import { Seek, DestroyIframe, Spinner } from "../../Components/ComponentsUtils";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveAllQueueAction,
  SetGuideModeAction,
  HideGuideAction,
  ShowGuideAction,
  SetUrlLocationAction,
  CloseMessageAction,
  SetMessageAction,
} from "../../redux";
import { useFetch } from "../../Components/hooks/useFetch";
import { useMeasure } from "../../Components/hooks/useMeasure";
import { Like, DisLike, Share, Save, SortBySvg } from "../Svg";
import { SubBellSvg } from "../ResultsPage/Components/Svg";
import { DotsSvg } from "../../Components/Navbar/NavComponents/Svg";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Parent, Child, CommentsContents } from "./Components";

let cx = classNames.bind(styles);

let SeekSeen = false;

const Watch = () => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // urlLocation
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);

  // Guide
  const Guide = useSelector((state) => state.Guide);

  // fetch data
  const PopularVideos = useSelector((state) => state.VideosRequest.items);

  // Queue
  //const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);

  // dispatch
  const dispatch = useDispatch();

  //
  const [VideoLoaded, setVideoLoaded] = useState(false);

  // sub btn state
  const [subed, setSubed] = useState(false);

  const [autoPlay, setAutoPlay] = useState(true);

  //

  const [visible, setVisible] = useState(window.innerWidth <= 1016);

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

  // ---->

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
  }, []);

  // ---->

  useEffect(() => {
    const UrlLoc = PageLocation();

    if (UrlLoc !== UrlLocation) {
      dispatch(SetUrlLocationAction(UrlLoc));
    }
  }, [UrlLocation, dispatch]);

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
        case 0:
          if (autoPlay) {
            // play next video when the current video has finished
            //dispatch(PlayNextQueueAction());
          }
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
    [HandleQueryParams, autoPlay]
  );

  // ====================================
  //           Message box Handling
  // ====================================

  // Closing Message box
  const HandleClosingMessageBox = useCallback(() => {
    dispatch(CloseMessageAction());
  }, [dispatch]);

  // Show Message box
  const HandleShowMessageBox = useCallback(
    (MassageFrom, state, id = "", ch = false) => {
      if (!ch) {
        let msg;
        let btnMsg;
        if (MassageFrom === "wl") {
          msg = !state ? "Saved to Watch later" : "Removed from Watch later";
          btnMsg = !state ? "UNDO" : "";
        }

        dispatch(
          SetMessageAction({
            message: msg,
            btnText: btnMsg,
            from: MassageFrom,
            id: id,
          })
        );
      } else {
        dispatch(
          SetMessageAction({
            message: !state ? "Subscription added" : "Subscription removed",
            btnText: "",
            from: "",
            id: "",
          })
        );
      }

      setTimeout(() => {
        HandleClosingMessageBox();
      }, 4000);
    },
    [HandleClosingMessageBox, dispatch]
  );

  const data = useFetch(videoId, "commentThreads", "snippet", "videoId");

  const videodata = useFetch(videoId, "videos", "statistics,snippet");

  const GetChannelData = (channelId) => {
    const cha_data = useFetch(channelId, "channels", "statistics,snippet");

    const cha_subs = document.getElementById("cha-sub");
    const cha_title = document.getElementById("cha-title");
    const cha_img = document.getElementById("cha-img");

    if (cha_subs && cha_title && cha_data.length !== 0) {
      const subcount = cha_data.statistics.subscriberCount;
      cha_subs.textContent = `${ViewsNumFormatter(subcount)} ${
        subcount > 1 ? "subscribers" : "subscriber"
      }`;

      cha_title.textContent = cha_data.snippet.title;

      cha_img.src = cha_data.snippet.thumbnails.medium.url;
    }
  };

  const ProgressBar = (like, dislike) => {
    const bar = document.getElementById("progress-bar");

    if (bar && videodata.length !== 0) {
      const total = parseInt(dislike) + parseInt(like);
      bar.style.width = `${parseInt((like / total) * 100)}%`;
    }
  };

  // ================================
  const innerWidth = useMeasure();

  useEffect(() => {
    if (innerWidth <= 1016) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [innerWidth]);

  // ===========================

  useEffect(() => {
    return () => {
      // Clean Up
      DestroyIframe();

      // restore the global var to default for the next video seek
      SeekSeen = false;
    };
  }, [dispatch]);

  //----------------------

  const HandleSub = useCallback(() => {
    setSubed((prev) => !prev);
    HandleShowMessageBox("", subed, "", true);
  }, [setSubed, HandleShowMessageBox, subed]);

  //----------------------

  return (
    <div className={styles.container}>
      {/* ============== PRIMARY ============== */}
      <div className={styles.primary}>
        {/* ====== PLAYER ====== */}
        <div className={styles.player_container}>
          <div className={styles.player_wrap}>
            <div
              className={cx("player_wrap__inner", {
                "player_container__inner--visible": VideoLoaded,
                "player_container__inner--hidden": !VideoLoaded,
              })}
            >
              <VideoPlayer
                PlayerId="watch-player"
                check={true}
                HandlePlayingVideo={() => HandleQueryParams("v")}
                onPlayerStateChange={onPlayerStateChange}
                onPlayerError={() => {}}
              />
            </div>
          </div>
        </div>
        {/* ====== VIDEO DETAILS AREA ====== */}
        <div className={styles.info}>
          <div className={styles.info_contents}>
            <div className={styles.main_title}>
              {videodata.length !== 0 ? videodata.snippet.title : ""}
            </div>
            <div className={styles.stat_info}>
              <div className={styles.info_text}>
                <div className={styles.count}>
                  {numberWithCommas(
                    videodata.length !== 0 ? videodata.statistics.viewCount : 0
                  )}{" "}
                  views
                </div>
                <div className={styles.date}>
                  <div className={styles.dot}>•</div>
                  <span>
                    {videodata.length !== 0 ? (
                      <Moment format="MMM D YYYY">
                        {videodata.snippet.publishedAt}
                      </Moment>
                    ) : null}
                  </span>
                </div>
              </div>
              <div className={styles.menu_container}>
                <div className={styles.menu}>
                  <div className={styles.likearea}>
                    <div className={styles.iconcon}>
                      <div className={styles.icon}>
                        <Like />
                      </div>
                      <span>
                        {ViewsNumFormatter(
                          videodata.length !== 0
                            ? videodata.statistics.likeCount
                            : 0
                        )}
                      </span>
                    </div>
                    <div className={styles.iconcon}>
                      <div className={styles.icon}>
                        <DisLike />
                      </div>
                      <span>
                        {ViewsNumFormatter(
                          videodata.length !== 0
                            ? videodata.statistics.dislikeCount
                            : 0
                        )}
                      </span>
                    </div>
                    <div className={styles.progress}>
                      {ProgressBar(
                        videodata.length !== 0
                          ? videodata.statistics.likeCount
                          : 0,
                        videodata.length !== 0
                          ? videodata.statistics.dislikeCount
                          : 0
                      )}
                      <span
                        id="progress-bar"
                        className={styles.progress__bar}
                      ></span>
                    </div>
                  </div>
                  <div className={styles.iconcon}>
                    <div className={styles.icon}>
                      <Share />
                    </div>
                    <span>share</span>
                  </div>
                  <div className={styles.iconcon}>
                    <div className={styles.icon}>
                      <Save />
                    </div>
                    <span>save</span>
                  </div>
                  <div className={styles.iconcon}>
                    <div className={styles.icon}>
                      <div className={styles.rotate_icon}>
                        <DotsSvg />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ====== VIDEO INFO AREA ====== */}
        <div className={styles.meta}>
          <div className={styles.vid_info}>
            <div className={styles.vid_info__container}>
              <div className={styles.top_row}>
                <div className={styles.channel_info_con}>
                  <div className={styles.cha_thumbnail}>
                    <Link
                      to={`/channel/${
                        videodata.length !== 0
                          ? videodata.snippet.channelId
                          : ""
                      }`}
                    >
                      <div className={styles.cha_thumbnail__wrap}>
                        <img
                          id="cha-img"
                          width="48"
                          className={styles.cha_img}
                          src=""
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
                  <div className={styles.cha_info}>
                    <div
                      id="cha-title"
                      className={styles.cha_info__title}
                    ></div>
                    {GetChannelData(
                      videodata.length !== 0
                        ? videodata.snippet.channelId
                        : null
                    )}
                    <div id="cha-sub" className={styles.cha_info__txt}></div>
                  </div>
                </div>
                <div className={styles.subbtn_con}>
                  <div className={styles.subbtn}>
                    {subed ? (
                      <Fragment>
                        <div
                          onClick={HandleSub}
                          className={styles.subbtn__subed}
                        >
                          <span
                            className={GetClassName(
                              styles,
                              "span_subed",
                              Theme
                            )}
                          >
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
              <div className={styles.bottom_row}>
                <div className={styles.description}>
                  <div className={styles.text_area}>
                    {videodata.length !== 0
                      ? TextReducer(videodata.snippet.description, 200)
                      : null}
                  </div>
                  <div className={styles.details_area}>Details</div>
                  <div className={styles.show_more_btn}>Show more</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ====== ====== */}
        <Parent>
          {visible ? (
            <div className={styles.secondary}>
              <Child
                autoPlay={autoPlay}
                handleCheckboxChange={handleCheckboxChange}
                Theme={Theme}
                PopularVideos={PopularVideos}
                HandleQueryParams={HandleQueryParams}
                HandleShowMessageBox={HandleShowMessageBox}
              />
            </div>
          ) : null}
        </Parent>
        {/* ====== COMMENTS AREA ====== */}
        <div className={styles.comments}>
          {/* ====== COMMENTS HEAD ====== */}
          <div className={styles.comments__header}>
            <div className={styles.comheader}>
              <div className={styles.comheader__title}>
                <div className={styles.com_count}>
                  {videodata.length !== 0
                    ? numberWithCommas(videodata.statistics.commentCount)
                    : 0}{" "}
                  Comments
                </div>
                <div className={styles.com_sort_menu}>
                  <div>
                    <SortBySvg />
                  </div>
                  <div className={styles.com_sort_menu__txt}>Sort by</div>
                </div>
              </div>
            </div>
            <div className={styles.userinput}>
              <div className={styles.userinput__thumbnail}>
                <img
                  className={styles.prothumb_img}
                  width="40"
                  height="40"
                  src="https://yt3.ggpht.com/a-/AAuE7mCD0A834-oe9m44YrvgjigbMXwRc254LoMuOkqDJw=s88-c-k-c0xffffffff-no-rj-mo"
                  alt=""
                />
              </div>
              <input
                placeholder="Add a public comment..."
                className={styles.userinput__inputcon}
              />
            </div>
          </div>
          {/* ====== COMMENTS BODY ====== */}

          {data !== undefined || data.length !== 0 ? (
            data.map((item, index) => {
              return (
                <CommentsContents
                  key={index}
                  index={index}
                  thumbnail={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  publishedAt={item.snippet.topLevelComment.snippet.publishedAt}
                  likeCount={item.snippet.topLevelComment.snippet.likeCount}
                  textDisplay={item.snippet.topLevelComment.snippet.textDisplay}
                  authorName={
                    item.snippet.topLevelComment.snippet.authorDisplayName
                  }
                  authorchaId={
                    item.snippet.topLevelComment.snippet.authorChannelId.value
                  }
                />
              );
            })
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      </div>
      {/* ============== SECONDARY ============== */}

      <Parent>
        {!visible ? (
          <div className={styles.secondary}>
            <Child
              autoPlay={autoPlay}
              handleCheckboxChange={handleCheckboxChange}
              Theme={Theme}
              PopularVideos={PopularVideos}
              HandleQueryParams={HandleQueryParams}
              HandleShowMessageBox={HandleShowMessageBox}
            />
          </div>
        ) : null}
      </Parent>
    </div>
  );
};

export default memo(Watch);
