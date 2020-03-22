import React from "react";
import "./RVContainer.scss";
import { Link } from "react-router-dom";
import { TextReducer, numberWithCommas } from "../../config";
import { YouTubeAPI } from "../api/YoutubeApi";
import { PlayIcon } from "./Icons";
import { PlayListIcon } from "../GuideComponents/Icons";
import axios from "axios";

const ResultPlaylistContainer = React.memo(({ item, index }) => {
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
          //this will be executed only when all requests are complete
          resolve(responseArr);
          console.log("1 =>: ", responseArr[0]);
          console.log("2 =>: ", responseArr[1]);
        });
    });
  };

  const Fetch_Data = (id, index) => {
    GetVideoDetails(id).then(res => {
      console.log("============ :", res);
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

  return (
    <div className="item_section">
      <div className="rv_container">
        <div className="rv_thumbnail_container">
          <Link to={`/watch/${item.playlistId}`} className="rvh_link_wrap">
            <div className="scw">
              <img src={item.thumbnail} alt="thumbnail" className="scw_img" />
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
              <PlayListIcon color={"#fff"} />
            </div>
          </div>
          <div className="playlist_thu_con playlist_thu_con-pp">
            <div className="plall_rv">
              <PlayIcon />
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
                  className="search_title_h"
                >
                  {TextReducer(item.title, 56)}
                </Link>
              </h3>
              <div className="search_cv_details search_cv_details-playlist">
                <Link
                  data-scontent={item.channelTitle}
                  className="rvch_title"
                  to={`/channel/${item.channelId}`}
                >
                  {item.channelTitle}
                </Link>
                <div
                  id={`${item.playlistId}-${index}-items-0`}
                  className="playlist_items_rv playlist_items_rv-space"
                ></div>
                <div
                  id={`${item.playlistId}-${index}-items-1`}
                  className="playlist_items_rv"
                ></div>
                <button className="playlist_txt_btn">View full playlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResultPlaylistContainer;
