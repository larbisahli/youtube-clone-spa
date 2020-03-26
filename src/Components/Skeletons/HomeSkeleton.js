import React, { useContext } from "react";
import "./homeskeleton_style.scss";
import { ThemeContext } from "../../Context/ThemeContext";
import { ReturnTheme } from "../../config";

const HomeSkeleton = React.memo(() => {
  // Theme context
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div className="video_skeleton">
      <div
        className={`skeleton_thumb skeleton_thumb-${ReturnTheme(Theme)}`}
      ></div>
      <div className="skeleton_bottom">
        <div className={`s_pro s_pro-${ReturnTheme(Theme)}`}></div>
        <div className="tt">
          <div className={`s_title s_title-${ReturnTheme(Theme)}`}></div>
          <div className={`s_title_x s_title_x-${ReturnTheme(Theme)}`}></div>
        </div>
      </div>
    </div>
  );
});

export default HomeSkeleton;
