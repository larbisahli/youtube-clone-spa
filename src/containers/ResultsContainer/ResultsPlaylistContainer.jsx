import React, { useCallback, memo, useState } from "react";
import styles from "./scss/rv.module.scss";
import { Link, useHistory } from "react-router-dom";
import { numberWithCommas } from "../../utils";
import { YouTubeAPI } from "../../api/YoutubeApi";
import { ReactComponent as PlaySvg } from "../../assets/icon/Play.svg";

import { PlayListSvg } from "../../Components/CompSvg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import {
  HideGuideAction,
  SetGuideModeAction,
  SetUrlLocationAction,
} from "../../redux";

let cx = classNames.bind(styles);

const ResultsPlaylistContainer = ({ item, index }) => {
  // Store the id of the first video on the list
  const [FistVidId, setFistVidId] = useState("initialState");

  const ApiKey = useSelector((state) => state.ApiKey);
  const dispatch = useDispatch();
  let history = useHistory();

  //  FETCH VIDEOS DETAILS
  const GetVideoDetails = async (id) => {
    return await new Promise((resolve) => {
      axios
        .all([
          YouTubeAPI.get("playlistItems", {
            params: {
              part: "snippet",
              maxResults: 2,
              key: ApiKey.isKey
                ? ApiKey.key
                : process.env.REACT_APP_YOUTUBE_API_KEY,
              playlistId: id,
            },
          }),
          YouTubeAPI.get("playlists", {
            params: {
              part: "contentDetails",
              key: ApiKey.isKey
                ? ApiKey.key
                : process.env.REACT_APP_YOUTUBE_API_KEY,
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
          if (i === 0) {
            setFistVidId(res.snippet.resourceId.videoId);
          }
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

  //  redirect with params
  const HandleLink = useCallback(() => {
    dispatch(HideGuideAction());
    dispatch(SetGuideModeAction(2));
    dispatch(SetUrlLocationAction("watch"));
    history.push(`/watch?v=${FistVidId}&list=${item.playlistId}`);
  }, [dispatch, history, item.playlistId, FistVidId]);

  return (
    <div className={styles.item_section}>
      <div className={styles.item_wrap}>
        <div onClick={HandleLink} className={styles.thumbnail}>
          <div onClick={HandleLink} className={styles.video}>
            <div id={`hplaylistCha-${index}`} className={styles.vid_thumb}>
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
                <div
                  onClick={HandleLink}
                  className={styles.results_header__title}
                >
                  {item.title}
                </div>
              </div>
              <div className={cx("details", "details--playlist")}>
                <Link
                  data-scontent={item.channelTitle}
                  className={styles.details__ch_title}
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div
                  id={`${item.playlistId}-${index}-items-0`}
                  className={cx(
                    "playlist__items",
                    "details__items--space",
                    "details__items"
                  )}
                ></div>
                <div
                  id={`${item.playlistId}-${index}-items-1`}
                  className={styles.details__items}
                ></div>

                <Link
                  to={`playlist?list=${item.playlistId}`}
                  className={styles.details__txtbtn}
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

export default memo(ResultsPlaylistContainer);
