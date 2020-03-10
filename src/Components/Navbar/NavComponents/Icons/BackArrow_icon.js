import React, { useContext } from "react";
import "./app_icon.scss";
import { ThemeContext } from "../../../../Context/ThemeContext";

// SVG path COPIED FROM YOUTUBE

const BackArrow = React.memo(() => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <div className="icon_container">
      <svg className="icon_" viewBox="0 0 24 24" focusable={false}>
        <g>
          <path
            fill={Theme ? "#fff" : "#606060"}
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </g>
      </svg>
    </div>
  );
});

export default BackArrow;
