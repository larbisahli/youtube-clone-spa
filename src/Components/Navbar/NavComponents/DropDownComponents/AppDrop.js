import React, { useContext } from "react";
import "./drop_style.scss";
import {
  YouTubeTvSvg,
  YouTubeMusicSvg,
  YouTubeKidsSvg,
  YouTubeNormalSvg,
} from "../Svg";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../config";

// Using Memo to prevent unnecessary re-renders

const AppDrop = React.memo(() => {
  // Theme Context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Preventing from repeating computed logic
  const app_text = `app_text app_text-${ReturnTheme(Theme)}`;
  const line_ = `line_ap line_ap-${ReturnTheme(Theme)}`;

  return (
    <div
      className={`app_container app-position app_container-${
        Theme ? "dark" : "light"
      }`}
    >
      <a
        href="https://tv.youtube.com/welcome/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <YouTubeTvSvg />
        </div>
        <div className="textdr">YouTube TV</div>
      </a>
      <div className={line_}></div>
      <a
        href="https://music.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <YouTubeMusicSvg />
        </div>
        <div className="textdr">YouTube Music</div>
      </a>
      <a
        href="https://www.youtube.com/kids/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <YouTubeKidsSvg />
        </div>
        <div className="textdr">YouTube Kids</div>
      </a>
      <div className={line_}></div>
      <a
        href="https://creatoracademy.youtube.com/page/home"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <YouTubeNormalSvg />
        </div>
        <div className="textdr">Creator Academy</div>
      </a>
      <a
        href="https://artists.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icondr">
          <YouTubeNormalSvg />
        </div>
        <div className="textdr">YouTube for Artists</div>
      </a>
    </div>
  );
});

export default AppDrop;
