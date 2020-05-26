import React, { useCallback, memo } from "react";
import styles from "./sass/rv.module.scss";
import { Link, useHistory } from "react-router-dom";
import {
  TextReducer,
  numberWithCommas,
  GetClassName,
  ReturnTheme,
} from "../../utils";
import { YouTubeAPI } from "../api/YoutubeApi";
import { PlaySvg } from "./Svg";
import { PlayListSvg } from "../GuideComponents/Svg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import {
  HideGuideAction,
  SetGuideModeAction,
  SetUrlLocationAction,
} from "../../redux";

let cx = classNames.bind(styles);

const ResultPlaylistContainer = ({ item, index }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  // =========================
  //  FETCH VIDEOS DETAILS
  // =========================
  const GetVideoDetails = async (id) => {
    return await new Promise((resolve) => {
      axios
        .all([
          YouTubeAPI.get("playlistItems", {
            params: {
              part: "snippet",
              maxResults: 2,
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              playlistId: id,
            },
          }),
          YouTubeAPI.get("playlists", {
            params: {
              part: "contentDetails",
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              id: id,
            },
          }),
        ])
        .then((response) => {
          resolve(response);
        });
    });
  };

  const Fetch_Data = (id, index) => {
    GetVideoDetails(id).then((res) => {
      if (res) {
        const itemCount = document.getElementById(`${id}-${index}-itemCount`);
        if (itemCount) {
          itemCount.textContent = numberWithCommas(
            res[1].data.items[0].contentDetails.itemCount
          );
        }
        res[0].data.items.map((res, i) => {
          const item = document.getElementById(`${id}-${index}-items-${i}`);
          if (item) return (item.textContent = res.snippet.title);
          return null;
        });
      }
    });
  };

  const HandlePLImg = useCallback((skeleton_id, index) => {
    const PLImgIdElement = document.getElementById(`${skeleton_id}-${index}`);
    if (PLImgIdElement) {
      PLImgIdElement.style.backgroundColor = "transparent";
      PLImgIdElement.style.height = "auto";
    }
  }, []);

  // ----------------------=
  // dispatch
  const dispatch = useDispatch();

  //
  let history = useHistory();

  // ======================
  //  redirect with params
  // ======================

  const HandleLink = useCallback(() => {
    dispatch(HideGuideAction());
    dispatch(SetGuideModeAction(2));
    dispatch(SetUrlLocationAction("watch"));
    // history.push(`/watch?v=x&list=${item.playlistId}`);
  }, [dispatch, history]);

  return (
    <div className={styles.item_section}>
      <div className={styles.item_wrap}>
        <div className={styles.thumbnail}>
          <div onClick={HandleLink} className={styles.video}>
            <div
              id={`hplaylistCha-${index}`}
              className={GetClassName(styles, "vid_thumb", Theme)}
            >
              <img
                onLoad={() => HandlePLImg("hplaylistCha", index)}
                src={item.thumbnail}
                alt="thumbnail"
                className={styles.vid_thumb__img}
              />
            </div>
          </div>

          {/* --------------------------- */}

          <div className={cx("playlist", "playlist--rr")}>
            <div className={styles.play_items_bg}>
              <div
                id={`${item.playlistId}-${index}-itemCount`}
                className={styles.play_items_bg__count}
              >
                {Fetch_Data(item.playlistId, index)}
              </div>
              <PlayListSvg color={"#fff"} />
            </div>
          </div>
          <div className={cx("playlist", "playlist--pp")}>
            <div className={styles.play_all}>
              <PlaySvg />
              <span>Play all</span>
            </div>
          </div>
        </div>
        {/* ------------- body -------------- */}
        <div className={styles.body}>
          <div className={styles.body__container}>
            <div className={styles.body__text_wrap}>
              <div className={styles.results_header}>
                <Link
                  to={`watch/${item.playlistId}`}
                  className={GetClassName(
                    styles,
                    "results_header__title",
                    Theme
                  )}
                >
                  {TextReducer(item.title, 56)}
                </Link>
              </div>
              <div className={cx("details", "details--playlist")}>
                <Link
                  data-scontent={item.channelTitle}
                  className={GetClassName(styles, "details__ch_title", Theme)}
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div
                  id={`${item.playlistId}-${index}-items-0`}
                  className={cx(
                    "playlist__items",
                    "details__items--space",
                    "details__items",
                    { [`details__items--${ReturnTheme(Theme)}`]: true }
                  )}
                ></div>
                <div
                  id={`${item.playlistId}-${index}-items-1`}
                  className={GetClassName(styles, "details__items", Theme)}
                ></div>

                <Link
                  to={`playlist?list=${item.playlistId}`}
                  className={GetClassName(styles, "details__txtbtn", Theme)}
                >
                  View full playlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ResultPlaylistContainer);
