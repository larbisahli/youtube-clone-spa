import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment,
} from "react";
import "./sass/guide_style.scss";
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
import { GuideContext, ThemeContext, UrlLocationContext } from "../../Context";
import { ReturnTheme } from "../../utils/utils";
import { PlayList, FrontSubscriptions, Subscriptions } from "./dummyData";

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

const Guide = React.memo(() => {
  // Show more State
  const [IsShowMore, setIsShowMore] = useState(false);

  // Subscription Show More State
  const [SubIsShowMore, setSubIsShowMore] = useState(false);

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // UrlLocation context
  const [UrlLocationState] = useContext(UrlLocationContext);

  // Guide Context
  const { winSize, guide } = useContext(GuideContext);
  const [windowSize] = winSize;
  const [ShowGuide, setShowGuide] = guide;

  // ===========================
  //  Handle Show More Or Less
  //============================

  const HandleShowMoreOrLess = useCallback(() => {
    setIsShowMore(!IsShowMore);
  }, [setIsShowMore, IsShowMore]);

  const HandleSubscriptionShowMoreOrLess = useCallback(() => {
    setSubIsShowMore(!SubIsShowMore);
  }, [setSubIsShowMore, SubIsShowMore]);

  const line_guide = `guide__line guide__line--${ReturnTheme(Theme)}`;

  const content_wrapper = `guide__content_wrapper guide__content_wrapper--${ReturnTheme(
    Theme
  )}`;

  // Handle Close
  const HandleCloseGuide = useCallback(
    (event) => {
      const GUIDENODE = document.getElementById("GuideG");

      if (GUIDENODE) {
        if (GUIDENODE.isSameNode(event.target)) {
          setShowGuide(false);
          GUIDENODE.removeEventListener("click", HandleCloseGuide);
        }
      }
    },
    [setShowGuide]
  );

  useEffect(() => {
    // when windowSize change it trigger useEffect to do it's job

    const pageManager = document.getElementById("page-manager");
    const GUIDENODE = document.getElementById("GuideG");

    if (pageManager) {
      pageManager.style.marginLeft = ShowGuide ? "240px" : "72px";
    }

    if (GUIDENODE) {
      if (!ShowGuide && window.innerWidth <= 810 && ShowGuide !== null) {
        // for watch page
        //GUIDENODE.style.display = "block";

        GUIDENODE.style.transform = `translateX(-100%)`;
        GUIDENODE.style.display = "";
        GUIDENODE.addEventListener("click", HandleCloseGuide);

        //
      } else if (ShowGuide && window.innerWidth <= 810) {
        //

        GUIDENODE.style.transform = `translateX(0%)`;
        GUIDENODE.style.display = "";
        GUIDENODE.addEventListener("click", HandleCloseGuide);

        //
      } else if (!ShowGuide && window.innerWidth >= 810) {
        GUIDENODE.style.display = "none";
      } else if (ShowGuide && window.innerWidth >= 810) {
        GUIDENODE.style.display = "block";
      }
    }
  }, [ShowGuide, HandleCloseGuide, windowSize]);

  //
  const ReturnbgBlack = () => {
    if (ShowGuide === null) {
      return "none";
    } else if (ShowGuide && windowSize < 810) {
      return "block";
    } else if (!ShowGuide && windowSize < 810) {
      return "none";
    } else if ((ShowGuide || !ShowGuide) && windowSize > 810) {
      return "none";
    }
  };

  //
  const ReturnGuideDisplay = () => {
    if (windowSize < 810 && ShowGuide === null) {
      return "none";
    } else if (windowSize > 810 && ShowGuide === null) {
      return "block";
    } else if (ShowGuide) {
      return "block";
    } else if (ShowGuide) {
      return "none";
    }
  };

  return (
    <Fragment>
      <div
        className="bg_guide"
        // ShowGuide can be true or null
        style={{
          display: ReturnbgBlack(),
        }}
      ></div>
      <div
        id="GuideG"
        className="guide"
        style={{ display: ReturnGuideDisplay() }}
      >
        <div
          className={`guide__container guide__container--${ReturnTheme(Theme)}`}
        >
          <div className="guide__content_container">
            {/*--------------------*/}
            <Link
              to="/"
              title="Home"
              className={`${content_wrapper}${
                UrlLocationState === "home" ? "--active" : ""
              }`}
            >
              <div className="guide__content_logo">
                <HomeSvg changeColor={UrlLocationState === "home"} />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Home</div>
              </div>
            </Link>
            {/*--*/}
            <div
              title="Trending"
              className={`${content_wrapper}${
                UrlLocationState === "trending" ? "--active" : ""
              }`}
            >
              <div className="guide__content_logo">
                <TrendingSvg changeColor={UrlLocationState === "trending"} />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Trending</div>
              </div>
            </div>
            {/*--*/}
            <div
              title="Subscriptions"
              className={`${content_wrapper}${
                UrlLocationState === "subscriptions" ? "--active" : ""
              }`}
            >
              <div className="guide__content_logo">
                <SubscriptionSvg
                  changeColor={UrlLocationState === "subscriptions"}
                />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Subscriptions</div>
              </div>
            </div>
            <div className={line_guide}></div>
            {/*--------------------*/}
            <div
              title="Library"
              className={`${content_wrapper}${
                UrlLocationState === "library" ? "--active" : ""
              }`}
            >
              <div className="guide__content_logo">
                <LibrarySvg changeColor={UrlLocationState === "library"} />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Library</div>
              </div>
            </div>
            {/*--*/}
            <div
              title="History"
              className={`${content_wrapper}${
                UrlLocationState === "history" ? "--active" : ""
              }`}
            >
              <div className="guide__content_logo">
                <HistorySvg changeColor={UrlLocationState === "history"} />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">History</div>
              </div>
            </div>
            {/*--*/}
            <div title="Your videos" className={content_wrapper}>
              <div className="guide__content_logo">
                <VideoSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Your videos</div>
              </div>
            </div>
            {/*--*/}
            <Link
              to="/playlist/list=WL"
              title="Watch later"
              className={`${content_wrapper}${
                UrlLocationState === "WL" ? "--active" : ""
              }`}
            >
              <div className="guide__content_logo">
                <WatchLaterSvg changeColor={UrlLocationState === "WL"} />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Watch later</div>
              </div>
            </Link>
            {/*--*/}
            <div title="Liked videos" className={content_wrapper}>
              <div className="guide__content_logo">
                <LikeSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Liked videos</div>
              </div>
            </div>
            {/* <== START SHOW MORE AREA ==> */}
            {IsShowMore &&
              PlayList.map((play, index) => {
                return (
                  <div title={play} key={index} className={content_wrapper}>
                    <div className="guide__content_logo">
                      <PlayListSvg />
                    </div>
                    <div className="guide__text_container">
                      <div className="text_wrap">{play}</div>
                    </div>
                  </div>
                );
              })}

            <div
              title={`Show ${IsShowMore ? "less" : "more"}`}
              onClick={HandleShowMoreOrLess}
              className={content_wrapper}
            >
              <div className="guide__content_logo">
                {IsShowMore ? <UpArrowSvg /> : <DownArrowSvg />}
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">
                  {`Show ${IsShowMore ? "less" : "more"}`}
                </div>
              </div>
            </div>
            {/* <== END SHOW MORE AREA ==> */}
            <div className={line_guide}></div>
            {/* <== START SUBSCRIPTIONS AREA ==> */}
            <div
              className={`guide__subtitle guide__subtitle--${ReturnTheme(
                Theme
              )}`}
            >
              SUBSCRIPTIONS
            </div>
            {/* --- FrontSubscriptions --- */}
            {FrontSubscriptions.map((FrontSub, index) => {
              return (
                <div
                  key={index}
                  title={FrontSub.name}
                  className={content_wrapper}
                >
                  <div className="guide__content_logo">
                    <img
                      className={`guide__content_img guide__content_img--${ReturnTheme(
                        Theme
                      )}`}
                      height="24"
                      width="24"
                      src={FrontSub.img}
                      alt=""
                    />
                  </div>
                  <div className="guide__text_container">
                    <div className="text_wrap">{FrontSub.name}</div>
                  </div>
                  <div className="guide__svg_noti">
                    <LiveSvg
                      isLive={FrontSub.isLive}
                      notiExist={FrontSub.notiExist}
                      Theme={Theme}
                    />
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
                    className={content_wrapper}
                  >
                    <div className="guide__content_logo">
                      <img
                        className={`guide__content_img guide__content_img--${ReturnTheme(
                          Theme
                        )}`}
                        height="24"
                        width="24"
                        src={FrontSub.img}
                        alt=""
                      />
                    </div>
                    <div className="guide__text_container">
                      <div className="text_wrap">{FrontSub.name}</div>
                    </div>
                    <div className="guide__svg_noti">
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
              className={content_wrapper}
            >
              <div className="guide__content_logo">
                {SubIsShowMore ? <UpArrowSvg /> : <DownArrowSvg />}
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">
                  {`Show ${
                    SubIsShowMore ? "less" : `${Subscriptions.length} more`
                  }`}
                </div>
              </div>
            </div>

            {/* <== END SUBSCRIPTIONS AREA ==> */}
            <div className={line_guide}></div>
            {/* <== START MORE FROM YOUTUBE AREA ==> */}
            <div
              className={`guide__subtitle guide__subtitle--${ReturnTheme(
                Theme
              )}`}
            >
              MORE FROM YOUTUBE
            </div>
            <div title="Gaming" className={content_wrapper}>
              <div className="guide__content_logo">
                <GamingSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Gaming</div>
              </div>
            </div>
            <div title="Live" className={content_wrapper}>
              <div className="guide__content_logo">
                <LiveDefaultSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Live</div>
              </div>
            </div>
            {/* <== END MORE FROM YOUTUBE AREA ==> */}
            <div className={line_guide}></div>
            <div title="Settings" className={content_wrapper}>
              <div className="guide__content_logo">
                <SettingsSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Settings</div>
              </div>
            </div>
            <div title="Report history" className={content_wrapper}>
              <div className="guide__content_logo">
                <FlagSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Report history</div>
              </div>
            </div>
            <div title="Help" className={content_wrapper}>
              <div className="guide__content_logo">
                <HelpSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Help</div>
              </div>
            </div>
            <div title="Send feedback" className={content_wrapper}>
              <div className="guide__content_logo">
                <FeedSvg />
              </div>
              <div className="guide__text_container">
                <div className="text_wrap">Send feedback</div>
              </div>
            </div>
            {/* <== ABOUT AREA ==> */}
            <div className={line_guide}></div>
            <div
              className={`guide__about_wrapper guide__about_wrapper--${ReturnTheme(
                Theme
              )}`}
            >
              <div className="abt_tx">
                Cloning YouTube with pure sass, Javascript and React Framework
                2020.
              </div>
              <div className="abt_tx">
                Author: <span className="abt_tx--name">Larbi Sahli</span>
              </div>
              <div className="abt_tx">
                Source code:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`abt_lt abt_lt--${ReturnTheme(Theme)}`}
                  href="https://github.com/larbisahli/youtube-clone"
                >
                  YouTube-Clone
                </a>
              </div>
              <div
                target="_blank"
                rel="noopener noreferrer"
                className="abt_tx abt_tx--x"
              >
                GitHub:{" "}
                <a
                  className={`abt_lt abt_lt--${ReturnTheme(Theme)}`}
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
