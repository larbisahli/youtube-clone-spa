import React, { useState, useCallback, memo } from "react";
import ReactDOM from "react-dom";
import styles from "./scss/queue.module.scss";
import { DownArrowSvg, UpArrowSvg, AddPlayListSvg } from "../CompSvg";
import { ReactComponent as PlayBtnSvg } from "../../assets/icon/PlayBtn.svg";
import { ReactComponent as PauseBtnSvg } from "../../assets/icon/PauseBtn.svg";
import { ReactComponent as ExpandSvg } from "../../assets/icon/Expand.svg";
import { ReactComponent as CloseBtnSvg } from "../../assets/icon/CloseBtn.svg";
import { ReactComponent as NextBtnSvg } from "../../assets/icon/NextBtn.svg";
import { ReactComponent as PrevBtnSvg } from "../../assets/icon/PrevBtn.svg";
import {
  VideoPlayer,
  PauseVideo,
  PlayVideo,
  getCurrentTime,
  StopVideo,
  DestroyIframe,
} from "../index";
import { LazyRender } from "../CompUtils";
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
import classNames from "classnames/bind";
import { PlayItemsList } from "./PlayItemsList";

let cx = classNames.bind(styles);

const Queue = () => {
  const ShowQueue = useSelector((state) => state.DisplayQueue);
  const QueueList = useSelector((state) => state.QueueList);
  const dispatch = useDispatch();
  const [ShowList, setShowList] = useState(false);
  // Play Btn Toggle between pause and play State
  const [ShowPlayBtn, setShowPlayBtn] = useState(false);
  const [VideoLoaded, setVideoLoaded] = useState(false);

  const HandlePlayingVideo = useCallback(() => {
    let vidId = "";

    if (QueueList.length !== 0 && QueueList[0] !== undefined) {
      vidId = QueueList.filter((plv) => {
        if (plv) return plv.playing;
        return false;
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

  //  Get the current playing video title
  const HandlePlayingVidTitle = useCallback(() => {
    const plv = QueueList.filter((plv) => {
      if (plv) return plv.videoId === HandlePlayingVideo();
      return false;
    });

    if (plv.length !== 0) {
      return plv[0].title;
    } else if (QueueList.length !== 0) {
      if (QueueList[0]) return QueueList[0].title;
    } else {
      return "";
    }
  }, [HandlePlayingVideo, QueueList]);

  // Get the index of the current playing video
  const GetCurrentPlayingVidIndex = useCallback(() => {
    const index = QueueList.map((e) => {
      if (e) return e.videoId;
      return null;
    }).indexOf(HandlePlayingVideo());

    if (index !== -1) {
      return index;
    } else {
      return 0;
    }
  }, [HandlePlayingVideo, QueueList]);

  //  Handle Closing Queue
  const HandleCloseQueue = useCallback(() => {
    // Clean Up
    StopVideo();
    dispatch(HideQueueAction());

    DestroyIframe();
    dispatch(RemoveAllQueueAction());
  }, [dispatch]);

  //  Keep Track of Video clicks
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

  // Handle Pause Video
  const PauseVid = () => {
    PauseVideo();
    setShowPlayBtn(() => true);
  };

  // Handle Play Video
  const PlayVid = () => {
    PlayVideo();
    setShowPlayBtn(() => false);
  };

  //  Handle Error Message
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

  return ReactDOM.createPortal(
    <LazyRender render={ShowQueue}>
      <div
        style={{
          // 225px + 285px + 65px = 575px
          transform: `translate3d(0, ${
            ShowQueue ? (ShowList ? "0" : "285px") : "575px"
          }, 0)`,
        }}
        className={styles.container}
      >
        <div className={styles.wrapper}>
          <div id="q-player" className={styles.video_container}>
            {/* Video Iframe */}

            <div
              className={cx("miniplayer", {
                "miniplayer--visible": VideoLoaded,
                "miniplayer--hidden": !VideoLoaded,
              })}
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
              className={cx("inner_btn", "inner_btn--prev")}
            >
              <PrevBtnSvg />
            </div>

            <div
              onClick={() => {
                dispatch(PlayNextQueueAction());
              }}
              className={cx("inner_btn", "inner_btn--next")}
            >
              <NextBtnSvg />
            </div>
            <div
              onClick={handleExpandBtn}
              className={cx("inner_btn", "inner_btn--expandbtn")}
            >
              <ExpandSvg />
            </div>
            <div
              onClick={HandleCloseQueue}
              className={cx("inner_btn", "inner_btn--closebtn")}
            >
              <CloseBtnSvg />
            </div>

            {ShowPlayBtn ? (
              <div
                onClick={PlayVid}
                className={cx("inner_btn", "inner_btn--mid")}
              >
                <PlayBtnSvg />
              </div>
            ) : (
              <div
                onClick={PauseVid}
                className={cx("inner_btn", "inner_btn--mid")}
              >
                <PauseBtnSvg />
              </div>
            )}

            <div className="ytb_playbtn"></div>
          </div>
          <div className={styles.header}>
            <div className={styles.header_wrap}>
              <div className={styles.header_wrap__title}>
                <span>{HandlePlayingVidTitle()}</span>
              </div>
              <div
                onClick={() => setShowList((value) => !value)}
                className={styles.header_wrap__counter}
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
              className={styles.arrow_btn}
            >
              <div className={styles.arrow_btn__wrap}>
                {ShowList ? <DownArrowSvg /> : <UpArrowSvg />}
              </div>
            </div>
          </div>
          {/* PLAYLIST CONTAINER */}
          <div className={styles.playlist_container}>
            <div className={styles.panel}>
              <div className={styles.panel__txtwrap}>
                <AddPlayListSvg />

                <span>save</span>
              </div>
            </div>
            {/* PLAYLIST ITEMS */}
            <div className={styles.items}>
              {QueueList.map((plv, index) => {
                return (
                  <PlayItemsList
                    plv={plv}
                    key={index}
                    HandlePlayingVideo={HandlePlayingVideo}
                    HandleDelClick={HandleDelClick}
                    isQueue={true}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </LazyRender>,
    document.getElementById("queue")
  );
};

export default memo(Queue);
