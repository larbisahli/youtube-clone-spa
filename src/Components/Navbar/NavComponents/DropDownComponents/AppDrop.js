import React, { useContext } from "react";
import "./sass/drop_style.scss";
import {
  YouTubeTvSvg,
  YouTubeMusicSvg,
  YouTubeKidsSvg,
  YouTubeNormalSvg,
} from "../Svg";
import { ThemeContext } from "../../../../Context";
import { ReturnTheme } from "../../../../utils/utils";

// Using Memo to prevent unnecessary re-renders

const AppDrop = React.memo(() => {
  // Theme Context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  // Preventing from repeating computed logic
  const app_text = `nav_drop_container__text nav_drop_container__text--${ReturnTheme(
    Theme
  )}`;
  const line_ = `nav_drop_container__line nav_drop_container__line--${ReturnTheme(
    Theme
  )}`;

  return (
    <div
      className={`nav_drop_container position--app_drop nav_drop_container--${ReturnTheme(
        Theme
      )}`}
    >
      <a
        href="https://tv.youtube.com/welcome/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_wrap">
          <YouTubeTvSvg />
        </div>
        <div className="text_wrap">YouTube TV</div>
      </a>
      <div className={line_}></div>
      <a
        href="https://music.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_wrap">
          <YouTubeMusicSvg />
        </div>
        <div className="text_wrap">YouTube Music</div>
      </a>
      <a
        href="https://www.youtube.com/kids/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_wrap">
          <YouTubeKidsSvg />
        </div>
        <div className="text_wrap">YouTube Kids</div>
      </a>
      <div className={line_}></div>
      <a
        href="https://creatoracademy.youtube.com/page/home"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_wrap">
          <YouTubeNormalSvg />
        </div>
        <div className="text_wrap">Creator Academy</div>
      </a>
      <a
        href="https://artists.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={app_text}
      >
        <div className="icon_wrap">
          <YouTubeNormalSvg />
        </div>
        <div className="text_wrap">YouTube for Artists</div>
      </a>
    </div>
  );
});

export default AppDrop;
