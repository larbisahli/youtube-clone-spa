import React, { useContext } from "react";
import "./homeskeleton_style.scss";
import { ThemeContext } from "../../Context";
import { ReturnTheme } from "../../utils/utils";

const HomeSkeleton = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div className="video_skeleton">
      <div
        className={`video_skeleton__thumb video_skeleton__thumb--${ReturnTheme(
          Theme
        )}`}
      ></div>
      <div className="video_skeleton__bottom">
        <div
          className={`video_skeleton__bottom__img video_skeleton__bottom__img--${ReturnTheme(
            Theme
          )}`}
        ></div>
        <div className="video_skeleton__bottom__txt">
          <div
            className={`skeleton_title skeleton_title--${ReturnTheme(Theme)}`}
          ></div>
          <div
            className={`skeleton_title_x skeleton_title_x--${ReturnTheme(
              Theme
            )}`}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default HomeSkeleton;
