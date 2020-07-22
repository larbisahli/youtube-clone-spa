import React, { memo } from "react";
import styles from "./scss/btndrop.module.scss";
import {
  YouTubeTvSvg,
  YouTubeMusicSvg,
  YouTubeKidsSvg,
  YouTubeNormalSvg,
} from "../Svg";
import { useSelector } from "react-redux";
import { LazyRender } from "../../../ComponentsUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const AppDrop = ({ show }) => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);
  return (
    <div
      style={{ display: show ? "" : "none" }}
      className={cx("container", {
        "position--app_drop": true,
      })}
    >
      <LazyRender render={show}>
        <a
          href="https://tv.youtube.com/welcome/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <YouTubeTvSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>YouTube TV</div>
        </a>
        <div className={styles.line}></div>
        <a
          href="https://music.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <YouTubeMusicSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>YouTube Music</div>
        </a>
        <a
          href="https://www.youtube.com/kids/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <YouTubeKidsSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>YouTube Kids</div>
        </a>
        <div className={styles.line}></div>
        <a
          href="https://creatoracademy.youtube.com/page/home"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <YouTubeNormalSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>Creator Academy</div>
        </a>
        <a
          href="https://artists.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <YouTubeNormalSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>YouTube for Artists</div>
        </a>
      </LazyRender>
    </div>
  );
};

export default memo(AppDrop);
