import React, { useCallback, memo } from "react";
import style from "./sass/rv.module.scss";
import { Link } from "react-router-dom";
import { TextReducer, numberWithCommas, GetClassName } from "../../utils";
import { YouTubeAPI } from "../api/YoutubeApi";
import { PlaySvg } from "./Svg";
import { PlayListSvg } from "../GuideComponents/Svg";
import axios from "axios";
import { useSelector } from "react-redux";

const ResultPlaylistContainer = memo(({ item, index }) => {
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
          if (item) {
            return (item.textContent = res.snippet.title);
          } else {
            return null;
          }
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

  return (
    <div className={style.item_section}>
      <div className={style.item_wrap}>
        <div className={style.thumbnail}>
          <Link to={`/watch/${item.playlistId}`} className={style.video}>
            <div
              id={`hplaylistCha-${index}`}
              className={GetClassName(style, "vid_thumb", Theme)}
            >
              <img
                onLoad={() => HandlePLImg("hplaylistCha", index)}
                src={item.thumbnail}
                alt="thumbnail"
                className={style.vid_thumb__img}
              />
            </div>
          </Link>

          {/* --------------------------- */}

          <div className={`${style.playlist} ${style["playlist--rr"]}`}>
            <div className={style.play_items_bg}>
              <div
                id={`${item.playlistId}-${index}-itemCount`}
                className={style.play_items_bg__count}
              >
                {Fetch_Data(item.playlistId, index)}
              </div>
              <PlayListSvg color={"#fff"} />
            </div>
          </div>
          <div className={`${style.playlist} ${style["playlist--pp"]}`}>
            <div className={style.play_all}>
              <PlaySvg />
              <span>Play all</span>
            </div>
          </div>
        </div>
        {/* ------------- body -------------- */}
        <div className={style.body}>
          <div className={style.body__container}>
            <div className={style.body__text_wrap}>
              <div className={style.results_header}>
                <Link
                  to={`watch/${item.playlistId}`}
                  className={GetClassName(
                    style,
                    "results_header__title",
                    Theme
                  )}
                >
                  {TextReducer(item.title, 56)}
                </Link>
              </div>
              <div className={`${style.details} ${style["details--playlist"]}`}>
                <Link
                  data-scontent={item.channelTitle}
                  className={GetClassName(style, "details__ch_title", Theme)}
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div
                  id={`${item.playlistId}-${index}-items-0`}
                  className={`${style.playlist__items} ${
                    style["details__items--space"]
                  } ${GetClassName(style, "details__items", Theme)}`}
                ></div>
                <div
                  id={`${item.playlistId}-${index}-items-1`}
                  className={GetClassName(style, "details__items", Theme)}
                ></div>
                <Link
                  to={`playlist?list=${item.playlistId}`}
                  className={GetClassName(style, "details__txtbtn", Theme)}
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
});

export default ResultPlaylistContainer;
