import React, { useState, useCallback, useEffect, Fragment, memo } from "react";
import styles from "./sass/guide.module.scss";
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

const Guide = () => {
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

    if (GUIDENODE) {
      if (guideMode === 2) {
        //
        GUIDENODE.style.width = "100%";

        // in case we want to showGuide when the page width is less than 1340
        if (pageManager) {
          if (parseInt(pageManager.style.marginLeft, 10) >= 240) {
            pageManager.style.marginLeft = showGuide ? "240px" : "72px";
          }
        }

        if (showGuide) {
          //
          GUIDENODE.style.transform = `translateX(0%)`;
          GUIDENODE.style.display = "block";
          GUIDENODE.addEventListener("click", HandleCloseGuide);
        } else {
          //
          GUIDENODE.style.transform = `translateX(-100%)`;
          GUIDENODE.style.display = "block";
          GUIDENODE.addEventListener("click", HandleCloseGuide);
        }
      } else {
        // guideMode === 1

        if (pageManager) {
          pageManager.style.marginLeft = showGuide ? "240px" : "72px";
        }

        if (showGuide) {
          GUIDENODE.style.display = "block";
        } else {
          GUIDENODE.style.display = "none";
        }
      }
    }

    return () => {
      // clean up
      if (GUIDENODE) {
        GUIDENODE.style.width = "";
      }
    };
  }, [showGuide, HandleCloseGuide, CheckUrlLocation, guideMode]);

  //
  const ReturnGuideDisplay = () => {
    if (showGuide) {
      return "block";
    } else {
      return "none";
    }
  };

  //
  const ReturnbgBlack = () => {
    //
    // if (window.innerWidth > 1340 && guideMode === 1) {
    //   return "none";
    // } else if (showGuide && window.innerWidth < 1340 && guideMode === 1) {
    //   return "block";
    // } else if (!showGuide && window.innerWidth < 1340 && guideMode === 1) {
    //   return "none";
    // } else if (showGuide && guideMode === 2) {
    //   return "block";
    // } else if (!showGuide && guideMode === 2) {
    //   return "none";
    // } else {
    //   return "none";
    // }

    // ============== A better approach :

    if (guideMode === 1) {
      if (window.innerWidth > 1340) {
        return "none";
      } else {
        return ReturnGuideDisplay();
      }
    } else {
      return ReturnGuideDisplay();
    }
  };

  const HideGuideOnClick = () => {
    if (guideMode === 2 && showGuide) {
      dispatch(HideGuideAction());
    }
  };

  const content_wrapper = (value = "") => {
    return `${styles.content_wrapper} ${
      styles[
        `content_wrapper--${ReturnTheme(Theme)}${
          UrlLocation === value ? "--active" : ""
        }`
      ]
    }`;
  };

  const line = GetClassName(styles, "line", Theme);

  return (
    <Fragment>
      <div
        className={styles.bg}
        style={{
          display: ReturnbgBlack(),
        }}
      ></div>
      <div
        id="GuideG"
        className={styles.container}
        style={{ display: ReturnGuideDisplay() }}
      >
        <div className={GetClassName(styles, "wrapper", Theme)}>
          <div className={styles.content_container}>
            {/*--------------------*/}
            <Link
              to="/"
              title="Home"
              onClick={HideGuideOnClick}
              className={content_wrapper("home")}
            >
              <div className={styles.content_icon}>
                <HomeSvg changeColor={UrlLocation === "home"} />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Home</div>
              </div>
            </Link>
            {/*--*/}
            <div title="Trending" className={content_wrapper("trending")}>
              <div className={styles.content_icon}>
                <TrendingSvg changeColor={UrlLocation === "trending"} />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Trending</div>
              </div>
            </div>
            {/*--*/}
            <div
              title="Subscriptions"
              className={content_wrapper("subscriptions")}
            >
              <div className={styles.content_icon}>
                <SubscriptionSvg
                  changeColor={UrlLocation === "subscriptions"}
                />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Subscriptions</div>
              </div>
            </div>
            <div className={line}></div>
            {/*--------------------*/}
            <div title="Library" className={content_wrapper("library")}>
              <div className={styles.content_icon}>
                <LibrarySvg changeColor={UrlLocation === "library"} />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Library</div>
              </div>
            </div>
            {/*--*/}
            <div title="History" className={content_wrapper("history")}>
              <div className={styles.content_icon}>
                <HistorySvg changeColor={CheckUrlLocation("history")} />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>History</div>
              </div>
            </div>
            {/*--*/}
            <div title="Your videos" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <VideoSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Your videos</div>
              </div>
            </div>
            {/*--*/}
            <Link
              to="/playlist?list=WL"
              title="Watch later"
              onClick={HideGuideOnClick}
              className={content_wrapper("WL")}
            >
              <div className={styles.content_icon}>
                <WatchLaterSvg changeColor={CheckUrlLocation("WL")} />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Watch later</div>
              </div>
            </Link>
            {/*--*/}
            <Link
              to="/playlist?list=LV"
              onClick={HideGuideOnClick}
              title="Liked videos"
              className={content_wrapper("LV")}
            >
              <div className={styles.content_icon}>
                <LikeSvg changeColor={CheckUrlLocation("LV")} />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Liked videos</div>
              </div>
            </Link>
            {/* <== START SHOW MORE AREA ==> */}
            {IsShowMore &&
              PlayList.map((play, index) => {
                return (
                  <div title={play} key={index} className={content_wrapper()}>
                    <div className={styles.content_icon}>
                      <PlayListSvg />
                    </div>
                    <div className={styles.text_container}>
                      <div className={styles.text_wrap}>{play}</div>
                    </div>
                  </div>
                );
              })}

            <div
              title={`Show ${IsShowMore ? "less" : "more"}`}
              onClick={HandleShowMoreOrLess}
              className={content_wrapper()}
            >
              <div className={styles.content_icon}>
                {IsShowMore ? <UpArrowSvg /> : <DownArrowSvg />}
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>
                  {`Show ${IsShowMore ? "less" : "more"}`}
                </div>
              </div>
            </div>
            {/* <== END SHOW MORE AREA ==> */}
            <div className={line}></div>
            {/* <== START SUBSCRIPTIONS AREA ==> */}
            <div className={GetClassName(styles, "subtitle", Theme)}>
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
                  <div className={styles.content_icon}>
                    <img
                      className={GetClassName(styles, "pronail", Theme)}
                      height="24"
                      width="24"
                      src={FrontSub.img}
                      alt=""
                    />
                  </div>
                  <div className={styles.text_container}>
                    <div className={styles.text_wrap}>{FrontSub.name}</div>
                  </div>
                  <div className={styles.notisvg}>
                    <div className={styles.svg_con}>
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
                    <div className={styles.content_icon}>
                      <img
                        className={GetClassName(styles, "pronail", Theme)}
                        height="24"
                        width="24"
                        src={FrontSub.img}
                        alt=""
                      />
                    </div>
                    <div className={styles.text_container}>
                      <div className={styles.text_wrap}>{FrontSub.name}</div>
                    </div>
                    <div className={styles.notisvg}>
                      <div className={styles.svg_con}>
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

            <div
              title={`Show ${SubIsShowMore ? "less" : "more"}`}
              onClick={HandleSubscriptionShowMoreOrLess}
              className={content_wrapper()}
            >
              <div className={styles.content_icon}>
                {SubIsShowMore ? <UpArrowSvg /> : <DownArrowSvg />}
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>
                  {`Show ${
                    SubIsShowMore ? "less" : `${Subscriptions.length} more`
                  }`}
                </div>
              </div>
            </div>

            {/* <== END SUBSCRIPTIONS AREA ==> */}
            <div className={line}></div>
            {/* <== START MORE FROM YOUTUBE AREA ==> */}
            <div className={GetClassName(styles, "subtitle", Theme)}>
              MORE FROM YOUTUBE
            </div>
            <div title="Gaming" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <GamingSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Gaming</div>
              </div>
            </div>
            <div title="Live" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <LiveDefaultSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Live</div>
              </div>
            </div>
            {/* <== END MORE FROM YOUTUBE AREA ==> */}
            <div className={line}></div>
            <div title="Settings" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <SettingsSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Settings</div>
              </div>
            </div>
            <div title="Report history" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <FlagSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Report history</div>
              </div>
            </div>
            <div title="Help" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <HelpSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Help</div>
              </div>
            </div>
            <div title="Send feedback" className={content_wrapper()}>
              <div className={styles.content_icon}>
                <FeedSvg />
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>Send feedback</div>
              </div>
            </div>
            {/* <== ABOUT AREA ==> */}
            <div className={line}></div>
            <div className={GetClassName(styles, "about", Theme)}>
              <div className={styles.txt}>
                Cloning YouTube with pure sass, Javascript and React Framework
                2020.
              </div>
              <div className={styles.txt}>
                Author: <span className={styles["txt--name"]}>Larbi Sahli</span>
              </div>
              <div className={styles.txt}>
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GetClassName(styles, "tt", Theme)}
                  href="https://github.com/larbisahli/youtube-clone"
                >
                  YouTube-Clone
                </a>
              </div>
              <div
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.txt} ${styles["txt--x"]}`}
              >
                GitHub:{" "}
                <a
                  className={GetClassName(styles, "tt", Theme)}
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
};

export default memo(Guide);
