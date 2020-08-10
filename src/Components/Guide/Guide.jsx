import React, { useState, useCallback, useEffect, Fragment, memo } from "react";
import ReactDOM from "react-dom";
import styles from "./scss/guide.module.scss";
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
  SettingsSvg,
  HelpSvg,
  FeedSvg,
} from "../CompSvg";
import ItemLink from "./ItemLink";
import { PlayList, FrontSubscriptions, Subscriptions } from "./dummyData";
import { useSelector, useDispatch } from "react-redux";
import { HideGuideAction } from "../../redux";
import { ProfileImg } from "../CompUtils";

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
  const [IsShowMore, setIsShowMore] = useState(false);
  const [SubIsShowMore, setSubIsShowMore] = useState(false);
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const showGuide = useSelector((state) => state.Guide.showGuide);
  const guideMode = useSelector((state) => state.Guide.guideMode);
  const UrlLocation = useSelector((state) => state.Guide.urlLocation);

  // dispatch
  const dispatch = useDispatch();

  //  check the current page
  const CheckUrlLocation = useCallback(
    (value) => {
      return UrlLocation === value;
    },
    [UrlLocation]
  );

  //  Handle Show More Or Less
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

  return ReactDOM.createPortal(
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
        <div className={styles.wrapper}>
          <div className={styles.content_container}>
            <ItemLink to="/" label="Home" is_in="home">
              <HomeSvg changeColor={UrlLocation === "home"} Theme={Theme} />
            </ItemLink>

            <ItemLink to="/" label="Trending" is_in="trending">
              <TrendingSvg
                changeColor={UrlLocation === "trending"}
                Theme={Theme}
              />
            </ItemLink>

            <ItemLink to="/" label="Subscriptions" is_in="subscriptions">
              <SubscriptionSvg
                changeColor={UrlLocation === "subscriptions"}
                Theme={Theme}
              />
            </ItemLink>

            <div className={styles.line}></div>

            <ItemLink to="/" label="Library" is_in="library">
              <LibrarySvg
                changeColor={UrlLocation === "library"}
                Theme={Theme}
              />
            </ItemLink>

            <ItemLink to="/" label="History" is_in="history">
              <HistorySvg
                changeColor={CheckUrlLocation("history")}
                Theme={Theme}
              />
            </ItemLink>

            <ItemLink to="/" label="Your videos" is_in="">
              <VideoSvg Theme={Theme} />
            </ItemLink>

            <ItemLink to="/playlist?list=WL" label="Watch later" is_in="WL">
              <WatchLaterSvg
                changeColor={CheckUrlLocation("WL")}
                Theme={Theme}
              />
            </ItemLink>

            <ItemLink to="/playlist?list=LV" label="Liked videos" is_in="LV">
              <LikeSvg changeColor={CheckUrlLocation("LV")} Theme={Theme} />
            </ItemLink>
            {/* -- */}
            {IsShowMore &&
              PlayList.map((play, index) => {
                return (
                  <ItemLink key={index} to="/" label={play} is_in="">
                    <PlayListSvg Theme={Theme} />
                  </ItemLink>
                );
              })}

            <div
              onClick={HandleShowMoreOrLess}
              className={styles.content_wrapper}
            >
              <div className={styles.content_icon}>
                {IsShowMore ? (
                  <UpArrowSvg Theme={Theme} />
                ) : (
                  <DownArrowSvg Theme={Theme} />
                )}
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>{`Show ${
                  SubIsShowMore ? "less" : "more"
                }`}</div>
              </div>
            </div>

            {/* -- */}
            <div className={styles.line}></div>
            <div className={styles.subtitle}>SUBSCRIPTIONS</div>
            {FrontSubscriptions.map((FrontSub, index) => {
              return (
                <div
                  key={index}
                  title={FrontSub.name}
                  className={styles.content_wrapper}
                >
                  <div className={styles.content_icon}>
                    <ProfileImg width={"24"} height={"24"} src={FrontSub.img} />
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
                    className={styles.content_wrapper}
                  >
                    <div className={styles.content_icon}>
                      <ProfileImg
                        width={"24"}
                        height={"24"}
                        src={FrontSub.img}
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
              onClick={HandleSubscriptionShowMoreOrLess}
              className={styles.content_wrapper}
            >
              <div className={styles.content_icon}>
                {SubIsShowMore ? (
                  <UpArrowSvg Theme={Theme} />
                ) : (
                  <DownArrowSvg Theme={Theme} />
                )}
              </div>
              <div className={styles.text_container}>
                <div className={styles.text_wrap}>{`Show ${
                  SubIsShowMore ? "less" : "more"
                }`}</div>
              </div>
            </div>

            {/* -- */}
            <div className={styles.line}></div>
            <div className={styles.subtitle}>MORE FROM YOUTUBE</div>

            <ItemLink to="/" label="Gaming" is_in="">
              <GamingSvg Theme={Theme} />
            </ItemLink>

            <ItemLink to="/" label="Live" is_in="">
              <LiveDefaultSvg Theme={Theme} />
            </ItemLink>
            {/* -- */}
            <div className={styles.line}></div>

            <ItemLink to="/" label="Settings" is_in="">
              <SettingsSvg Theme={Theme} />
            </ItemLink>

            <ItemLink to="/" label="Report history" is_in="">
              <FlagSvg Theme={Theme} />
            </ItemLink>

            <ItemLink to="/" label="Help" is_in="">
              <HelpSvg Theme={Theme} />
            </ItemLink>

            <ItemLink to="/" label="Send feedback" is_in="">
              <FeedSvg Theme={Theme} />
            </ItemLink>

            {/* -- */}
            <div className={styles.line}></div>
            <div className={styles.about}>
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
                  className={styles.tt}
                  href="https://github.com/larbisahli/youtube-clone-spa"
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
                <a className={styles.tt} href="https://github.com/larbisahli">
                  larbisahli
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("guide")
  );
};

export default memo(Guide);
