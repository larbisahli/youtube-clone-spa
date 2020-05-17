import React, { useState, useCallback, memo } from "react";
import style from "./queue.module.scss";
import { DownArrowSvg, UpArrowSvg } from "../GuideComponents/Svg";
import { AddPlayListSvg, DRSvg, TrashSvg } from "../../Containers/Svg";
import {
  HandleDuration,
  TextReducer,
  ReturnTheme,
  GetClassName,
} from "../../utils";
import {
  PlayBtnSvg,
  PauseBtnSvg,
  ExpandSvg,
  CloseBtnSvg,
  NextBtnSvg,
  PrevBtnSvg,
} from "./Svg";
import {
  VideoPlayer,
  PauseVideo,
  PlayVideo,
  getCurrentTime,
  StopVideo,
  DestroyIframe,
  LazyLoad,
} from "../ComponentsUtils";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveOneQueueAction,
  PlayQueueAction,
  RemoveAllQueueAction,
  PlayNextQueueAction,
  PlayPrevQueueAction,
  HideQueueAction,
  CloseMessageAction,
  SetMessageAction,
  HideGuideAction,
  SetGuideModeAction,
  SetUrlLocationAction,
} from "../../redux";

const PlayListItems = memo(
  ({ plv, CurrentPlayingVidIndex, HandleClosingMessageBox }) => {
    // Theme
    const Theme = useSelector((state) => state.Theme.isDarkTheme);

    // dispatch
    const dispatch = useDispatch();

    //  Handle Delete
    const HandleDelClick = useCallback(
      (videoId) => {
        //
        dispatch(RemoveOneQueueAction(videoId));
        //
        dispatch(
          SetMessageAction({
            message: "Removed from Queue",
            btnText: "",
            from: "",
            id: "",
          })
        );

        setTimeout(() => {
          HandleClosingMessageBox();
        }, 4000);
      },
      [dispatch, HandleClosingMessageBox]
    );

    return (
      <div
        onClick={() => dispatch(PlayQueueAction(plv.videoId))}
        className={`${GetClassName(style, "block", Theme)} ${
          CurrentPlayingVidIndex() === plv.index
            ? style[`isplaying--${ReturnTheme(Theme)}`]
            : ""
        }`}
      >
        <div className={style.playbtn}>
          {plv.playing ? (
            <div className={style.playbtn__playing}>▶</div>
          ) : (
            <div className={style.playbtn__drag}>
              <DRSvg />
            </div>
          )}
        </div>
        <div className={style.itemwrap}>
          <div className={style.thumbnail}>
            <div>
              <img
                width="100"
                className={style.thumbnail__img}
                src={plv.thumbnail}
                alt=""
              />
            </div>
            <div className={style.thumbnail__duration}>
              {HandleDuration(plv.duration)}
            </div>
          </div>
          <div className={style.body_container}>
            <div className={style.text_area}>
              <div className={style.text_area__title}>
                {TextReducer(plv.title, 40)}
              </div>
              <div className={GetClassName(style, "text_area__chtitle", Theme)}>
                {plv.channelTitle}
              </div>
            </div>
            <div className={style.btncon}>
              <div
                onClick={() => HandleDelClick(plv.videoId, plv.index)}
                className={`${GetClassName(style, "btncon__del", Theme)} ${
                  CurrentPlayingVidIndex() === plv.index
                    ? style.btncon__hide
                    : ""
                }`}
              >
                <TrashSvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const Queue = memo(() => {
  // Queue
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // dispatch
  const dispatch = useDispatch();

  // Show Queue list State
  const [ShowList, setShowList] = useState(false);

  // Play Btn Toggle between pause and play State
  const [ShowPlayBtn, setShowPlayBtn] = useState(false);

  //
  const [VideoLoaded, setVideoLoaded] = useState(false);

  // ====================================================
  // Get the videoId if the {playing : true} in QueueList
  // ====================================================

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
        // play video
        dispatch(PlayQueueAction(QueueList[0].videoId));
      }
    } else {
      return "";
    }

    return vidId;
  }, [QueueList, dispatch]);

  // =====================================
  //  Get the current playing video title
  // =====================================

  const HandlePlayingVidTitle = useCallback(() => {
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

  // ===========================================
  // Get the index of the current playing video
  // ===========================================

  const GetCurrentPlayingVidIndex = useCallback(() => {
    const plv = QueueList.filter((plv) => {
      return plv.videoId === HandlePlayingVideo();
    });

    if (plv.length !== 0) {
      return plv[0].index;
    } else {
      return 0;
    }
  }, [HandlePlayingVideo, QueueList]);

  // ======================
  //  Handle Closing Queue
  // ======================

  const HandleCloseQueue = useCallback(() => {
    // Clean Up
    StopVideo();
    dispatch(HideQueueAction());

    DestroyIframe();
    dispatch(RemoveAllQueueAction());
  }, [dispatch]);

  // ============================
  //  Keep Track of Video clicks
  // ============================

  const onPlayerStateChange = useCallback(
    (event) => {
      switch (event.data) {
        case 0:
          // play next video when the current video has finished
          dispatch(PlayNextQueueAction());
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
    [dispatch]
  );

  // ===================
  // Handle Pause Video
  // ===================

  const PauseVid = () => {
    PauseVideo();
    setShowPlayBtn(() => true);
  };

  // ==================
  // Handle Play Video
  // ==================

  const PlayVid = () => {
    PlayVideo();
    setShowPlayBtn(() => false);
  };

  // ======================
  //  Handle Error Message
  // ======================

  const HandleClosingMessageBox = useCallback(() => {
    dispatch(CloseMessageAction());
  }, [dispatch]);

  const onPlayerError = useCallback(
    (event) => {
      switch (event.data) {
        case 2:
          break;
        case 100:
          dispatch(
            SetMessageAction({
              message: "The video requested was not found",
              btnText: "",
              from: "",
              id: "",
            })
          );

          setTimeout(() => {
            HandleClosingMessageBox();
          }, 4000);
          break;
        case 150:
          dispatch(
            SetMessageAction({
              message: "The Video owner does not allow embedded players",
              btnText: "",
              from: "",
              id: "",
            })
          );

          setTimeout(() => {
            HandleClosingMessageBox();
          }, 4000);
          break;
        default:
          break;
      }
    },
    [HandleClosingMessageBox, dispatch]
  );

  //
  let history = useHistory();

  const handleExpandBtn = () => {
    let t = 0;
    if (getCurrentTime()) {
      t = getCurrentTime();
    }

    dispatch(HideQueueAction());
    // for a smooth guide transition
    dispatch(HideGuideAction());
    dispatch(SetGuideModeAction(2));
    dispatch(SetUrlLocationAction("watch"));

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
        className={GetClassName(style, "container", Theme)}
      >
        <div className={GetClassName(style, "wrapper", Theme)}>
          <div id="q-player" className={style.video_container}>
            {/* Video Iframe */}

            <div
              className={`${style.miniplayer} ${
                style[`miniplayer--${VideoLoaded ? "visible" : "hidden"}`]
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

            <div
              onClick={() => {
                dispatch(PlayPrevQueueAction());
              }}
              className={`${style.inner_btn} ${style["inner_btn--prev"]}`}
            >
              <PrevBtnSvg />
            </div>

            <div
              onClick={() => {
                dispatch(PlayNextQueueAction());
              }}
              className={`${style.inner_btn} ${style["inner_btn--next"]}`}
            >
              <NextBtnSvg />
            </div>
            <div
              onClick={handleExpandBtn}
              className={`${style.inner_btn} ${style["inner_btn--expandbtn"]}`}
            >
              <ExpandSvg />
            </div>
            <div
              onClick={HandleCloseQueue}
              className={`${style.inner_btn} ${style["inner_btn--closebtn"]}`}
            >
              <CloseBtnSvg />
            </div>

            {ShowPlayBtn ? (
              <div
                onClick={PlayVid}
                className={`${style.inner_btn} ${style["inner_btn--mid"]}`}
              >
                <PlayBtnSvg />
              </div>
            ) : (
              <div
                onClick={PauseVid}
                className={`${style.inner_btn} ${style["inner_btn--mid"]}`}
              >
                <PauseBtnSvg />
              </div>
            )}

            <div className="ytb_playbtn"></div>
          </div>
          <div className={GetClassName(style, "header", Theme)}>
            <div className={style.header_wrap}>
              <div className={style.header_wrap__title}>
                <span>{TextReducer(HandlePlayingVidTitle(), 50)}</span>
              </div>
              <div
                onClick={() => setShowList((value) => !value)}
                className={GetClassName(style, "header_wrap__counter", Theme)}
              >
                <div>Queue</div>
                <span>•</span>
                <div>{`${
                  QueueList.length === 0 ? 0 : GetCurrentPlayingVidIndex() + 1
                } / ${QueueList.length}`}</div>
              </div>
            </div>
            <div
              onClick={() => setShowList((value) => !value)}
              className={style.arrow_btn}
            >
              <div className={GetClassName(style, "arrow_btn__wrap", Theme)}>
                {ShowList ? <DownArrowSvg /> : <UpArrowSvg />}
              </div>
            </div>
          </div>
          {/* PLAYLIST CONTAINER */}
          <div className={GetClassName(style, "playlist_container", Theme)}>
            <div className={GetClassName(style, "panel", Theme)}>
              <div className={style.panel__txtwrap}>
                <AddPlayListSvg />

                <span>save</span>
              </div>
            </div>
            {/* PLAYLIST ITEMS */}
            <div className={GetClassName(style, "items", Theme)}>
              {QueueList.map((plv, index) => {
                return (
                  <PlayListItems
                    plv={plv}
                    key={index}
                    CurrentPlayingVidIndex={GetCurrentPlayingVidIndex}
                    HandleClosingMessageBox={HandleClosingMessageBox}
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
