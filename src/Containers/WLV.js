import React, {
  useContext,
  useCallback,
  Fragment,
  useEffect,
  useState
} from "react";
import "./Sass/wlv_style.scss";
import { PlaySvg, QueueSvg } from "../Components/VideoComponents/Svg";
import {
  ShuffleSvg,
  SortBySvg,
  DRSvg,
  AddPlayListSvg,
  TrashSvg,
  MoveDownSvg,
  MoveUpSvg
} from "./Svg";
import { DotsSvg } from "../Components/Navbar/NavComponents/Svg";
import { WLVContext } from "../Context/WLVContext";
import { RippleButton } from "../Components";
import { UrlLocationContext } from "../Context/UrlLocationContext";
import { NavContext } from "../Context/NavContext";
import { ThemeContext } from "../Context/ThemeContext";
import {
  HandleDuration,
  ReturnTheme,
  TextReducer,
  UrlLocation
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
  // sort by drop state
  //const [showRdrop, setShowRdrop] =useState(false)

  // Navbar context
  const { accountState } = useContext(NavContext);

  const [acc] = accountState;

  const IsCurrentAccount = useCallback(acc.filter(acc => acc.isCurrent)[0], [
    acc
  ]);

  useEffect(() => {
    const UrlLoc = UrlLocation();
    if (UrlLoc !== UrlLocationState) {
      setUrlLocationState(() => UrlLoc);
    }
  }, [UrlLocationState, setUrlLocationState]);

  const HandleSortByClick = useCallback(() => {}, []);

  const HandleRemoveWL = useCallback(
    videoId => {
      WLdispatch({ type: "removeOne", videoId });
    },
    [WLdispatch]
  );

  const HandleCloseRdrop = useCallback(() => {
    setShowMenudrop(() => false);
    const Menu = document.getElementById(`wl-mn-${CurrentMenuIndex}`);
    if (Menu != null) {
      Menu.style.display = "none";
    }
    document.removeEventListener("click", HandleCloseRdrop);
  }, [setShowMenudrop, CurrentMenuIndex]);

  const HandleShowRdrop = useCallback(
    e => {
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
  // HandleSkeleton
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

  console.log("WLV=> :", WatchLaterList);
  return (
    <div id="hvc" className="wvl_container">
      {/* Right Side */}
      <div className="rigth_container">
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

          <div className="wl_title">
            <span>Watch later</span>
          </div>
          <div className="wl_stat">
            <span>{`${WatchLaterList.length} ${
              WatchLaterList.length > 1 ? "videos" : "video"
            }`}</span>
            <div className="rvch_dot">•</div>
            <span>Updated today</span>
          </div>
          <div className="wl_stat">
            <div className="wl_svg">
              <ShuffleSvg />
            </div>
            <div onClick={HandleshowRemoveAllDrop} className="wl_svg">
              <DotsSvg />
            </div>
            {showRemoveAllDrop && (
              <div
                onClick={() => WLdispatch({ type: "removeAll" })}
                className="rallD"
              >
                <TrashSvg />
                <span>
                  {WatchLaterList.length === 0 ? "List is empty" : "Remove All"}
                </span>
              </div>
            )}
          </div>
          <div className="wl_line"></div>
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
      {/* Left Side */}
      <div className="left_container">
        <div className="wl_items_container">
          <div className="wl_sby_con">
            <div className="wl_sby_wrap">
              <RippleButton onclick={HandleSortByClick} classname="wl_sby">
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
                <div className="wl_v_container">
                  <div className="wl_dr_svg">
                    <DRSvg />
                  </div>
                  <div className="wl_ccc">
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
                      <div className="wl_v_title_xl">
                        {TextReducer(wl.title, 56)}
                      </div>
                      <div className="wl_ch_title_xl">{wl.channelTitle}</div>
                    </div>
                    <div
                      id={`${index}`}
                      onMouseEnter={() => setCurrentMenuIndex(() => index)}
                      onClick={HandleShowRdrop}
                      className="wl_v_a_xl"
                    >
                      <DotsSvg />
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="wl_menu_drop"
                      id={`wl-mn-${index}`}
                    >
                      <div className="wlmd_line_txt_con">
                        <div className="wlmd_svg_wrap">
                          <QueueSvg default_color={false} />
                        </div>
                        <div className="wlmd_txt_area">Add to queue</div>
                      </div>
                      <div className="wlmd_line_txt_con">
                        <div className="wlmd_svg_wrap">
                          <AddPlayListSvg />
                        </div>
                        <div className="wlmd_txt_area">Save to playlist</div>
                      </div>
                      <div className="wlmd_line"></div>
                      <div
                        onClick={() => HandleRemoveWL(wl.videoId)}
                        className="wlmd_line_txt_con"
                      >
                        <div className="wlmd_svg_wrap">
                          <TrashSvg />
                        </div>
                        <div className="wlmd_txt_area">
                          Remove from Watch later
                        </div>
                      </div>
                      <div
                        onClick={() => WLdispatch({ type: "moveUp", index })}
                        className="wlmd_line_txt_con"
                      >
                        <div className="wlmd_svg_wrap">
                          <MoveUpSvg />
                        </div>
                        <div className="wlmd_txt_area">Move to top</div>
                      </div>
                      <div
                        onClick={() => WLdispatch({ type: "moveDown", index })}
                        className="wlmd_line_txt_con"
                      >
                        <div className="wlmd_svg_wrap">
                          <MoveDownSvg />
                        </div>
                        <div className="wlmd_txt_area">Move to bottom</div>
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
