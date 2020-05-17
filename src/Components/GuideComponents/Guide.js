import React, { useState, useCallback, useEffect, Fragment, memo } from "react";
import style from "./sass/guide.module.scss";
import {
  HomeSvg,
  TrendingSvg,
  SubscriptionSvg,
  LibrarySvg,
  HistorySvg,
  VideoSvg,
  WatchLaterSvg,
  LikeSvg,
  DownArrowSvg,
  PlayListSvg,
  UpArrowSvg,
  LiveSvg,
  GamingSvg,
  LiveDefaultSvg,
  FlagSvg,
} from "./Svg";
import { SettingsSvg, HelpSvg, FeedSvg } from "../Navbar/NavComponents/Svg";
import { Link } from "react-router-dom";
import { GetClassName, ReturnTheme } from "../../utils";
import { PlayList, FrontSubscriptions, Subscriptions } from "./dummyData";
import { useSelector, useDispatch } from "react-redux";
import { HideGuideAction } from "../../redux";

// sort by {isLive: true} to show live channels first in the list
FrontSubscriptions.sort((x, y) => {
  return x.isLive === y.isLive ? 0 : x.isLive ? -1 : 1;
});

// Sort Subscriptions by Character
Subscriptions.sort((x, y) => {
  const a = x.name.charAt(0);
  const b = y.name.charAt(0);
  return a > b ? 1 : a < b ? -1 : 0;
});

const Guide = memo(() => {
  // Show more State
  const [IsShowMore, setIsShowMore] = useState(false);

  // Subscription Show More State
  const [SubIsShowMore, setSubIsShowMore] = useState(false);

  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // Guide
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);
  const UrlLocation = useSelector((state) => state.Guide.urlLocation);

  // dispatch
  const dispatch = useDispatch();

  //  check is the current page
  const CheckUrlLocation = useCallback(
    (value) => {
      return UrlLocation === value;
    },
    [UrlLocation]
  );

  // ===========================
  //  Handle Show More Or Less
  //============================

  const HandleShowMoreOrLess = useCallback(() => {
    setIsShowMore(!IsShowMore);
  }, [setIsShowMore, IsShowMore]);

  //

  const HandleSubscriptionShowMoreOrLess = useCallback(() => {
    setSubIsShowMore(!SubIsShowMore);
  }, [setSubIsShowMore, SubIsShowMore]);

  // Handle Close
  const HandleCloseGuide = useCallback(
    (event) => {
      const GUIDENODE = document.getElementById("GuideG");

      if (GUIDENODE) {
        if (GUIDENODE.isSameNode(event.target)) {
          dispatch(HideGuideAction());
          GUIDENODE.removeEventListener("click", HandleCloseGuide);
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // when windowSize change it trigger useEffect to do it's job

    const pageManager = document.getElementById("page-manager");
    const GUIDENODE = document.getElementById("GuideG");

    if (pageManager && guideMode === 1) {
      pageManager.style.marginLeft = showGuide ? "240px" : "72px";
    }

    // in case we want to showGuide when the page width is less than 1340
    if (pageManager) {
      if (
        parseInt(pageManager.style.marginLeft, 10) >= 240 &&
        guideMode === 2
      ) {
        pageManager.style.marginLeft = showGuide ? "240px" : "72px";
      }
    }

    if (guideMode === 2) {
      GUIDENODE.style.width = "100%";
    }

    if (GUIDENODE) {
      // (window.innerWidth <= 810 || isWatchPage)
      if (!showGuide && guideMode === 2) {
        //

        GUIDENODE.style.transform = `translateX(-100%)`;
        GUIDENODE.style.display = "block";
        GUIDENODE.addEventListener("click", HandleCloseGuide);

        //(window.innerWidth <= 810 || isWatchPage)
      } else if (showGuide && guideMode === 2) {
        //

        GUIDENODE.style.transform = `translateX(0%)`;
        GUIDENODE.style.display = "block";
        GUIDENODE.addEventListener("click", HandleCloseGuide);

        //window.innerWidth >= 810 && !isWatchPage
      } else if (!showGuide && guideMode === 1) {
        GUIDENODE.style.display = "none";

        // window.innerWidth >= 810 && !isWatchPage
      } else if (showGuide && guideMode === 1) {
        GUIDENODE.style.display = "block";
      }
    }

    return () => {
      // clean up
      GUIDENODE.style.width = "";
    };
  }, [showGuide, HandleCloseGuide, CheckUrlLocation, guideMode]);

  //
  const ReturnbgBlack = () => {
    if (window.innerWidth > 1340 && guideMode === 1) {
      return "none";
    } else if (showGuide && window.innerWidth < 1340 && guideMode === 1) {
      return "block";
    } else if (!showGuide && window.innerWidth < 1340 && guideMode === 1) {
      return "none";
    } else if (showGuide && guideMode === 2) {
      return "block";
    } else if (!showGuide && guideMode === 2) {
      return "none";
    } else {
      return "none";
    }
  };

  //
  const ReturnGuideDisplay = () => {
    if (showGuide) {
      return "block";
    } else if (!showGuide) {
      return "none";
    }
  };

  const HideGuideOnClick = () => {
    if (guideMode === 2 && showGuide) {
      dispatch(HideGuideAction());
    }
  };

  const content_wrapper = (value = "") => {
    return `${style.content_wrapper} ${
      style[
        `content_wrapper--${ReturnTheme(Theme)}${
          UrlLocation === value ? "--active" : ""
        }`
      ]
    }`;
  };

  const line = GetClassName(style, "line", Theme);

  return (
    <Fragment>
      <div
        className={style.bg}
        style={{
          display: ReturnbgBlack(),
        }}
      ></div>
      <div
        id="GuideG"
        className={style.container}
        style={{ display: ReturnGuideDisplay() }}
      >
        <div className={GetClassName(style, "wrapper", Theme)}>
          <div className={style.content_container}>
            {/*--------------------*/}
            <Link
              to="/"
              title="Home"
              onClick={HideGuideOnClick}
              className={content_wrapper("home")}
            >
              <div className={style.content_icon}>
                <HomeSvg changeColor={UrlLocation === "home"} />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Home</div>
              </div>
            </Link>
            {/*--*/}
            <div title="Trending" className={content_wrapper("trending")}>
              <div className={style.content_icon}>
                <TrendingSvg changeColor={UrlLocation === "trending"} />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Trending</div>
              </div>
            </div>
            {/*--*/}
            <div
              title="Subscriptions"
              className={content_wrapper("subscriptions")}
            >
              <div className={style.content_icon}>
                <SubscriptionSvg
                  changeColor={UrlLocation === "subscriptions"}
                />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Subscriptions</div>
              </div>
            </div>
            <div className={line}></div>
            {/*--------------------*/}
            <div title="Library" className={content_wrapper("library")}>
              <div className={style.content_icon}>
                <LibrarySvg changeColor={UrlLocation === "library"} />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Library</div>
              </div>
            </div>
            {/*--*/}
            <div title="History" className={content_wrapper("history")}>
              <div className={style.content_icon}>
                <HistorySvg changeColor={CheckUrlLocation("history")} />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>History</div>
              </div>
            </div>
            {/*--*/}
            <div title="Your videos" className={content_wrapper()}>
              <div className={style.content_icon}>
                <VideoSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Your videos</div>
              </div>
            </div>
            {/*--*/}
            <Link
              to="/playlist?list=WL"
              title="Watch later"
              onClick={HideGuideOnClick}
              className={content_wrapper("WL")}
            >
              <div className={style.content_icon}>
                <WatchLaterSvg changeColor={CheckUrlLocation("WL")} />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Watch later</div>
              </div>
            </Link>
            {/*--*/}
            <Link
              to="/playlist?list=LV"
              onClick={HideGuideOnClick}
              title="Liked videos"
              className={content_wrapper("LV")}
            >
              <div className={style.content_icon}>
                <LikeSvg changeColor={CheckUrlLocation("LV")} />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Liked videos</div>
              </div>
            </Link>
            {/* <== START SHOW MORE AREA ==> */}
            {IsShowMore &&
              PlayList.map((play, index) => {
                return (
                  <div title={play} key={index} className={content_wrapper()}>
                    <div className={style.content_icon}>
                      <PlayListSvg />
                    </div>
                    <div className={style.text_container}>
                      <div className={style.text_wrap}>{play}</div>
                    </div>
                  </div>
                );
              })}

            <div
              title={`Show ${IsShowMore ? "less" : "more"}`}
              onClick={HandleShowMoreOrLess}
              className={content_wrapper()}
            >
              <div className={style.content_icon}>
                {IsShowMore ? <UpArrowSvg /> : <DownArrowSvg />}
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>
                  {`Show ${IsShowMore ? "less" : "more"}`}
                </div>
              </div>
            </div>
            {/* <== END SHOW MORE AREA ==> */}
            <div className={line}></div>
            {/* <== START SUBSCRIPTIONS AREA ==> */}
            <div className={GetClassName(style, "subtitle", Theme)}>
              SUBSCRIPTIONS
            </div>
            {/* --- FrontSubscriptions --- */}
            {FrontSubscriptions.map((FrontSub, index) => {
              return (
                <div
                  key={index}
                  title={FrontSub.name}
                  className={content_wrapper()}
                >
                  <div className={style.content_icon}>
                    <img
                      className={GetClassName(style, "pronail", Theme)}
                      height="24"
                      width="24"
                      src={FrontSub.img}
                      alt=""
                    />
                  </div>
                  <div className={style.text_container}>
                    <div className={style.text_wrap}>{FrontSub.name}</div>
                  </div>
                  <div className={style.notisvg}>
                    <div className={style.svg_con}>
                      <LiveSvg
                        isLive={FrontSub.isLive}
                        notiExist={FrontSub.notiExist}
                        Theme={Theme}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ---- Subscriptions show ----*/}
            {SubIsShowMore &&
              Subscriptions.map((FrontSub, index) => {
                return (
                  <div
                    key={index}
                    title={FrontSub.name}
                    className={content_wrapper()}
                  >
                    <div className={style.content_icon}>
                      <img
                        className={GetClassName(style, "thumbnail", Theme)}
                        height="24"
                        width="24"
                        src={FrontSub.img}
                        alt=""
                      />
                    </div>
                    <div className={style.text_container}>
                      <div className={style.text_wrap}>{FrontSub.name}</div>
                    </div>
                    <div className={style.notisvg}>
                      <LiveSvg
                        isLive={FrontSub.isLive}
                        notiExist={FrontSub.notiExist}
                        Theme={Theme}
                      />
                    </div>
                  </div>
                );
              })}

            <div
              title={`Show ${SubIsShowMore ? "less" : "more"}`}
              onClick={HandleSubscriptionShowMoreOrLess}
              className={content_wrapper()}
            >
              <div className={style.content_icon}>
                {SubIsShowMore ? <UpArrowSvg /> : <DownArrowSvg />}
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>
                  {`Show ${
                    SubIsShowMore ? "less" : `${Subscriptions.length} more`
                  }`}
                </div>
              </div>
            </div>

            {/* <== END SUBSCRIPTIONS AREA ==> */}
            <div className={line}></div>
            {/* <== START MORE FROM YOUTUBE AREA ==> */}
            <div className={GetClassName(style, "subtitle", Theme)}>
              MORE FROM YOUTUBE
            </div>
            <div title="Gaming" className={content_wrapper()}>
              <div className={style.content_icon}>
                <GamingSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Gaming</div>
              </div>
            </div>
            <div title="Live" className={content_wrapper()}>
              <div className={style.content_icon}>
                <LiveDefaultSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Live</div>
              </div>
            </div>
            {/* <== END MORE FROM YOUTUBE AREA ==> */}
            <div className={line}></div>
            <div title="Settings" className={content_wrapper()}>
              <div className={style.content_icon}>
                <SettingsSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Settings</div>
              </div>
            </div>
            <div title="Report history" className={content_wrapper()}>
              <div className={style.content_icon}>
                <FlagSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Report history</div>
              </div>
            </div>
            <div title="Help" className={content_wrapper()}>
              <div className={style.content_icon}>
                <HelpSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Help</div>
              </div>
            </div>
            <div title="Send feedback" className={content_wrapper()}>
              <div className={style.content_icon}>
                <FeedSvg />
              </div>
              <div className={style.text_container}>
                <div className={style.text_wrap}>Send feedback</div>
              </div>
            </div>
            {/* <== ABOUT AREA ==> */}
            <div className={line}></div>
            <div className={GetClassName(style, "about", Theme)}>
              <div className={style.txt}>
                Cloning YouTube with pure sass, Javascript and React Framework
                2020.
              </div>
              <div className={style.txt}>
                Author: <span className={style["txt--name"]}>Larbi Sahli</span>
              </div>
              <div className={style.txt}>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GetClassName(style, "tt", Theme)}
                  href="https://github.com/larbisahli/youtube-clone"
                >
                  YouTube-Clone
                </a>
              </div>
              <div
                target="_blank"
                rel="noopener noreferrer"
                className={`${style.txt} ${style["txt--x"]}`}
              >
                GitHub:{" "}
                <a
                  className={GetClassName(style, "tt", Theme)}
                  href="https://github.com/larbisahli"
                >
                  larbisahli
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default Guide;
