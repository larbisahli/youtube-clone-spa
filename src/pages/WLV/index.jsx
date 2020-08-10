import React, { useCallback, useEffect, useState, memo } from "react";
import styles from "./wlv.module.scss";
import {
  ShuffleSvg,
  SortBySvg,
  TrashSvg,
  DotsSvg,
} from "../../Components/CompSvg";
import { ReactComponent as PlaySvg } from "../../assets/icon/Play.svg";
import { Head, RippleButton, ProfileImg } from "../../Components/CompUtils";
import { PageLocation } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  ADDInQueueAction,
  ShowQueueAction,
  SetUrlLocationAction,
  Wl_RemoveAllAtion,
  Lv_RemoveAllAtion,
  fetchPlayList,
  PlayQueueAction,
  HideGuideAction,
  SetGuideModeAction,
} from "../../redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useFetch } from "../../Components/Hooks/useFetch";
import Item from "../../Containers/WLVContainer/Item";

const WLV = () => {
  const WatchLater = useSelector((state) => state.WLV.WL);
  const LikedVideos = useSelector((state) => state.WLV.LV);
  const PlayList = useSelector((state) => state.WLV.PlayList);
  const UrlLocation = useSelector((state) => state.Guide.UrlLocation);
  const Guide = useSelector((state) => state.Guide);
  const ApiKey = useSelector((state) => state.ApiKey);
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const accounts = useSelector((state) => state.Navbar.accounts);
  const dispatch = useDispatch();
  const [showRemoveAllDrop, setShowRemoveAllDrop] = useState(false);
  const [ChalId, setChalId] = useState(false);
  const [titleState, setTitleState] = useState({ title: "" });

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  let SearchValue = query.get("list");

  // ==========

  useEffect(() => {
    const UrlLoc = PageLocation();

    if (UrlLoc !== UrlLocation) {
      dispatch(SetUrlLocationAction(UrlLoc));
    }

    // Put SearchValue in the dependencies array to trigger useEffect
    // when we change the url from playlist?list=WL to playlist?list=LV.
  }, [UrlLocation, dispatch, SearchValue]);

  //
  const HandleRemoveAll = () => {
    if (SearchValue === "WL") {
      dispatch(Wl_RemoveAllAtion());
    } else if (SearchValue === "LV") {
      dispatch(Lv_RemoveAllAtion());
    }
  };

  //   Show mini Drop
  const HandleCloseMinidrop = useCallback(() => {
    document.removeEventListener("click", HandleCloseMinidrop);
    setShowRemoveAllDrop(false);
  }, []);

  const HandleshowMiniDrop = useCallback(() => {
    if (!showRemoveAllDrop) {
      document.addEventListener("click", HandleCloseMinidrop);
      setShowRemoveAllDrop(true);
    } else {
      document.removeEventListener("click", HandleCloseMinidrop);
      setShowRemoveAllDrop(false);
    }
  }, [setShowRemoveAllDrop, showRemoveAllDrop, HandleCloseMinidrop]);

  //  Handle add to Queue btn
  const HandleQueueClick = useCallback(
    (title, duration, videoId, channelTitle, channelId, thumbnail) => {
      const checkVid = QueueList.filter((vid) => {
        return vid.videoId === videoId;
      });

      if (checkVid.length === 0 || QueueList.length === 0) {
        if (!ShowQueue) {
          dispatch(ShowQueueAction());
        }

        const playing = QueueList.length === 0;

        dispatch(
          ADDInQueueAction({
            title,
            duration,
            videoId,
            channelTitle,
            channelId,
            thumbnail,
            playing,
            index: QueueList.length,
          })
        );
      }
    },
    [QueueList, dispatch, ShowQueue]
  );

  //     FETCH CHANNELS SNIPPET
  const snippet = useFetch(ChalId, "channels", "snippet");

  //  fetching for thumbnails
  const CurrentAccount = useCallback(
    (title) => {
      const channel = document.getElementById("_channel_");
      const name = document.getElementById("_name_");

      if (SearchValue === "WL" || SearchValue === "LV") {
        const acc = accounts.filter((acc) => acc.isCurrent)[0];
        if (channel && name) {
          channel.src = acc.img;
          name.textContent = acc.name;
        }
      } else {
        if (channel && name && Object.keys(snippet).length !== 0) {
          channel.src = snippet.snippet.thumbnails.medium.url;
          name.textContent = title;
        }
      }
    },
    [SearchValue, accounts, snippet]
  );
  //  check is the current page
  const PageData = useCallback(() => {
    if (SearchValue === "WL") {
      return WatchLater;
    } else if (SearchValue === "LV") {
      return LikedVideos;
    } else {
      if (!PlayList.loading) {
        return PlayList.items;
      } else {
        return [];
      }
    }
  }, [LikedVideos, PlayList, SearchValue, WatchLater]);

  useEffect(() => {
    if (SearchValue !== "WL" && SearchValue !== "LV") {
      dispatch(fetchPlayList(SearchValue, ApiKey));
    }
  }, [dispatch, SearchValue, ApiKey]);

  useEffect(() => {
    if (!PlayList.loading) {
      CurrentAccount(PlayList.items[0].channelTitle);
      setChalId(PlayList.items[0].channelId);
      setTitleState({ title: PlayList.items[0].title });
    } else {
      // false here is just a placehoder
      CurrentAccount(false, false);
    }
  }, [PlayList, CurrentAccount]);

  //  Handle Thumbnail
  const Thumbnail = useCallback(() => {
    const thumbnail = document.getElementById("wlv-thumbnail");

    if (thumbnail) {
      thumbnail.src = PageData()[0].thumbnail;
    }
  }, [PageData]);

  //   Handle Skeleton
  const HandleSkeleton = useCallback(() => {
    //
    const wl_sklt = document.getElementById("wl-sklt");
    if (wl_sklt) {
      wl_sklt.style.height = "200px";
      wl_sklt.style.backgroundColor = Theme ? "#38383898" : "#e2e2e298";
    }
  }, [Theme]);

  useEffect(() => {
    const length = PageData().length;
    if (length !== 0) {
      Thumbnail();
    } else {
      HandleSkeleton();
    }
  }, [PageData, HandleSkeleton, Thumbnail]);

  //  redirect with params

  let history = useHistory();

  const HandleLink = useCallback(
    (wl) => {
      if (ShowQueue) {
        HandleQueueClick(
          wl.title,
          wl.duration,
          wl.videoId,
          wl.channelTitle,
          wl.channelId,
          wl.thumbnail
        );
        dispatch(PlayQueueAction(wl.videoId));
      } else {
        // for a smooth guide transition
        dispatch(HideGuideAction());
        dispatch(SetGuideModeAction(2));
        dispatch(SetUrlLocationAction("watch"));
        history.push(
          `/watch?v=${wl.videoId}&list=${SearchValue.toLowerCase()}`
        );
      }
    },
    [history, HandleQueueClick, ShowQueue, dispatch, SearchValue]
  );

  return (
    <div
      id="page-manager"
      style={{
        marginLeft: Guide.showGuide && Guide.guideMode === 1 ? "240px" : "72px",
      }}
      className={styles.container}
    >
      {/* Helmet */}
      {SearchValue === "WL" ? (
        <Head>
          <title>Watch later - youtube</title>
          <meta name="youtube clone watch later" />
        </Head>
      ) : SearchValue === "LV" ? (
        <Head>
          <title>Liked Videos - youtube</title>
          <meta name="youtube clone liked videos" />
        </Head>
      ) : (
        <Head>
          <title>{`${titleState.title}`} - youtube</title>
          <meta name="youtube clone liked videos" />
        </Head>
      )}
      {/* Right Side */}
      <div className={styles.right_container}>
        <div className={styles.main_thumb}>
          <div className={styles.thumbnail}>
            <div id="wl-sklt" className={styles.imgwrapper}>
              <img
                width="357"
                className={styles.imgwrapper__img}
                id="wlv-thumbnail"
                alt=""
              />
            </div>
            <div className={styles.inner_bg}>
              <PlaySvg />
              <span className={styles.inner_bg__txt}>Play all</span>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.details__title}>
              {SearchValue === "WL" ? (
                <span>Watch later</span>
              ) : (
                <span>Liked videos</span>
              )}
            </div>
            <div className={styles.stat}>
              <span>{`${PageData().length} ${
                PageData().length > 1 ? "videos" : "video"
              }`}</span>
              <div className={styles.stat__dot}>•</div>
              <span>Updated today</span>
            </div>
            <div className={styles.stat}>
              <div className={styles.stat__svg}>
                <ShuffleSvg />
              </div>
              <div onClick={HandleshowMiniDrop} className={styles.stat__svg}>
                <DotsSvg />
              </div>
              {showRemoveAllDrop && (
                <div onClick={HandleRemoveAll} className={styles.stat__drop}>
                  <TrashSvg />
                  <span>
                    {PageData().length === 0 ? "List is empty" : "Remove All"}
                  </span>
                </div>
              )}
            </div>
            <div style={{ margin: "5px 0" }} className="line"></div>
            <div className={styles.user_details}>
              <div className={styles.userwrap}>
                <ProfileImg width={"48"} height={"48"} src="" id="_channel_" />
              </div>
              <div id="_name_" className={styles.user_details__name}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Left Side */}
      <div className={styles.left_container}>
        <div className={styles.items_container}>
          <div className={styles.bsort}>
            <RippleButton onclick={() => {}} classname={styles.bsort__btn}>
              <SortBySvg />
              <span>Sort by</span>
            </RippleButton>
          </div>
          {/* videos container */}
          {PageData().map((wl, index) => {
            return (
              <Item
                key={index}
                index={index}
                HandleLink={HandleLink}
                SearchValue={SearchValue}
                Theme={Theme}
                HandleQueueClick={HandleQueueClick}
                wl={wl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(WLV);
