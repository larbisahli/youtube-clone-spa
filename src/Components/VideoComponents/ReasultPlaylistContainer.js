import React, { useContext, useCallback } from "react";
import "./sass/rvccontainer_style.scss";
import { Link } from "react-router-dom";
import { TextReducer, numberWithCommas, ReturnTheme } from "../../utils";
import { YouTubeAPI } from "../api/YoutubeApi";
import { PlaySvg } from "./Svg";
import { PlayListSvg } from "../GuideComponents/Svg";
import axios from "axios";
import { ThemeContext } from "../../Context";

const ResultPlaylistContainer = React.memo(({ item, index }) => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

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
        .then((responseArr) => {
          // this will be executed only when all requests are complete
          resolve(responseArr);
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
    // BackgroundColor can be red and you can use it as video duration with the width value.

    const PLImgIdElement = document.getElementById(`${skeleton_id}-${index}`);
    if (PLImgIdElement) {
      PLImgIdElement.style.backgroundColor = "transparent";
      PLImgIdElement.style.height = "auto";
    }
  }, []);

  return (
    <div className="item_section">
      <div className="item_wrap">
        <div className="item_wrap__thumbnail">
          <Link
            to={`/watch/${item.playlistId}`}
            className="item_wrap__thumbnail__video"
          >
            <div
              id={`hplaylistCha-${index}`}
              className={`rv_video_thumb rv_video_thumb--${ReturnTheme(Theme)}`}
            >
              <img
                onLoad={() => HandlePLImg("hplaylistCha", index)}
                src={item.thumbnail}
                alt="thumbnail"
                className="rv_video_thumb__img"
              />
            </div>
          </Link>

          {/* --------------------------- */}

          <div className="item_wrap__thumbnail__playlist item_wrap__thumbnail__playlist--rr">
            <div className="play_items_bg">
              <div
                id={`${item.playlistId}-${index}-itemCount`}
                className="pl_count"
              >
                {Fetch_Data(item.playlistId, index)}
              </div>
              <PlayListSvg color={"#fff"} />
            </div>
          </div>
          <div className="item_wrap__thumbnail__playlist item_wrap__thumbnail__playlist--pp">
            <div className="play_all">
              <PlaySvg />
              <span>Play all</span>
            </div>
          </div>
        </div>
        {/* ------------- body -------------- */}
        <div className="item_wrap__body">
          <div className="item_wrap__body__container">
            <div className="item_wrap__body__text_wrap">
              <div className="rv_results_header">
                <Link
                  to={`watch/${item.playlistId}`}
                  className={`rv_results_header__title rv_results_header__title--${ReturnTheme(
                    Theme
                  )}`}
                >
                  {TextReducer(item.title, 56)}
                </Link>
              </div>
              <div className="rv_results_details rv_results_details--playlist">
                <Link
                  data-scontent={item.channelTitle}
                  className={`rv_results_details__ch_title rv_results_details__ch_title--${ReturnTheme(
                    Theme
                  )}`}
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div
                  id={`${item.playlistId}-${index}-items-0`}
                  className={`rv_results_details__playlist_items rv_results_details__playlist_items--space rv_results_details__playlist_items--${ReturnTheme(
                    Theme
                  )}`}
                ></div>
                <div
                  id={`${item.playlistId}-${index}-items-1`}
                  className={`rv_results_details__playlist_items rv_results_details__playlist_items--${ReturnTheme(
                    Theme
                  )}`}
                ></div>
                <button
                  className={`rv_results_details__playlist_txt_btn rv_results_details__playlist_txt_btn--${ReturnTheme(
                    Theme
                  )}`}
                >
                  View full playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultPlaylistContainer;
