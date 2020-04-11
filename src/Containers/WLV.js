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
import { DotsSvg } from "../Components/Navbar/NavComponents/Svg";
import { RippleButton } from "../Components";
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
} from "../config";

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
    console.log("WatchLaterList.length :", WatchLaterList.length);
    if (WatchLaterList.length === 0) {
      document.getElementById("wl_xxid").style.height = "200px";
      document.getElementById("wl_xxid").style.backgroundColor = Theme
        ? "#38383898"
        : "#e2e2e298";
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

  const wlmd_txt_area = `wlmd_txt_area wlmd_txt_area-${ReturnTheme(Theme)}`;
  const wlmd_line_txt_con = `wlmd_line_txt_con wlmd_line_txt_con-${ReturnTheme(
    Theme
  )}`;
  return (
    <div
      id="hvc"
      className={`wvl_container wvl_container-${ReturnTheme(Theme)}`}
    >
      {/* Right Side */}
      <div className={`rigth_container rigth_container-${ReturnTheme(Theme)}`}>
        <div className="main_thumb">
          <div className="wl_img_thumb_wrap">
            <div id="wl_xxid" className="wl_xx">
              <img
                width="357"
                className="wl_img_thumb"
                src={
                  WatchLaterList.length !== 0
                    ? WatchLaterList[0].thumbnail
                    : HandleSkeleton()
                }
                alt=""
              />
            </div>
            <div className="wl_ab">
              <PlaySvg />
              <span className="wl_plall_txt">Play all</span>
            </div>
          </div>

          <div className="wl_con_xl">
            <div className="wl_title">
              <span>Watch later</span>
            </div>
            <div className={`wl_stat wl_stat-${ReturnTheme(Theme)}`}>
              <span>{`${WatchLaterList.length} ${
                WatchLaterList.length > 1 ? "videos" : "video"
              }`}</span>
              <div className="rvch_dot">•</div>
              <span>Updated today</span>
            </div>
            <div className="wl_stat">
              <div className={`wl_svg wl_svg-${ReturnTheme(Theme)}`}>
                <ShuffleSvg />
              </div>
              <div
                onClick={HandleshowRemoveAllDrop}
                className={`wl_svg wl_svg-${ReturnTheme(Theme)}`}
              >
                <DotsSvg />
              </div>
              {showRemoveAllDrop && (
                <div
                  onClick={() => WLdispatch({ type: "removeAll" })}
                  className={`rallD rallD-${ReturnTheme(Theme)}`}
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
            <div className={`wl_line wl_line-${ReturnTheme(Theme)}`}></div>
            <div className="wl_prof_details">
              <div className="wl_imgpro_wrap">
                <img
                  width="48"
                  className="wl_imgpro"
                  src={IsCurrentAccount.img}
                  alt=""
                />
              </div>
              <div className="wl_namepro">{IsCurrentAccount.name}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Left Side */}
      <div className={`left_container left_container-${ReturnTheme(Theme)}`}>
        <div className="wl_items_container">
          <div className="wl_sby_con">
            <div className="wl_sby_wrap">
              <RippleButton
                onclick={() => {}}
                classname={`wl_sby wl_sby-${ReturnTheme(Theme)}`}
              >
                <SortBySvg />
                <span>Sort by</span>
              </RippleButton>
            </div>
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
                  className={`wl_v_container wl_v_container-${ReturnTheme(
                    Theme
                  )}`}
                >
                  <div className="wl_dr_svg">
                    <DRSvg />
                  </div>
                  <div className={`wl_ccc wl_ccc-${ReturnTheme(Theme)}`}>
                    <div className="wl_v_thumb_xl">
                      <div className="wl_immg_xl">
                        <img
                          width="120"
                          className=""
                          src={wl.thumbnail}
                          alt=""
                        />
                      </div>
                      <div className="wl_vh_ab">
                        {HandleDuration(wl.duration)}
                      </div>
                    </div>
                    <div className="wl_v_textarea_con">
                      <div className="wl_v_title_con">
                        <div className="wl_v_title_xl">
                          <span>{TextReducer(wl.title, 56)}</span>
                        </div>
                        <div
                          className={`wl_ch_title_xl wl_ch_title_xl-${ReturnTheme(
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
                        className={`wl_v_a_xl wl_v_a_xl-${ReturnTheme(Theme)}`}
                      >
                        <DotsSvg />
                      </div>
                      {/* Drop */}
                      <div
                        style={{ display: "none" }}
                        className={`wl_menu_drop wl_menu_drop-${ReturnTheme(
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
                          className={wlmd_line_txt_con}
                        >
                          <div className="wlmd_svg_wrap">
                            <QueueSvg default_color={false} />
                          </div>
                          <div className={wlmd_txt_area}>Add to queue</div>
                        </div>
                        <div className={wlmd_line_txt_con}>
                          <div className="wlmd_svg_wrap">
                            <AddPlayListSvg />
                          </div>
                          <div className={wlmd_txt_area}>Save to playlist</div>
                        </div>
                        <div
                          className={`wlmd_line wlmd_line-${ReturnTheme(
                            Theme
                          )}`}
                        ></div>
                        <div
                          onClick={() => HandleRemoveWL(wl.videoId)}
                          className={wlmd_line_txt_con}
                        >
                          <div className="wlmd_svg_wrap">
                            <TrashSvg />
                          </div>
                          <div className={wlmd_txt_area}>
                            Remove from Watch later
                          </div>
                        </div>
                        <div
                          onClick={() => WLdispatch({ type: "moveUp", index })}
                          className={wlmd_line_txt_con}
                        >
                          <div className="wlmd_svg_wrap">
                            <MoveUpSvg />
                          </div>
                          <div className={wlmd_txt_area}>Move to top</div>
                        </div>
                        <div
                          onClick={() =>
                            WLdispatch({ type: "moveDown", index })
                          }
                          className={wlmd_line_txt_con}
                        >
                          <div className="wlmd_svg_wrap">
                            <MoveDownSvg />
                          </div>
                          <div className={wlmd_txt_area}>Move to bottom</div>
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
