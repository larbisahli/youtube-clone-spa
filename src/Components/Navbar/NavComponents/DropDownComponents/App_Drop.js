import React, { useContext } from "react";
import "./drop.scss";
import {
  YouTubeTvIcon,
  YouTubeMusicIcon,
  YouTubeKidsIcon,
  YouTubeNormalIcon
} from "../Icons";
import { ThemeContext } from "../../../../Context/ThemeContext";

// Using Memo to prevent unnecessary re-renders

const AppDrop = React.memo(() => {
  // Theme Context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Preventing from repeating computed logic
  const app_text = "app_text" + (Theme ? " app_text-dark" : " app_text-light");
  const line_ = "line_ap" + (Theme ? " line_ap-dark" : " line_ap-light");

  return (
    <div
      className={
        "app_container app-position" +
        (Theme ? " app_container-dark" : " app_container-light")
      }
    >
      <a
        href="https://tv.youtube.com/welcome/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_">
          <YouTubeTvIcon />
        </div>
        <div className="text_">YouTube TV</div>
      </a>
      <div className={line_}></div>
      <a
        href="https://music.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
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
        className={app_text}
      >
        <div className="icon_">
          <YouTubeKidsIcon />
        </div>
        <div className="text_">YouTube Kids</div>
      </a>
      <div className={line_}></div>
      <a
        href="https://creatoracademy.youtube.com/page/home"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
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
        className={app_text}
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
