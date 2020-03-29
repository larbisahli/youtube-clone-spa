import React, { useContext, useCallback } from "react";
import "./rvccontainer_style.scss";
import { Link } from "react-router-dom";
import { TextReducer, numberWithCommas, ReturnTheme } from "../../config";
import { YouTubeAPI } from "../api/YoutubeApi";
import { PlaySvg } from "./Svg";
import { PlayListSvg } from "../GuideComponents/Svg";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext";

const ResultPlaylistContainer = React.memo(({ item, index }) => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // =========================
  //  FETCH VIDEOS DETAILS
  // =========================
  const GetVideoDetails = async id => {
    return await new Promise(resolve => {
      axios
        .all([
          YouTubeAPI.get("playlistItems", {
            params: {
              part: "snippet",
              maxResults: 2,
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              playlistId: id
            }
          }),
          YouTubeAPI.get("playlists", {
            params: {
              part: "contentDetails",
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              id: id
            }
          })
        ])
        .then(responseArr => {
          // this will be executed only when all requests are complete
          resolve(responseArr);
        });
    });
  };

  const Fetch_Data = (id, index) => {
    GetVideoDetails(id).then(res => {
      if (res) {
        document.getElementById(
          `${id}-${index}-itemCount`
        ).textContent = numberWithCommas(
          res[1].data.items[0].contentDetails.itemCount
        );

        res[0].data.items.map((res, i) => {
          return (document.getElementById(
            `${id}-${index}-items-${i}`
          ).textContent = res.snippet.title);
        });
      }
    });
  };

  const HandlePLImg = useCallback((skeleton_id, index) => {
    // BackgroundColor can be red and you can use it as video duration with the width value.

    document.getElementById(`${skeleton_id}-${index}`).style.backgroundColor =
      "transparent";
    document.getElementById(`${skeleton_id}-${index}`).style.height = "auto";
  }, []);

  return (
    <div className="item_section">
      <div className="rv_container">
        <div className="rv_thumbnail_container">
          <Link to={`/watch/${item.playlistId}`} className="rv_vid_link_wrap">
            <div
              id={`hplaylistCha-${index}`}
              className={`rv_v_thumb rv_v_thumb-${ReturnTheme(Theme)}`}
            >
              <img
                onLoad={() => HandlePLImg("hplaylistCha", index)}
                src={item.thumbnail}
                alt="thumbnail"
                className="rv_v_img"
              />
            </div>
          </Link>

          {/* --------------------------- */}

          <div className="playlist_thu_con playlist_thu_con-rr">
            <div className="play_items_rv">
              <div
                id={`${item.playlistId}-${index}-itemCount`}
                className="v_num_rv"
              >
                {Fetch_Data(item.playlistId, index)}
              </div>
              <PlayListSvg color={"#fff"} />
            </div>
          </div>
          <div className="playlist_thu_con playlist_thu_con-pp">
            <div className="plall_rv">
              <PlaySvg />
              <span className="plall_txt">Play all</span>
            </div>
          </div>
        </div>
        <div className="search_text_wrapper">
          <div className="search_header">
            <div className="search_wrap">
              <h3 className="search_header_title">
                <Link
                  to={`watch/${item.playlistId}`}
                  className={`search_title_h search_title_h-${ReturnTheme(
                    Theme
                  )}`}
                >
                  {TextReducer(item.title, 56)}
                </Link>
              </h3>
              <div className="search_cv_details search_cv_details-playlist">
                <Link
                  data-scontent={item.channelTitle}
                  className={`rvch_title rvch_title-${ReturnTheme(Theme)}`}
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div
                  id={`${item.playlistId}-${index}-items-0`}
                  className={`playlist_items_rv playlist_items_rv-space playlist_items_rv-${ReturnTheme(
                    Theme
                  )}`}
                ></div>
                <div
                  id={`${item.playlistId}-${index}-items-1`}
                  className={`playlist_items_rv playlist_items_rv-${ReturnTheme(
                    Theme
                  )}`}
                ></div>
                <button
                  className={`playlist_txt_btn playlist_txt_btn-${ReturnTheme(
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
