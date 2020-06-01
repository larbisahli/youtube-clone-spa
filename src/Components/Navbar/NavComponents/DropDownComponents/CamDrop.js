import React, { memo } from "react";
import styles from "./scss/btndrop.module.scss";
import { UploadSvg, GoLiveSvg } from "../Svg";
import { useSelector } from "react-redux";
import { GetClassName, ReturnTheme } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

// Using Memo to prevent unnecessary re-renders

const CamDrop = ({ show }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const app_text = GetClassName(styles, "textcon", Theme);

  return (
    <div
      style={{ display: show ? "" : "none" }}
      className={cx("container", {
        [`container--${ReturnTheme(Theme)}`]: true,
        "position--cam_drop": true,
      })}
    >
      <LazyLoad render={show}>
        <a
          href="https://studio.youtube.com/channel/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <UploadSvg />
          </div>
          <div className={styles.text_wrap}>Upload video</div>
        </a>
        <a
          href="https://studio.youtube.com/channel/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={styles.icon_wrap}>
            <GoLiveSvg />
          </div>
          <div className={styles.text_wrap}>Go live</div>
        </a>
      </LazyLoad>
    </div>
  );
};

export default memo(CamDrop);
