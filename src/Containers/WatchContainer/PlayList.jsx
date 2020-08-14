import React, { memo, useState, useEffect, useCallback } from "react";
import styles from "./scss/playlist.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayList } from "../../redux";
import { PlayItemsList } from "../../Components/Queue/PlayItemsList";
import { DownArrowSvg, UpArrowSvg } from "../../Components/CompSvg";

const PlayList = memo(({ HandleQueryParams }) => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  const WatchLater = useSelector((state) => state.WLV.WL);
  const LikedVideos = useSelector((state) => state.WLV.LV);
  const QueueList = useSelector((state) => state.QueueList);
  const PlayList_ = useSelector((state) => state.WLV.PlayList);
  const ApiKey = useSelector((state) => state.ApiKey);
  const [ShowList, setShowList] = useState(true);
  const dispatch = useDispatch();

  const ListParam = useCallback(
    (value) => {
      const param = HandleQueryParams("list");

      if (param !== 0) {
        if (value === param) {
          return true;
        }
      } else {
        return false;
      }
    },
    [HandleQueryParams]
  );

  // Get the index of the current playing video
  const GetVidIndex = (VidList) => {
    let index;
    const videoId = HandleQueryParams("v");

    if (VidList) {
      // in case VidList is undefined
      if (VidList.length !== 0) {
        VidList.filter((item, i) => {
          if (item.videoId === videoId) return (index = i);
          return 0;
        });

        return `${index + 1}/${VidList.length}`;
      }
    }

    return "0/0";
  };

  // ----------

  const ReturnTitle = () => {
    if (ListParam("wl")) {
      return ["Watch later", GetVidIndex(WatchLater)];
    } else if (ListParam("lv")) {
      return ["Liked videos", GetVidIndex(LikedVideos)];
    } else if (ListParam("q")) {
      return ["Queue", GetVidIndex(QueueList)];
    } else {
      return ["playlist", GetVidIndex(PlayList_.items)];
    }
  };

  // Make an API call to fetch playlist
  const playListId = HandleQueryParams("list");

  useEffect(() => {
    if (
      playListId !== "wl" &&
      playListId !== "lv" &&
      playListId !== "q" &&
      playListId !== 0
    ) {
      if (PlayList_.itemCount === 0) {
        dispatch(fetchPlayList(playListId, ApiKey));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, playListId, ApiKey]);

  // -------
  const plv = useCallback(() => {
    switch (HandleQueryParams("list")) {
      case "wl":
        return WatchLater;
      case "lv":
        return LikedVideos;
      case "q":
        return QueueList;
      default:
        if (!PlayList_.loading && HandleQueryParams("list") !== 0) {
          return PlayList_.items;
        } else {
          return [];
        }
    }
  }, [WatchLater, LikedVideos, QueueList, HandleQueryParams, PlayList_]);

  //

  const HandlePlayingVideo = useCallback(() => {
    return HandleQueryParams("v");
  }, [HandleQueryParams]);

  return (
    <div
      style={{ height: ShowList ? "400px" : "65px" }}
      className={styles.container}
    >
      {/* ====== LIST ====== */}
      <div className={styles.panel}>
        <div className={styles.panel__txtwrap}>
          <div className={styles.list_txt_area}>
            <span>{ReturnTitle()[0]}</span>
            <br />
            <span style={{ fontFamily: "Roboto-Regular", fontSize: ".82rem" }}>
              {ReturnTitle()[1]}
            </span>
          </div>
          <div
            className={styles.arrow_btn__wrap}
            onClick={() => {
              setShowList((prev) => !prev);
            }}
          >
            {ShowList ? (
              <UpArrowSvg Theme={Theme} />
            ) : (
              <DownArrowSvg Theme={Theme} />
            )}
          </div>
        </div>
      </div>
      {/* PLAYLIST ITEMS */}
      <div
        style={{ display: ShowList ? "block" : "none" }}
        className={styles.items}
      >
        {plv().map((plv, index) => {
          return (
            <PlayItemsList
              plv={plv}
              key={index}
              HandlePlayingVideo={HandlePlayingVideo}
              HandleDelClick={() => {}}
              isQueue={false}
              UrlParam={() => HandleQueryParams("list")}
              isPlayList={() => ListParam("playlist")}
              index={index}
              isWatch={true}
            />
          );
        })}
      </div>
    </div>
  );
});

export default PlayList;
