import React, { useState, useContext } from "react";
import "../../Navbar/NavComponents/Icons/app_icon.scss";
import { ThemeContext } from "../../../Context/ThemeContext";

// SVG path COPIED FROM YOUTUBE

const HomeIcon = React.memo(() => {
  const [YtTheme] = useContext(ThemeContext);
  const Theme = YtTheme.isDarkTheme;

  return (
    <button id="cax" className="icon_container">
      <svg className="icon_" viewBox="0 0 25 25" focusable={false}>
        <g>
          <path
            fill={Theme ? "#fff" : "#f00"}
            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8"
          ></path>
        </g>
      </svg>
    </button>
  );
});

export default HomeIcon;
