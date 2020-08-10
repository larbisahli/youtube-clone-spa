import React, { memo } from "react";
import styles from "./scss/btndrop.module.scss";
import { ReactComponent as GoLiveSvg } from "../../assets/icon/GoLive.svg";
import { ReactComponent as UploadSvg } from "../../assets/icon/Upload.svg";
import { LazyRender } from "../CompUtils";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import DropItemLink from "./DropItemLink";

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
        <DropItemLink
          to="https://studio.youtube.com/channel/"
          label="Upload video"
        >
          <UploadSvg Theme={Theme} />
        </DropItemLink>

        <DropItemLink to="https://studio.youtube.com/channel/" label="Go live">
          <GoLiveSvg Theme={Theme} />
        </DropItemLink>
      </LazyRender>
    </div>
  );
};

export default memo(CamDrop);
