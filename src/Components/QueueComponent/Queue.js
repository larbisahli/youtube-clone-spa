import React, { useContext, useState, useCallback } from "react";
import "./queue_style.scss";
import { DownArrowSvg, UpArrowSvg } from "../GuideComponents/Svg";
import { AddPlayListSvg, DRSvg, TrashSvg } from "../../Containers/Svg";
import { QueueContext } from "../../Context/QueueContext";
import { HandleDuration, TextReducer } from "../../config";
import {
  PlayBtnSvg,
  PauseBtnSvg,
  ExpandSvg,
  CloseBtnSvg,
  NextBtnSvg,
  PrevBtnSvg
} from "./Svg";
import { VideoPlayer } from "../.";
import {
  PauseVideo,
  PlayVideo,
  getCurrentTime
} from "../VideoPlayerComponent/VideoPlayer";

const PLitems = React.memo(({ plv, HandleWhoPlaying }) => {
  // Queue Context
  const { QueueState } = useContext(QueueContext);
  const [, QueueListDispatch] = QueueState;

  // ===============
  //  Handle Delete
  // ===============
  const HandleDelClick = useCallback(
    videoId => {
      QueueListDispatch({ type: "removeOne", videoId });
    },
    [QueueListDispatch]
  );

  return (
    <div
      onClick={() =>
        QueueListDispatch({
          type: "play",
          videoId: plv.videoId
        })
      }
      className={`ytp_playlist_v_con ${
        HandleWhoPlaying() === plv.index ? "ytp_current_playing_v" : ""
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
            <div className="ytp_playlist_pl_chtitle">{plv.channelTitle}</div>
          </div>
          <div className="ytp_playlist_del">
            <div
              onClick={() => HandleDelClick(plv.videoId, plv.index)}
              className={`ytp_playlist_delbtn ${
                HandleWhoPlaying() === plv.index ? "ytp_delbtn_not" : ""
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

  // =======================================
  // Get the videoId if the {playing : true}
  // =======================================

  const HandlePlayingVideo = useCallback(() => {
    let vidId = "";

    if (QueueList.length !== 0) {
      vidId = QueueList.filter(plv => {
        return plv.playing;
      });

      if (vidId.length !== 0) {
        vidId = vidId[0].videoId;
      } else {
        vidId = QueueList[0].videoId;
        QueueListDispatch({
          type: "play",
          videoId: QueueList[0].videoId
        });
      }
    }

    return vidId;
  }, [QueueList, QueueListDispatch]);

  // ===================================
  //  Get the current playing video title
  // ===================================

  const HandleVidPlayingTitle = useCallback(() => {
    const plv = QueueList.filter(plv => {
      return plv.videoId === HandlePlayingVideo();
    });

    if (plv.length !== 0) {
      return plv[0].title;
    } else {
      return "";
    }
  }, [HandlePlayingVideo, QueueList]);

  // ==================================
  // Get the index of the current video
  // ==================================

  const HandleWhoPlaying = useCallback(() => {
    const plv = QueueList.filter(plv => {
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
      return QueueList.filter(plv => {
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
      type: "removeAll"
    });
  }, [QueueListDispatch, setShowQueue]);

  // ============================
  //  Keep Track of Video clicks
  // ============================

  const onPlayerStateChange = useCallback(
    event => {
      console.log("==<> :", event.data);

      switch (event.data) {
        case 0:
          QueueListDispatch({
            type: "play_next",
            index: HandleVideoIndex()
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
  }, []);

  // ==================
  // Handle Play Video
  // ==================

  const PlayVid = useCallback(() => {
    PlayVideo();
  }, []);

  // ======================
  //  Handle Error Message
  // ======================

  const onPlayerError = useCallback(event => {
    switch (event.data) {
      case 2:
        console.log("The request contains an invalid parameter value");
        break;
      case 100:
        console.log("The video requested was not found");
        break;
      case 101 || 150:
        console.log("The Video owner does not allow embedded players");
        break;
      default:
        break;
    }
  }, []);

  //console.log("queue :", getCurrentTime());

  return (
    <div
      style={{
        // 225px + 285px + 65px = 575px
        transform: `translate3d(0, ${
          ShowQueue ? (ShowList ? "0" : "285px") : "575px"
        }, 0)`
      }}
      className="ytp_miniplayer_container"
    >
      <div className="ytp_miniplayer_wrapper">
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
                index: HandleVideoIndex()
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
                index: HandleVideoIndex()
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
        <div className="ytp_heading_miniplayer_con">
          <div className="ytp_heading_wrap">
            <div className="ytp_title">
              <span>{TextReducer(HandleVidPlayingTitle(), 40)}</span>
            </div>
            <div
              onClick={() => setShowList(value => !value)}
              className="ytp_stat"
            >
              <div>Queue</div>
              <span>•</span>
              <div>{`${QueueList.length === 0 ? 0 : HandleWhoPlaying() + 1} / ${
                QueueList.length
              }`}</div>
            </div>
          </div>
          <div
            onClick={() => setShowList(value => !value)}
            className="ytp_show_more_svg"
          >
            <div className="ytp_smv_btn">
              {ShowList ? <DownArrowSvg /> : <UpArrowSvg />}
            </div>
          </div>
        </div>
        {/* PLAYLIST CONTAINER */}
        <div className="ytp_playlist_miniplayer_con">
          <div className="ytp_playlist_panel">
            <div className="ytp_playlist_panel_head">
              <AddPlayListSvg />

              <span>save</span>
            </div>
          </div>
          {/* PLAYLIST ITEMS */}
          <div className="ytp_playlist_items_con">
            {QueueList.map((plv, index) => {
              return (
                <PLitems
                  plv={plv}
                  key={index}
                  HandleWhoPlaying={HandleWhoPlaying}
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
