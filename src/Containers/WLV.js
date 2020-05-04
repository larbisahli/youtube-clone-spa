import React, { useContext, useCallback, useEffect, useState } from "react";
import "./Sass/wlv_style.scss";
import { PlaySvg, QueueSvg } from "../Components/VideoComponents/Svg";
import {
  ShuffleSvg,
  SortBySvg,
  DRSvg,
  AddPlayListSvg,
  TrashSvg,
  MoveDownSvg,
  MoveUpSvg,
} from "./Svg";
import { Helmet } from "react-helmet";
import { DotsSvg } from "../Components/Navbar/NavComponents/Svg";
import { RippleButton } from "../Components/ComponentsUtils";
import {
  ThemeContext,
  WLVContext,
  NavContext,
  QueueContext,
  UrlLocationContext,
} from "../Context";
import {
  HandleDuration,
  ReturnTheme,
  TextReducer,
  UrlLocation,
} from "../utils";

const WLV = React.memo(() => {
  // WLV Context
  const { WatchLaterState } = useContext(WLVContext);
  const [WatchLaterList, WLdispatch] = WatchLaterState;

  // Location Context
  const [UrlLocationState, setUrlLocationState] = useContext(
    UrlLocationContext
  );

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // menu drop state
  const [showMenudrop, setShowMenudrop] = useState(false);

  // menu drop state
  const [showRemoveAllDrop, setShowRemoveAllDrop] = useState(false);

  // current clicked menu index drop
  const [CurrentMenuIndex, setCurrentMenuIndex] = useState(0);

  // Navbar context
  const { accountState } = useContext(NavContext);
  const [acc] = accountState;

  const IsCurrentAccount = useCallback(acc.filter((acc) => acc.isCurrent)[0], [
    acc,
  ]);

  // Queue Context
  const { QueueState, ShowQueueState } = useContext(QueueContext);
  const [ShowQueue, setShowQueue] = ShowQueueState;
  const [QueueList, QueueListDispatch] = QueueState;

  useEffect(() => {
    const UrlLoc = UrlLocation();
    if (UrlLoc !== UrlLocationState) {
      setUrlLocationState(() => UrlLoc);
    }
  }, [UrlLocationState, setUrlLocationState]);

  //
  const HandleRemoveWL = useCallback(
    (videoId) => {
      WLdispatch({ type: "removeOne", videoId });
    },
    [WLdispatch]
  );

  //
  const HandleCloseRdrop = useCallback(() => {
    setShowMenudrop(() => false);
    const Menu = document.getElementById(`wl-mn-${CurrentMenuIndex}`);
    if (Menu != null) {
      Menu.style.display = "none";
    }
    document.removeEventListener("click", HandleCloseRdrop);
  }, [setShowMenudrop, CurrentMenuIndex]);

  //
  const HandleShowRdrop = useCallback(
    (e) => {
      // responsive dropdown
      // 213px is the menu height + 68px img height + 16 padding

      if (e.clientY > window.innerHeight - 297) {
        document.getElementById(`wl-mn-${CurrentMenuIndex}`).style.top = "-95%";
        document.getElementById(`wl-mn-${CurrentMenuIndex}`).style.right =
          "10%";
      }

      if (!showMenudrop) {
        document.addEventListener("click", HandleCloseRdrop);
        document.getElementById(`wl-mn-${CurrentMenuIndex}`).style.display = "";
      } else {
        document.removeEventListener("click", HandleCloseRdrop);
        document.getElementById(`wl-mn-${CurrentMenuIndex}`).style.display =
          "none";
      }
      setShowMenudrop(() => !showMenudrop);
    },
    [setShowMenudrop, showMenudrop, HandleCloseRdrop, CurrentMenuIndex]
  );

  // ===================
  //   HandleSkeleton
  // ===================

  const HandleSkeleton = useCallback(() => {
    //
    console.log("WatchLaterList.length :", WatchLaterList.length);
    if (WatchLaterList.length === 0) {
      if (document.getElementById("wl_xxid") !== undefined) {
        document.getElementById("wl_xxid").style.height = "200px";
        document.getElementById("wl_xxid").style.backgroundColor = Theme
          ? "#38383898"
          : "#e2e2e298";
      }
    }
    return "";
  }, [WatchLaterList, Theme]);

  // ===================
  // showRemoveAllDrop
  // ===================

  const HandleRADCloseRdrop = useCallback(() => {
    document.removeEventListener("click", HandleRADCloseRdrop);
    setShowRemoveAllDrop(false);
  }, []);

  const HandleshowRemoveAllDrop = useCallback(() => {
    if (!showRemoveAllDrop) {
      document.addEventListener("click", HandleRADCloseRdrop);
      setShowRemoveAllDrop(true);
    } else {
      document.removeEventListener("click", HandleRADCloseRdrop);
      setShowRemoveAllDrop(false);
    }
  }, [setShowRemoveAllDrop, showRemoveAllDrop, HandleRADCloseRdrop]);

  // const HandleDragOver = useCallback((e, index) => {
  //   e.preventDefault();
  //   console.log("drag :", index);
  // }, []);

  // const HandleDrop = useCallback(index => {
  //   //e.preventDefault();
  //   console.log("drop :", index);
  // }, []);

  // =========================
  //  Handle add to Queue btn
  // =========================

  const HandleQueueClick = useCallback(
    (title, duration, videoId, channelTitle, channelId, thumbnail) => {
      const checkVid = QueueList.filter((vid) => {
        return vid.videoId === videoId;
      });

      if (checkVid.length === 0 || QueueList.length === 0) {
        if (!ShowQueue) {
          setShowQueue(true);
        }

        const playing = QueueList.length === 0;

        QueueListDispatch({
          type: "add",
          title,
          duration,
          videoId,
          channelTitle,
          channelId,
          thumbnail,
          playing,
          index: QueueList.length,
        });
      }
    },
    [QueueList, QueueListDispatch, ShowQueue, setShowQueue]
  );

  //

  const txt_area = `wl_drop_text_con__text wl_drop_text_con__text--${ReturnTheme(
    Theme
  )}`;
  const wl_drop_text_con = `wl_drop_text_con wl_drop_text_con--${ReturnTheme(
    Theme
  )}`;
  return (
    <div id="page-manager" className={`wvl wvl--${ReturnTheme(Theme)}`}>
      {/* Helmet */}
      <Helmet>
        <title>Watch later - youtube</title>
        <meta name="youtube clone watch later" content="Helmet application" />
      </Helmet>
      {/* Right Side */}
      <div
        className={`wvl__right_container wvl__right_container--${ReturnTheme(
          Theme
        )}`}
      >
        <div className="main_thumb">
          <div className="main_thumb__thumbnail">
            <div id="wl_xxid" className="main_thumb__thumbnail__wrap">
              <img
                width="357"
                className="main_thumb__thumbnail__wrap__img"
                src={
                  WatchLaterList.length !== 0
                    ? WatchLaterList[0].thumbnail
                    : HandleSkeleton()
                }
                alt=""
              />
            </div>
            <div className="main_thumb__thumbnail__inner_bg">
              <PlaySvg />
              <span className="main_thumb__thumbnail__inner_bg__txt">
                Play all
              </span>
            </div>
          </div>

          <div className="main_thumb__details">
            <div className="main_thumb__details__title">
              <span>Watch later</span>
            </div>
            <div className={`wl_stat_con wl_stat_con--${ReturnTheme(Theme)}`}>
              <span>{`${WatchLaterList.length} ${
                WatchLaterList.length > 1 ? "videos" : "video"
              }`}</span>
              <div className="wl_stat_con__dot">•</div>
              <span>Updated today</span>
            </div>
            <div className="wl_stat_con">
              <div
                className={`wl_stat_con__svg wl_stat_con__svg--${ReturnTheme(
                  Theme
                )}`}
              >
                <ShuffleSvg />
              </div>
              <div
                onClick={HandleshowRemoveAllDrop}
                className={`wl_stat_con__svg wl_stat_con__svg--${ReturnTheme(
                  Theme
                )}`}
              >
                <DotsSvg />
              </div>
              {showRemoveAllDrop && (
                <div
                  onClick={() => WLdispatch({ type: "removeAll" })}
                  className={`wl_stat_con__drop wl_stat_con__drop--${ReturnTheme(
                    Theme
                  )}`}
                >
                  <TrashSvg />
                  <span>
                    {WatchLaterList.length === 0
                      ? "List is empty"
                      : "Remove All"}
                  </span>
                </div>
              )}
            </div>
            <div
              style={{ margin: "5px 0" }}
              className={`line line--${ReturnTheme(Theme)}`}
            ></div>
            <div className="prof_details">
              <div className="prof_details__wrap">
                <img
                  width="48"
                  className="prof_details__wrap__img"
                  src={IsCurrentAccount.img}
                  alt=""
                />
              </div>
              <div className="prof_details__name">{IsCurrentAccount.name}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Left Side */}
      <div
        className={`wvl__left_container wvl__left_container--${ReturnTheme(
          Theme
        )}`}
      >
        <div className="wl_items_container">
          <div className="wl_sort_con">
            <RippleButton
              onclick={() => {}}
              classname={`wl_sort_con__btn wl_sort_con__btn--${ReturnTheme(
                Theme
              )}`}
            >
              <SortBySvg />
              <span>Sort by</span>
            </RippleButton>
          </div>
          {/* videos container */}
          {WatchLaterList.map((wl, index) => {
            return (
              <div
                // onDrop={() => HandleDrop(index)}
                // draggable
                // onDragOver={() => HandleDragOver(index)}
                key={index}
              >
                <div
                  className={`wl_item_container wl_item_container--${ReturnTheme(
                    Theme
                  )}`}
                >
                  <div className="wl_drag_area">
                    <DRSvg />
                  </div>
                  <div
                    className={`wl_item_wrap wl_item_wrap--${ReturnTheme(
                      Theme
                    )}`}
                  >
                    <div className="wl_item_wrap__thumb">
                      <img
                        width="120"
                        className="wl_item_wrap__thumb__img"
                        src={wl.thumbnail}
                        alt=""
                      />

                      <div className="wl_item_wrap__thumb__inner">
                        {HandleDuration(wl.duration)}
                      </div>
                    </div>
                    <div className="wl_item_wrap__textarea">
                      <div className="wl_item_details">
                        <div className="wl_item_details__title">
                          <span>{TextReducer(wl.title, 56)}</span>
                        </div>
                        <div
                          className={`wl_item_details__channel_title wl_item_details__channel_title--${ReturnTheme(
                            Theme
                          )}`}
                        >
                          {wl.channelTitle}
                        </div>
                      </div>
                      <div
                        id={`${index}`}
                        onMouseEnter={() => setCurrentMenuIndex(() => index)}
                        onClick={HandleShowRdrop}
                        className={`wl_dot_svg wl_dot_svg--${ReturnTheme(
                          Theme
                        )}`}
                      >
                        <DotsSvg />
                      </div>
                      {/* Drop */}
                      <div
                        style={{ display: "none" }}
                        className={`wl_menu_drop wl_menu_drop--${ReturnTheme(
                          Theme
                        )}`}
                        id={`wl-mn-${index}`}
                      >
                        <div
                          onClick={() =>
                            HandleQueueClick(
                              wl.title,
                              wl.duration,
                              wl.videoId,
                              wl.channelTitle,
                              wl.channelId,
                              wl.thumbnail
                            )
                          }
                          className={wl_drop_text_con}
                        >
                          <div className="wl_drop_text_con__icon">
                            <QueueSvg default_color={false} />
                          </div>
                          <div className={txt_area}>Add to queue</div>
                        </div>
                        <div className={wl_drop_text_con}>
                          <div className="wl_drop_text_con__icon">
                            <AddPlayListSvg />
                          </div>
                          <div className={txt_area}>Save to playlist</div>
                        </div>
                        <div
                          style={{ margin: "5px 0" }}
                          className={`line line--${ReturnTheme(Theme)}`}
                        ></div>
                        <div
                          onClick={() => HandleRemoveWL(wl.videoId)}
                          className={wl_drop_text_con}
                        >
                          <div className="wl_drop_text_con__icon">
                            <TrashSvg />
                          </div>
                          <div className={txt_area}>
                            Remove from Watch later
                          </div>
                        </div>
                        <div
                          onClick={() => WLdispatch({ type: "moveUp", index })}
                          className={wl_drop_text_con}
                        >
                          <div className="wl_drop_text_con__icon">
                            <MoveUpSvg />
                          </div>
                          <div className={txt_area}>Move to top</div>
                        </div>
                        <div
                          onClick={() =>
                            WLdispatch({ type: "moveDown", index })
                          }
                          className={wl_drop_text_con}
                        >
                          <div className="wl_drop_text_con__icon">
                            <MoveDownSvg />
                          </div>
                          <div className={txt_area}>Move to bottom</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wl_line_xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default WLV;
