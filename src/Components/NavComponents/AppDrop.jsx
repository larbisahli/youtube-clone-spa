import React, { memo } from "react";
import styles from "./scss/btndrop.module.scss";
import { ReactComponent as YouTubeTvSvg } from "../../assets/icon/YoutubeTv.svg";
import { ReactComponent as YouTubeMusicSvg } from "../../assets/icon/YoutubeMusic.svg";
import { ReactComponent as YouTubeKidsSvg } from "../../assets/icon/YoutubeKids.svg";
import { ReactComponent as YouTubeNormalSvg } from "../../assets/icon/YoutubeNormal.svg";
import { useSelector } from "react-redux";
import { LazyRender } from "../CompUtils";
import classNames from "classnames/bind";
import DropItemLink from "./DropItemLink";

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
        <DropItemLink to="https://tv.youtube.com/welcome/" label="YouTube TV">
          <YouTubeTvSvg Theme={Theme} />
        </DropItemLink>
        <div className={styles.line}></div>

        <DropItemLink to="https://music.youtube.com/" label="YouTube Music">
          <YouTubeMusicSvg Theme={Theme} />
        </DropItemLink>

        <DropItemLink to="https://www.youtube.com/kids/" label="YouTube Kids">
          <YouTubeKidsSvg Theme={Theme} />
        </DropItemLink>
        <div className={styles.line}></div>

        <DropItemLink
          to="https://creatoracademy.youtube.com/page/home"
          label="Creator Academy"
        >
          <YouTubeNormalSvg Theme={Theme} />
        </DropItemLink>

        <DropItemLink
          to="https://artists.youtube.com/"
          label="YouTube for Artists"
        >
          <YouTubeNormalSvg Theme={Theme} />
        </DropItemLink>
      </LazyRender>
    </div>
  );
};

export default memo(AppDrop);
