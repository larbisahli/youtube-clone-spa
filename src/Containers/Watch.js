import React, { useEffect, useContext, useState, useCallback } from "react";
import "./Sass/watch_style.scss";
import { UrlLocationContext, GuideContext } from "../Context";
import { UrlLocation } from "../utils";
import { useLocation } from "react-router";
import { VideoPlayer } from "../Components";
import { QueueContext } from "../Context";
import { Seek, DestroyIframe } from "../Components/ComponentsUtils/VideoPlayer";

let SeekSeen = false;

const Watch = React.memo(() => {
  // ===========================
  //  Handle Location Context
  // ===========================
  const [UrlLocationState, setUrlLocationState] = useContext(
    UrlLocationContext
  );

  const [, HundleShowGuide] = useContext(GuideContext);

  // Queue Context
  const { QueueState, ShowQueueState } = useContext(QueueContext);
  const [ShowQueue, setShowQueue] = ShowQueueState;

  const [QueueList, QueueListDispatch] = QueueState;

  //
  const [VideoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    HundleShowGuide(false);
    const UrlLoc = UrlLocation(false);
    if (UrlLoc !== UrlLocationState) {
      setUrlLocationState(() => UrlLoc);
    }
  }, [HundleShowGuide, UrlLocationState, setUrlLocationState]);

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const HandleQueryParams = useCallback(
    (param) => {
      const q = query.get(param);
      if (q) {
        return q;
      } else {
        return 0;
      }
    },
    [query]
  );

  const onPlayerStateChange = useCallback(
    (event) => {
      console.log("event.data :----->> ", event.data);
      switch (event.data) {
        case 3:
          setVideoLoaded(true);
          break;
        case 1:
          // 1 means the player is ready to play
          if (!SeekSeen) {
            if (HandleQueryParams("t") !== 0) {
              Seek(HandleQueryParams("t"));
              SeekSeen = true;
            }
          }
          break;
        default:
          break;
      }
    },
    [HandleQueryParams]
  );

  useEffect(() => {
    return () => {
      // Clean Up
      DestroyIframe();

      if (QueueList.length !== 0) {
        QueueListDispatch({
          type: "removeAll",
        });
      }
      // restore the global var to default for the next video seek
      SeekSeen = false;
    };
  }, [QueueListDispatch, QueueList]);

  return (
    <div className="watch_container">
      <div className="watch_primary">
        <div className="watch_primary__inner">
          <div className="watch_player_container">
            <div
              className={`watch_player_container__inner watch_player_container__inner--${
                VideoLoaded ? "visible" : "hidden"
              }`}
            >
              <VideoPlayer
                PlayerId="watch-player"
                check={true}
                HandlePlayingVideo={() => HandleQueryParams("v")}
                onPlayerStateChange={onPlayerStateChange}
                //onPlayerError={onPlayerError}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="watch_secondary">secondary</div>
    </div>
  );
});

export default Watch;
