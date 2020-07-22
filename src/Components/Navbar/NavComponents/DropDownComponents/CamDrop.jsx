import React, { memo } from "react";
import styles from "./scss/btndrop.module.scss";
import { UploadSvg, GoLiveSvg } from "../Svg";
import { LazyRender } from "../../../ComponentsUtils";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

let cx = classNames.bind(styles);

const CamDrop = ({ show }) => {
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  return (
    <div
      style={{ display: show ? "" : "none" }}
      className={cx("container", {
        "position--cam_drop": true,
      })}
    >
      <LazyRender render={show}>
        <a
          href="https://studio.youtube.com/channel/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <UploadSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>Upload video</div>
        </a>
        <a
          href="https://studio.youtube.com/channel/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.textcon}
        >
          <div className={styles.icon_wrap}>
            <GoLiveSvg Theme={Theme} />
          </div>
          <div className={styles.text_wrap}>Go live</div>
        </a>
      </LazyRender>
    </div>
  );
};

export default memo(CamDrop);
