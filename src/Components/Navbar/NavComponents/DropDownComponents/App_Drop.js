import React from "react";
import "./drop.scss";
import {
  YouTubeTvIcon,
  YouTubeMusicIcon,
  YouTubeKidsIcon,
  YouTubeNormalIcon
} from "../Icons";

// Useing Memo to prevent unnecessary re-render

const AppDrop = React.memo(() => {
  return (
    <div className="app_container app-position">
      <a
        href="https://tv.youtube.com/welcome/"
        target="_blank"
        rel="noopener noreferrer"
        className="app_text"
      >
        <div className="icon_">
          <YouTubeTvIcon />
        </div>
        <div className="text_">YouTube TV</div>
      </a>
      <div className="line_"></div>
      <a
        href="https://music.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="app_text"
      >
        <div className="icon_">
          <YouTubeMusicIcon />
        </div>
        <div className="text_">YouTube Music</div>
      </a>
      <a
        href="https://www.youtube.com/kids/"
        target="_blank"
        rel="noopener noreferrer"
        className="app_text"
      >
        <div className="icon_">
          <YouTubeKidsIcon />
        </div>
        <div className="text_">YouTube Kids</div>
      </a>
      <div className="line_"></div>
      <a
        href="https://creatoracademy.youtube.com/page/home"
        target="_blank"
        rel="noopener noreferrer"
        className="app_text"
      >
        <div className="icon_">
          <YouTubeNormalIcon />
        </div>
        <div className="text_">Creator Academy</div>
      </a>
      <a
        href="https://artists.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="app_text"
      >
        <div className="icon_">
          <YouTubeNormalIcon />
        </div>
        <div className="text_">YouTube for Artists</div>
      </a>
    </div>
  );
});

export default AppDrop;
