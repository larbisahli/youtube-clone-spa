import React, { memo } from "react";
import { useSelector } from "react-redux";
import styles from "./scss/btndrop.module.scss";
import {
  YouTubeTvSvg,
  YouTubeMusicSvg,
  YouTubeKidsSvg,
  YouTubeNormalSvg,
} from "../Svg";
import { GetClassName, ReturnTheme } from "../../../../utils";
import { LazyRender } from "../../../ComponentsUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent unnecessary re-renders

const AppDrop = ({ show }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const app_text = GetClassName(styles, "textcon", Theme);

  const line_ = GetClassName(styles, "line", Theme);

  return (
    <div
      style={{ display: show ? "" : "none" }}
      className={cx("container", {
        [`container--${ReturnTheme(Theme)}`]: true,
        "position--app_drop": true,
      })}
    >
      <LazyRender render={show}>
        <a
          href="https://tv.youtube.com/welcome/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <YouTubeTvSvg />
          </div>
          <div className={styles.text_wrap}>YouTube TV</div>
        </a>
        <div className={line_}></div>
        <a
          href="https://music.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <YouTubeMusicSvg />
          </div>
          <div className={styles.text_wrap}>YouTube Music</div>
        </a>
        <a
          href="https://www.youtube.com/kids/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <YouTubeKidsSvg />
          </div>
          <div className={styles.text_wrap}>YouTube Kids</div>
        </a>
        <div className={line_}></div>
        <a
          href="https://creatoracademy.youtube.com/page/home"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <YouTubeNormalSvg />
          </div>
          <div className={styles.text_wrap}>Creator Academy</div>
        </a>
        <a
          href="https://artists.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <YouTubeNormalSvg />
          </div>
          <div className={styles.text_wrap}>YouTube for Artists</div>
        </a>
      </LazyRender>
    </div>
  );
};

export default memo(AppDrop);
