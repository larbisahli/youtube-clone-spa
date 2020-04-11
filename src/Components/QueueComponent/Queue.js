import React, { useContext, useState, useCallback } from "react";
import "./queue_style.scss";
import { DownArrowSvg, UpArrowSvg } from "../GuideComponents/Svg";
import { AddPlayListSvg, DRSvg, TrashSvg } from "../../Containers/Svg";
import { ThemeContext, QueueContext, MessageBoxContext } from "../../Context";
import { HandleDuration, TextReducer, ReturnTheme } from "../../config";
import {
  PlayBtnSvg,
  PauseBtnSvg,
  ExpandSvg,
  CloseBtnSvg,
  NextBtnSvg,
  PrevBtnSvg,
} from "./Svg";
import { VideoPlayer } from "../.";
import {
  PauseVideo,
  PlayVideo,
  //getCurrentTime,
  StopVideo,
} from "../VideoPlayerComponent/VideoPlayer";

const PLitems = React.memo(({ plv, CurrentPlayingVidIndex }) => {
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
      className={`ytp_playlist_v_con ytp_playlist_v_con-${ReturnTheme(Theme)} ${
        CurrentPlayingVidIndex() === plv.index
          ? `ytp_current_playing_v-${ReturnTheme(Theme)}`
          : ""
      }`}
    >
      <div className="ytp_playlist_svg_area">
        {plv.playing ? <div className="ytp_playing">▶</div> : <DRSvg />}
      </div>
      <div className="ytp_playlist_plh_con">
        <div className="ytp_playlist_thumbnail">
          <div className="">
            <img
              width="100"
              className="ytp_playlist_img_thumb"
              src={plv.thumbnail}
              alt=""
            />
          </div>
          <div className="ytp_playlist_ab">{HandleDuration(plv.duration)}</div>
        </div>
        <div className="ytp_playlist_header_con">
          <div className="ytp_playlist_header_wrap">
            <div className="ytp_playlist_pl_title">
              {TextReducer(plv.title, 40)}
            </div>
            <div
              className={`ytp_playlist_pl_chtitle ytp_playlist_pl_chtitle-${ReturnTheme(
                Theme
              )}`}
            >
              {plv.channelTitle}
            </div>
          </div>
          <div className="ytp_playlist_del">
            <div
              onClick={() => HandleDelClick(plv.videoId, plv.index)}
              className={`ytp_playlist_delbtn ytp_playlist_delbtn-${ReturnTheme(
                Theme
              )} ${
                CurrentPlayingVidIndex() === plv.index ? "ytp_delbtn_not" : ""
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
    setShowQueue(() => false);
    QueueListDispatch({
      type: "removeAll",
    });
    // Clean Up
    StopVideo();
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

  //console.log("queue :", getCurrentTime());

  return (
    <div
      style={{
        // 225px + 285px + 65px = 575px
        transform: `translate3d(0, ${
          ShowQueue ? (ShowList ? "0" : "285px") : "575px"
        }, 0)`,
      }}
      className={`ytp_miniplayer_container ytp_miniplayer_container-${ReturnTheme(
        Theme
      )}`}
    >
      <div
        className={`ytp_miniplayer_wrapper ytp_miniplayer_wrapper-${ReturnTheme(
          Theme
        )}`}
      >
        <div className="ytp_video_miniplayer_con">
          {/* Video Iframe */}

          <VideoPlayer
            PlayerId="mini-Player"
            check={ShowQueue}
            HandlePlayingVideo={HandlePlayingVideo}
            onPlayerStateChange={onPlayerStateChange}
            onPlayerError={onPlayerError}
          />

          <div
            onClick={() =>
              QueueListDispatch({
                type: "play_prev",
                index: HandleVideoIndex(),
              })
            }
            className="ytp_pp_btn ytp_pp_btn-prev"
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
            className="ytp_pp_btn ytp_pp_btn-next"
          >
            <NextBtnSvg />
          </div>
          <div className="ytp_pp_btn ytp_pp_btn-expandbtn">
            <ExpandSvg />
          </div>
          <div
            onClick={HandleCloseQueue}
            className="ytp_pp_btn ytp_pp_btn-closebtn"
          >
            <CloseBtnSvg />
          </div>

          {ShowPlayBtn ? (
            <div onClick={PlayVid} className="ytp_pp_btn ytp_pp_btn-mid">
              <PlayBtnSvg />
            </div>
          ) : (
            <div onClick={PauseVid} className="ytp_pp_btn ytp_pp_btn-mid">
              <PauseBtnSvg />
            </div>
          )}

          <div className="ytp_playbtn"></div>
        </div>
        <div
          className={`ytp_heading_miniplayer_con ytp_heading_miniplayer_con-${ReturnTheme(
            Theme
          )}`}
        >
          <div className="ytp_heading_wrap">
            <div className="ytp_title">
              <span>{TextReducer(HandleVidPlayingTitle(), 40)}</span>
            </div>
            <div
              onClick={() => setShowList((value) => !value)}
              className={`ytp_stat ytp_stat-${ReturnTheme(Theme)}`}
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
            className="ytp_show_more_svg"
          >
            <div className={`ytp_smv_btn ytp_smv_btn-${ReturnTheme(Theme)}`}>
              {ShowList ? <DownArrowSvg /> : <UpArrowSvg />}
            </div>
          </div>
        </div>
        {/* PLAYLIST CONTAINER */}
        <div
          className={`ytp_playlist_miniplayer_con ytp_playlist_miniplayer_con-${ReturnTheme(
            Theme
          )}`}
        >
          <div
            className={`ytp_playlist_panel ytp_playlist_panel-${ReturnTheme(
              Theme
            )}`}
          >
            <div className="ytp_playlist_panel_head">
              <AddPlayListSvg />

              <span>save</span>
            </div>
          </div>
          {/* PLAYLIST ITEMS */}
          <div
            className={`ytp_playlist_items_con ytp_playlist_items_con-${ReturnTheme(
              Theme
            )}`}
          >
            {QueueList.map((plv, index) => {
              return (
                <PLitems
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
  );
});

export default Queue;
