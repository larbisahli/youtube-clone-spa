import React, { useContext, useState, useCallback, useEffect } from "react";
import "./queue_style.scss";
import { DownArrowSvg, UpArrowSvg } from "../GuideComponents/Svg";
import { AddPlayListSvg, DRSvg, TrashSvg } from "../../Containers/Svg";
import { ThemeContext, QueueContext, MessageBoxContext } from "../../Context";
import { HandleDuration, TextReducer, ReturnTheme } from "../../utils";
import {
  PlayBtnSvg,
  PauseBtnSvg,
  ExpandSvg,
  CloseBtnSvg,
  NextBtnSvg,
  PrevBtnSvg,
} from "./Svg";
import { VideoPlayer } from "../ComponentsUtils";
import {
  PauseVideo,
  PlayVideo,
  getCurrentTime,
  StopVideo,
  //ForceDestroyIframe,
  DestroyIframe,
} from "../ComponentsUtils/VideoPlayer";
import { useHistory } from "react-router-dom";
import { LazyLoad } from "../ComponentsUtils";

const PlayListItems = React.memo(({ plv, CurrentPlayingVidIndex }) => {
  // Queue Context
  const { QueueState } = useContext(QueueContext);
  const [, QueueListDispatch] = QueueState;

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // ===============
  //  Handle Delete
  // ===============
  const HandleDelClick = useCallback(
    (videoId) => {
      QueueListDispatch({ type: "removeOne", videoId });
    },
    [QueueListDispatch]
  );

  return (
    <div
      onClick={() =>
        QueueListDispatch({
          type: "play",
          videoId: plv.videoId,
        })
      }
      className={`ytb_miniplayer__plv_container ytb_miniplayer__plv_container--${ReturnTheme(
        Theme
      )} ${
        CurrentPlayingVidIndex() === plv.index
          ? `ytb_vis_playing--${ReturnTheme(Theme)}`
          : ""
      }`}
    >
      <div className="ytb_playbtn_area">
        {plv.playing ? (
          <div className="ytb_playbtn_area__playing">▶</div>
        ) : (
          <div className="ytb_playbtn_area__drag">
            <DRSvg />
          </div>
        )}
      </div>
      <div className="ytb_video_wrapper">
        <div className="ytb_video_wrapper__thumbnail">
          <div className="">
            <img
              width="100"
              className="ytb_plvt_img"
              src={plv.thumbnail}
              alt=""
            />
          </div>
          <div className="ytb_plv_duration">{HandleDuration(plv.duration)}</div>
        </div>
        <div className="ytb_video_wrapper__body_container">
          <div className="ytb_plv_header_wrap">
            <div className="ytb_plv_header_wrap__title">
              {TextReducer(plv.title, 40)}
            </div>
            <div
              className={`ytb_plv_header_wrap__chtitle ytb_plv_header_wrap__chtitle--${ReturnTheme(
                Theme
              )}`}
            >
              {plv.channelTitle}
            </div>
          </div>
          <div className="ytb_plv_del_btn_container">
            <div
              onClick={() => HandleDelClick(plv.videoId, plv.index)}
              className={`ytb_plv_del_btn ytb_plv_del_btn--${ReturnTheme(
                Theme
              )} ${
                CurrentPlayingVidIndex() === plv.index ? "ytb_delbtn_not" : ""
              }`}
            >
              <TrashSvg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Queue = React.memo(() => {
  // Queue Context
  const { QueueState, ShowQueueState } = useContext(QueueContext);
  const [ShowQueue, setShowQueue] = ShowQueueState;
  const [QueueList, QueueListDispatch] = QueueState;

  // Show Queue list State
  const [ShowList, setShowList] = useState(false);

  // Play Btn Toggle between pause and play State
  const [ShowPlayBtn, setShowPlayBtn] = useState(false);

  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Message Box Context
  const [, setMessageBox] = useContext(MessageBoxContext);

  //
  const [VideoLoaded, setVideoLoaded] = useState(false);

  // =======================================
  // Get the videoId if the {playing : true}
  // =======================================

  const HandlePlayingVideo = useCallback(() => {
    let vidId = "";

    if (QueueList.length !== 0) {
      vidId = QueueList.filter((plv) => {
        return plv.playing;
      });

      if (vidId.length !== 0) {
        vidId = vidId[0].videoId;
      } else {
        vidId = QueueList[0].videoId;
        QueueListDispatch({
          type: "play",
          videoId: QueueList[0].videoId,
        });
      }
    } else {
      return "";
    }

    return vidId;
  }, [QueueList, QueueListDispatch]);

  // ===================================
  //  Get the current playing video title
  // ===================================

  const HandleVidPlayingTitle = useCallback(() => {
    const plv = QueueList.filter((plv) => {
      return plv.videoId === HandlePlayingVideo();
    });

    if (plv.length !== 0) {
      return plv[0].title;
    } else if (QueueList.length !== 0) {
      return QueueList[0].title;
    } else {
      return "";
    }
  }, [HandlePlayingVideo, QueueList]);

  // ==================================
  // Get the index of the current video
  // ==================================

  const CurrentPlayingVidIndex = useCallback(() => {
    const plv = QueueList.filter((plv) => {
      return plv.videoId === HandlePlayingVideo();
    });

    if (plv.length !== 0) {
      return plv[0].index;
    } else {
      return 0;
    }
  }, [HandlePlayingVideo, QueueList]);

  // ==================================
  // Video index for next or prev video
  // ==================================

  const HandleVideoIndex = useCallback(() => {
    if (QueueList.length !== 0) {
      return QueueList.filter((plv) => {
        return plv.playing;
      })[0].index;
    } else {
      return 0;
    }
  }, [QueueList]);

  // ======================
  // Handle Closing Queue
  // ======================

  const HandleCloseQueue = useCallback(() => {
    // Clean Up
    StopVideo();
    setShowQueue(() => false);
    DestroyIframe();
    QueueListDispatch({
      type: "removeAll",
    });
  }, [QueueListDispatch, setShowQueue]);

  // ============================
  //  Keep Track of Video clicks
  // ============================

  const onPlayerStateChange = useCallback(
    (event) => {
      console.log("event.data :", event.data);
      switch (event.data) {
        case 0:
          // play next video when the current video finished
          QueueListDispatch({
            type: "play_next",
            index: HandleVideoIndex(),
          });
          break;
        case 1:
          setShowPlayBtn(() => false);
          break;
        case 3:
          setShowPlayBtn(() => false);
          setVideoLoaded(true);
          break;
        case 5:
          setShowPlayBtn(() => true);
          break;
        case 2:
          setShowPlayBtn(() => true);
          break;
        default:
          break;
      }
    },
    [QueueListDispatch, HandleVideoIndex]
  );

  // ===================
  // Handle Pause Video
  // ===================

  const PauseVid = useCallback(() => {
    PauseVideo();
    setShowPlayBtn(() => true);
  }, []);

  // ==================
  // Handle Play Video
  // ==================

  const PlayVid = useCallback(() => {
    PlayVideo();
    setShowPlayBtn(() => false);
  }, []);

  // ======================
  //  Handle Error Message
  // ======================

  const HandleClosingMessageBox = useCallback(() => {
    setMessageBox((pre) => {
      return {
        show: false,
        message: pre.message,
        btnMessage: pre.btnMessage,
        MassageFrom: "",
        id: "",
      };
    });
  }, [setMessageBox]);

  const onPlayerError = useCallback(
    (event) => {
      switch (event.data) {
        case 2:
          break;
        case 100:
          setMessageBox({
            show: true,
            message: "The video requested was not found",
            btnMessage: "",
            MassageFrom: "",
            id: "",
          });

          setTimeout(() => {
            HandleClosingMessageBox();
          }, 4000);
          break;
        case 150:
          setMessageBox({
            show: true,
            message: "The Video owner does not allow embedded players",
            btnMessage: "",
            MassageFrom: "",
            id: "",
          });

          setTimeout(() => {
            HandleClosingMessageBox();
          }, 4000);
          break;
        default:
          break;
      }
    },
    [setMessageBox, HandleClosingMessageBox]
  );

  //
  let history = useHistory();

  const handleExpandBtn = () => {
    let t = 0;
    if (getCurrentTime()) {
      t = getCurrentTime();
    }
    setShowQueue(() => false);
    history.push(`/watch?v=${HandlePlayingVideo()}&t=${Math.floor(t)}&list=q`);
    DestroyIframe();
  };

  return (
    <LazyLoad render={ShowQueue}>
      <div
        style={{
          // 225px + 285px + 65px = 575px
          transform: `translate3d(0, ${
            ShowQueue ? (ShowList ? "0" : "285px") : "575px"
          }, 0)`,
        }}
        className={`ytb_miniplayer ytb_miniplayer--${ReturnTheme(Theme)}`}
      >
        <div
          className={`ytb_miniplayer__wrapper ytb_miniplayer__wrapper--${ReturnTheme(
            Theme
          )}`}
        >
          <div id="q-player" className="ytb_miniplayer__video_container">
            {/* Video Iframe */}

            <div
              className={`miniplayer miniplayer--${
                VideoLoaded ? "visible" : "hidden"
              }`}
            >
              <VideoPlayer
                PlayerId="mini-player"
                check={ShowQueue}
                HandlePlayingVideo={HandlePlayingVideo}
                onPlayerStateChange={onPlayerStateChange}
                onPlayerError={onPlayerError}
              />
            </div>
            {/* <div className="ytb_pp_btn ytb_pp_btn-bg"></div> */}
            <div
              onClick={() =>
                QueueListDispatch({
                  type: "play_prev",
                  index: HandleVideoIndex(),
                })
              }
              className="ytb_inner_btn ytb_inner_btn--prev"
            >
              <PrevBtnSvg />
            </div>
            <div
              onClick={() =>
                QueueListDispatch({
                  type: "play_next",
                  index: HandleVideoIndex(),
                })
              }
              className="ytb_inner_btn ytb_inner_btn--next"
            >
              <NextBtnSvg />
            </div>
            <div
              onClick={handleExpandBtn}
              className="ytb_inner_btn ytb_inner_btn--expandbtn"
            >
              <ExpandSvg />
            </div>
            <div
              onClick={HandleCloseQueue}
              className="ytb_inner_btn ytb_inner_btn--closebtn"
            >
              <CloseBtnSvg />
            </div>

            {ShowPlayBtn ? (
              <div
                onClick={PlayVid}
                className="ytb_inner_btn ytb_inner_btn--mid"
              >
                <PlayBtnSvg />
              </div>
            ) : (
              <div
                onClick={PauseVid}
                className="ytb_inner_btn ytb_inner_btn--mid"
              >
                <PauseBtnSvg />
              </div>
            )}

            <div className="ytb_playbtn"></div>
          </div>
          <div
            className={`ytb_miniplayer__header_container ytb_miniplayer__header_container--${ReturnTheme(
              Theme
            )}`}
          >
            <div className="ytb_header_wrap">
              <div className="ytb_header_wrap__title">
                <span>{TextReducer(HandleVidPlayingTitle(), 50)}</span>
              </div>
              <div
                onClick={() => setShowList((value) => !value)}
                className={`ytb_header_wrap__qcounter ytb_header_wrap__qcounter--${ReturnTheme(
                  Theme
                )}`}
              >
                <div>Queue</div>
                <span>•</span>
                <div>{`${
                  QueueList.length === 0 ? 0 : CurrentPlayingVidIndex() + 1
                } / ${QueueList.length}`}</div>
              </div>
            </div>
            <div
              onClick={() => setShowList((value) => !value)}
              className="ytb_arrow_btn"
            >
              <div
                className={`ytb_arrow_btn__btnwrap ytb_arrow_btn__btnwrap--${ReturnTheme(
                  Theme
                )}`}
              >
                {ShowList ? <DownArrowSvg /> : <UpArrowSvg />}
              </div>
            </div>
          </div>
          {/* PLAYLIST CONTAINER */}
          <div
            className={`ytb_miniplayer__playlist_container ytb_miniplayer__playlist_container--${ReturnTheme(
              Theme
            )}`}
          >
            <div
              className={`ytb_playlist_panel ytb_playlist_panel--${ReturnTheme(
                Theme
              )}`}
            >
              <div className="ytb_playlist_panel__txt_wrap">
                <AddPlayListSvg />

                <span>save</span>
              </div>
            </div>
            {/* PLAYLIST ITEMS */}
            <div
              className={`ytb_playlist_items ytb_playlist_items--${ReturnTheme(
                Theme
              )}`}
            >
              {QueueList.map((plv, index) => {
                return (
                  <PlayListItems
                    plv={plv}
                    key={index}
                    CurrentPlayingVidIndex={CurrentPlayingVidIndex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  );
});

export default Queue;
