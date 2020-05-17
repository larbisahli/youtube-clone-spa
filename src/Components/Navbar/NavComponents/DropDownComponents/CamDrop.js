import React, { memo } from "react";
import style from "./sass/btndrop.module.scss";
import { UploadSvg, GoLiveSvg } from "../Svg";
import { useSelector } from "react-redux";
import { GetClassName } from "../../../../utils";
import { LazyLoad } from "../../../ComponentsUtils";
// Using Memo to prevent unnecessary re-renders

const CamDrop = memo(({ show }) => {
  // Theme
  const Theme = useSelector((state) => state.Theme.isDarkTheme);

  const app_text = GetClassName(style, "textcon", Theme);

  return (
    <div
      style={{ display: show ? "" : "none" }}
      className={`${GetClassName(style, "container", Theme)} ${
        style["position--cam_drop"]
      }`}
    >
      <LazyLoad render={show}>
        <a
          href="https://studio.youtube.com/channel/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={style.icon_wrap}>
            <UploadSvg />
          </div>
          <div className={style.text_wrap}>Upload video</div>
        </a>
        <a
          href="https://studio.youtube.com/channel/"
          target="_blank"
          rel="noopener noreferrer"
          className={app_text}
        >
          <div className={style.icon_wrap}>
            <GoLiveSvg />
          </div>
          <div className={style.text_wrap}>Go live</div>
        </a>
      </LazyLoad>
    </div>
  );
});

export default CamDrop;
