import React, { useEffect, useState, useCallback, memo, Fragment } from "react";
import styles from "./watch.module.scss";
import { numberWithCommas, ViewsNumFormatter, PageLocation } from "../../utils";
import { useLocation } from "react-router";
import { VideoPlayer, DestroyIframe, Seek } from "../../Components";
import { Head, Spinner, ProfileImg } from "../../Components/CompUtils";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SetGuideModeAction,
  HideGuideAction,
  ShowGuideAction,
  SetUrlLocationAction,
  CloseMessageAction,
  SetMessageAction,
  Lv_AddAction,
  Lv_RemoveOneAtion,
} from "../../redux";
import { useFetch } from "../../Components/Hooks/useFetch";
import { useMeasure } from "../../Components/Hooks/useMeasure";
import {
  DotsSvg,
  Like,
  DisLike,
  Share,
  Save,
  SortBySvg,
} from "../../Components/CompSvg";
import { ReactComponent as SubBellSvg } from "../../assets/icon/SubBell.svg";
import Moment from "react-moment";
import classNames from "classnames/bind";
import {
  Parent,
  Child,
  CommentsContents,
} from "../../Containers/WatchContainer";

let cx = classNames.bind(styles);

let SeekSeen = false;

const Watch = () => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);
  const Guide = useSelector((state) => state.Guide);
  const PopularVideos = useSelector((state) => state.VideosRequest.items);
  const WatchLater = useSelector((state) => state.WLV.WL);
  const LikedVideos = useSelector((state) => state.WLV.LV);
  const QueueList = useSelector((state) => state.QueueList);
  const PlayList = useSelector((state) => state.WLV.PlayList);
  const dispatch = useDispatch();
  const [VideoLoaded, setVideoLoaded] = useState(false);
  const [subed, setSubed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [visible, setVisible] = useState(window.innerWidth <= 1016);
  const [ShowMore, setShowMore] = useState(false);
  const [LDVote, setLDVote] = useState({ isLike: false, isDislike: false });

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
  }, [dispatch, Guide.guideMode]);

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

  // ========================
  //   Play the Next Video
  // ========================

  const [Trigger, setTrigger] = useState({ start: false, trig: false });

  let history = useHistory();

  useEffect(() => {
    if (Trigger.start) {
      PlayNextVideo();
    } else {
      setTrigger({ start: true, trig: Trigger.trig });
    }

    // Trigger.trig is the trigger to run useEffect because we need the redux state update
    // we can't get the redux updated state inside onPlayerStateChange function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Trigger.trig]);

  //////////////////////////////////////////////
  const GetNextVidId = useCallback(
    (VidList) => {
      let index;
      let videoId_ = false;

      if (VidList.length !== 0) {
        VidList.filter((item, i) => {
          if (item.videoId === videoId) return (index = i);
          return 0;
        });

        // -------
        const i = VidList.length > index + 1 ? index + 1 : 0;
        videoId_ = VidList[i].videoId;
      }

      return videoId_;
    },
    [videoId]
  );

  //
  const PlayNextVideo = useCallback(() => {
    let videoId_;

    switch (HandleQueryParams("list")) {
      //
      case "wl":
        videoId_ = GetNextVidId(WatchLater);
        if (videoId_) {
          history.push(`/watch?v=${videoId_}&list=wl`);
        }

        break;

      case "lv":
        videoId_ = GetNextVidId(LikedVideos);
        if (videoId_) {
          history.push(`/watch?v=${videoId_}&list=lv`);
        }

        break;

      case "q":
        videoId_ = GetNextVidId(QueueList);
        if (videoId_) {
          history.push(`/watch?v=${videoId_}&list=q`);
        }

        break;

      default:
        if (!PlayList.loading && HandleQueryParams("list") !== 0) {
          // PLAYLIST
          videoId_ = GetNextVidId(PlayList.items);
          if (videoId_) {
            history.push(
              `/watch?v=${videoId_}&list=${HandleQueryParams("list")}`
            );
          }
        } else {
          if (autoPlay) {
            // AUTOPLAY
            videoId_ = GetNextVidId(PopularVideos);
            if (videoId_) {
              history.push(`/watch?v=${videoId_}`);
            }
          }
        }

        break;
    }
  }, [
    HandleQueryParams,
    GetNextVidId,
    PopularVideos,
    QueueList,
    autoPlay,
    WatchLater,
    history,
    LikedVideos,
    PlayList,
  ]);

  const onPlayerStateChange = useCallback(
    (event) => {
      switch (event.data) {
        case 3:
          setVideoLoaded(true);
          break;
        case 0:
          // play next video when the current video has finished
          setTrigger((prev) => {
            return { start: prev.start, trig: !prev.trig };
          });
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

  // ====================================
  //        Message box Handling
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
        } else if (MassageFrom === "lv-like") {
          console.log("state :>> ", state);
          msg = !state ? "Added to Liked videos" : "Removed from Liked videos";
          btnMsg = "";
        } else if (MassageFrom === "lv-dislike") {
          msg = !state ? "You dislike this video" : "Dislike removed";
          btnMsg = "";
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

  const videodata = useFetch(
    videoId,
    "videos",
    "statistics,snippet,contentDetails"
  );

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

  const HandleLike = (isLike_) => {
    if (videodata.length !== 0) {
      setLDVote((prev) => {
        return { isLike: !prev.isLike, isDislike: false };
      });
      HandleShowMessageBox("lv-like", isLike_, "", false);

      if (isLike_) {
        dispatch(Lv_RemoveOneAtion(videoId));
      } else {
        dispatch(
          Lv_AddAction({
            title: videodata.snippet.title,
            duration: videodata.contentDetails.duration,
            videoId,
            channelTitle: videodata.snippet.channelTitle,
            channelId: videodata.snippet.channelId,
            thumbnail: videodata.snippet.thumbnails.medium.url,
          })
        );
      }
    }
  };

  // --------

  const HandleDisLike = (isDislike_) => {
    if (videodata.length !== 0) {
      setLDVote((prev) => {
        return {
          isLike: false,
          isDislike: !prev.isDislike,
        };
      });

      HandleShowMessageBox("lv-dislike", isDislike_, "", false);
    }
  };

  return (
    <div className={styles.container}>
      {/* ============= Head ============= */}
      <Head>
        <title>
          {videodata.length !== 0 ? videodata.snippet.title : "youtube-clone"}
        </title>
        <meta
          name={`youtube clone watch page video title ${
            videodata.length !== 0 ? videodata.snippet.title : ""
          }`}
        />
      </Head>
      {/* ================================ */}
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
                    <div
                      onClick={() => HandleLike(LDVote.isLike)}
                      className={styles.iconcon}
                    >
                      <div className={styles.icon}>
                        <Like Theme={Theme} ChangeColor={LDVote.isLike} />
                      </div>
                      <span
                        style={{
                          color: LDVote.isLike
                            ? Theme
                              ? "#3ea6ff"
                              : "#065fd4"
                            : "inherit",
                        }}
                      >
                        {ViewsNumFormatter(
                          videodata.length !== 0
                            ? videodata.statistics.likeCount
                            : 0,
                          "like"
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() => HandleDisLike(LDVote.isDislike)}
                      className={styles.iconcon}
                    >
                      <div className={styles.icon}>
                        <DisLike Theme={Theme} ChangeColor={LDVote.isDislike} />
                      </div>
                      <span
                        style={{
                          color: LDVote.isDislike
                            ? Theme
                              ? "#3ea6ff"
                              : "#065fd4"
                            : "inherit",
                        }}
                      >
                        {ViewsNumFormatter(
                          videodata.length !== 0
                            ? videodata.statistics.dislikeCount
                            : 0,
                          "dislike"
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
                        style={{
                          backgroundColor: LDVote.isLike
                            ? Theme
                              ? "#3ea6ff"
                              : "#065fd4"
                            : "#909090",
                        }}
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
                  <ProfileImg
                    width={"48"}
                    height={"48"}
                    src={""}
                    id={"cha-img"}
                    alt={""}
                    classname={styles.cha_margin}
                  />
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
                    <div id="cha-sub" className={styles.cha_info__sub}></div>
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
              <div className={styles.bottom_row}>
                <div className={styles.description}>
                  <pre className={styles.text_area}>
                    {videodata.length !== 0 ? (
                      ShowMore ? (
                        <pre>{videodata.snippet.description}</pre>
                      ) : (
                        <div className={styles.line_clamp}>
                          {videodata.snippet.description}
                        </div>
                      )
                    ) : null}
                  </pre>
                  <div
                    onClick={() => setShowMore((prev) => !prev)}
                    className={styles.show_more_btn}
                  >
                    {ShowMore ? "Show less" : "Show more"}
                  </div>
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
              <ProfileImg
                width={"40"}
                height={"40"}
                src={
                  "https://yt3.ggpht.com/a-/AAuE7mCD0A834-oe9m44YrvgjigbMXwRc254LoMuOkqDJw=s88-c-k-c0xffffffff-no-rj-mo"
                }
                id={""}
                alt={""}
                classname={styles.prothumb}
              />
              <div className={styles.userinput__inputcon}>
                <input
                  placeholder="Add a public comment..."
                  className={styles.inputcom}
                />
              </div>
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
                    item.snippet.topLevelComment.snippet.authorChannelId
                      ? item.snippet.topLevelComment.snippet.authorChannelId
                          .value
                      : ""
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
